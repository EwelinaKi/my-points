import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.css';


import About from "./components/about/About";

function useLocalStorageState(key, defaultValue = '') { // TODO wydzielic do serwisu
    const [state, setState] = React.useState(
        () => window.localStorage.getItem(key) || defaultValue,
    )

    React.useEffect(() => {
        window.localStorage.setItem(key, state)
    }, [key, state])

    return [state, setState]
}

function App() {
    const [gamePin, setGamePin] = useLocalStorageState('gamePin');
    const [gamePass, setGamePass] = useLocalStorageState('gamePass');

    function handleSubmit(event) {
        event.preventDefault()
        // TODO reguqest z zapisem
        // TODO obsluga bledow
        // TODO reditect
    }

    const handlePassChange = event => setGamePass(event.target.value);
    const handlePinChange = event => setGamePin(event.target.value);


    return (
    <div className="App">

        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>

                    </ul>
                </nav>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="gamePin">PIN</label>
                    <input id="gamePin" type="text" onChange={handlePinChange} value={gamePin}/>
                    <label htmlFor="gamePass">PASS</label>
                    <input id="gamePass" type="text" onChange={handlePassChange} value={gamePass}/>
                    <button type="submit">GO!</button>
                </form>
                <button type="button">NEW</button>

                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                </Switch>

            </div>
        </Router>
    </div>
    );
}

export default App;
