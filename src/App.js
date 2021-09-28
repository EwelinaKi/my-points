import React from "react";
import {getGamePin, clearGamePin} from "./state/local-storage";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
    Link
} from "react-router-dom";

import About from "./components/about/About";
import Game from "./components/game/Game";
import JoinGame from "./components/join-game/JoinGame";
import './App.css';

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

        </Router>
    </div>
    );
}

export default App;
