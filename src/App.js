import React from "react";
import { createBrowserHistory } from "history";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";

import {useLocalStorage} from "./hooks/useLocalStorage"

import About from "./pages/About";
import Game from "./pages/Game";
import Start from "./pages/Start";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

import './App.css';

function App() {
  const [gamePin, setGamePin] = useLocalStorage('pin', '');
  const history = createBrowserHistory();
  
  console.log('gamePin from LS:', gamePin);
  
  React.useEffect(() => {
    console.log('useEffect => pin changed:', gamePin);
    if (gamePin) {
      console.log('redirect to game');
      history.push(`/game/${gamePin}`);
    }
    else {
      console.log('redirect to home');
      history.push('/');
    }
  }, [gamePin])
  
  function leaveGame() {
    setGamePin('');
  }
  
  return (
    <div className="App">
  


      <Router history={history}>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand><strong>myPOINTS</strong></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                {!gamePin && <Nav.Link as={Link} to="/">Home</Nav.Link>}
                {gamePin && <Nav.Link as={Link} to={`/game/${gamePin}`}>Game ({gamePin})</Nav.Link>}
                <Nav.Link as={Link} to="/about">About</Nav.Link>
              </Nav>
              {!gamePin ? null :
                  <Nav>
                    <Button type="button" variant="outline-light" onClick={leaveGame}>Leave</Button>
                  </Nav>
              }
            </Navbar.Collapse>
          </Container>
        </Navbar>
      
      
      <Switch>
        <Route exact path="/"><Start setPin={(newPin) => setGamePin(newPin)}/></Route>
        <Route exact path="/about" component={About}/>
        <Route path="/game/:id" component={Game}/>
        <Route render={() => <h1>Page not found</h1>}/>
      </Switch>
    
    </Router>
    
  </div>
  );
}

export default App;
