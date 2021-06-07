import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { SetUpProvider } from "./setUpContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Workout from "./pages/Workout";

function App() {
  const [actual, setActual] = useState('Home');
  return (
    <SetUpProvider>
      <Router>
        <Header actual={actual} setActual={setActual}/>
        <Switch>
          <Route path="/settings">
            <Settings setActual={setActual}/>
          </Route>
          <Route path="/workout">
            <Workout />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </SetUpProvider>
  );
}

export default App;
