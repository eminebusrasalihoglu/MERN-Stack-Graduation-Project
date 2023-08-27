import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Routess } from './components/Router';
import Header from './components/Header';
import SideBar from './components/SideBar';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import classNames from "classnames";
import Container from 'react-bootstrap/Container';
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [previousWidth, setPreviousWidth] = useState(-1);
  const [user, setUser] = useState(null);
  const updateWidth = () => {
    const width = window.innerWidth;
    const widthLimit = 576;
    setIsMobile( width <= widthLimit);
    const wasMobile = previousWidth <= widthLimit;

    if (isMobile !== wasMobile) {
      setIsMobile(!isMobile);
    }

    setPreviousWidth(width);
  }

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (localStorage.getItem("user") && !user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    updateWidth(); 

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
    
  }, [user]);
  return (

<>
    
        {user ?
          <>
          <div className="App ">
              <SideBar user={user} toggle={toggle} isOpen={isOpen}  />
              <Container
        fluid
        scrollable={true} 
        className={classNames("content", { "is-open": isOpen })}
      >
              <Header  user={user} setUser={setUser} toggle={toggle} />
                <Routess user={user}  toggle={toggle} isOpen={isOpen} />
                </Container>
                </div>
          </>
          :
          <>
            <Routes>
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/signin" element={<SigninScreen setUser={setUser} />} />
              <Route path="/" element={<SigninScreen setUser={setUser} />} />
              <Route path="*" element={<NotFoundScreen />} />
            </Routes>

          </>}
    
          </>

  );
}

export default App;
