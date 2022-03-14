import React from "react";
import { createBrowserHistory } from "history";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";

import {useLocalStorage} from "./hooks/useLocalStorage"
import About from "./views/About";
import Game from "./views/Game";
import Start from "./views/Start";

import './App.css';

function App() {
  const [gamePin, setGamePin] = useLocalStorage('pin', '');
  const history = createBrowserHistory();
  
  React.useEffect(() => {
    if (gamePin) {
      history.push(`/game/${gamePin}`);
    }
    else {
      history.push('/');
    }
  }, [gamePin])
  
  function leaveGame(): void {
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
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to={"/game/:pin"} disabled={!gamePin}>Game{gamePin? ` (${gamePin})` : ''}</Nav.Link>
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
        <Route path="/game"><Game gamePin={gamePin}/></Route>
        <Route render={() => <h1>Page not found</h1>}/>
      </Switch>
    
    </Router>
    
  </div>
  );
}

export default App;
