import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/Nav.component";
import Home from "./containers/Home/Home.container";
import "./App.css";
import FooterComponent from "./components/Footer/Footer.component";
import About from './containers/About/About.container'
import MealsPage from "./containers/MealsPage/MealsPage.container";
import SingleMealPage from "./containers/SingleMealPage/SingleMeal.container";
import JoinUS from "./containers/Join-us/JoinUs.container";

function App() {
  return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/meals" component={MealsPage} />

          <Route path="/meals/:id" component={SingleMealPage} />

          <Route path="/about" component={About} />

          <Route path="/joinus" component={JoinUS} />
        </Switch>
        <FooterComponent />
      </Router>
  );
}

export default App;
