import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
    Link
} from "react-router-dom";
import './App.css';

import {saveGamePin, getGamePin, clearGamePin} from "./state/local-storage";


import About from "./components/about/About";
import Game from "./components/game/Game";
import PropTypes from "prop-types"

function App() {

    const [gamePin, setGamePin] = React.useState(getGamePin());

    function logout() {
        clearGamePin()
        setGamePin('');
        return <Redirect to={"/"}></Redirect>
    }

    function redirectToGame() {
        setGamePin(getGamePin());
        return <Redirect to={`/game/${gamePin}`}></Redirect>
    }


    return (
    <div className="App">

        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">{gamePin ? 'Game' : 'Home'}</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li ><button type="button" onClick={logout}>Logout</button></li>

                    </ul>
                </nav>

                <Switch>
                    <Route exact path="/">
                        {gamePin ? <Redirect to={`/game/${gamePin}`} /> : <JoinGame redirect={redirectToGame}/>}
                    </Route>
                    <Route path="/about" component={About}/>
                    <Route path="/game/:id"  component={Game}>{gamePin ? <Game/> : <Redirect to="/" />}</Route>
                </Switch>

            </div>
        </Router>

    </div>
    );
}

export default App;


JoinGame.propTypes = {
    redirect: PropTypes.func.isRequired
}


function JoinGame(props) {

    const [tempGamePin, setTempGamePin] = React.useState(getGamePin());
    const [tempGamePass, setTempGamePass] = React.useState('');

    function handleSubmit(event) {
        event.preventDefault();
        saveGamePin(tempGamePin);
        props.redirect();
    }

    function setTempPin(event) {
         setTempGamePin(event.target.value)
     }

    function setTempPass(event) {
        setTempGamePass(event.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="gamePin">PIN</label>
            <input id="gamePin" type="text" onChange={setTempPin} value={tempGamePin}/>
            <label htmlFor="gamePass">PASS</label>
            <input id="gamePass" type="text" onChange={setTempPass} value={tempGamePass}/>
            <button type="submit">GO!</button>
            <button type="button">NEW</button>
        </form>
    )
}
