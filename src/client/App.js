import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/structures/Nav/Nav";
import Home from "./components/structures/home/Home";
import AddNewMeal from "./components/meals/newMeal/AddNewMeal";
import "./App.css";
import FooterComponent from "./components/structures/footer/Footer.component";
import About from './components/structures/about/About'
import MealsPage from "./containers/MealsPage/MealsPage.container";
import SingleMealPage from "./containers/SingleMealPage/SingleMeal.container";


function App() {
  return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/meals" component={MealsPage} />

          <Route path="/meals/:id" component={SingleMealPage} />

          <Route path="/about" component={About} />

          <Route path="/joinus" component={AddNewMeal} />
        </Switch>
        <FooterComponent />
      </Router>
  );
}

export default App;
