import React from "react";
import { createBrowserHistory } from "history";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import {useLocalStorage} from "./hooks/useLocalStorage"

import About from "./pages/About";
import Game from "./pages/Game";
import Start from "./pages/Start";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import svg from "./assets/bcg.svg";

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
  
  function leaveGame() {
    setGamePin('');
  }
  
  return (
    <div className="App" style={{
      backgroundImage: `url(${svg})`,
      backgroundRepeat: "repeat",
      height: "100vh"
    }}>
      
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
