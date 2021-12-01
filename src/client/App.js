import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MealsComponent from "./components/meals/MealsComp";
import MealById from "./components/meals/MealById";
import NavBar from "./components/structures/Nav";
import Home from "./components/structures/Home";
import AddNewMeal from "./components/meals/AddNewMeal";
import "./App.css";
import FooterComponent from "./components/structures/Footer.component";
import About from './components/structures/About'
import useFetch from "./components/UseFetch";
export const Data = createContext();

function App() {
  const [meals, setMeals] = useState([]);
  const [idMeal, setIdMeal] = useState({});
  const [available, setAvailable] = useState();
  const [availableMeals, setAvailableMeals] = useState([]);
  const [availableSeats, setAvailableSeats] = useState();

  const { data: availableReservation } = useFetch("/api/meals?availableReservations=true")
  const { data: mealsData } = useFetch("/api/meals");

  useEffect(() => {
    setAvailableMeals(availableReservation);
    setMeals(mealsData);
  }, [{ mealsData, availableReservation, meals, availableSeats }]);

  return (
    <Data.Provider
      value={{
        meals,
        setMeals,
        idMeal,
        setIdMeal,
        available,
        setAvailable,
        availableMeals,
        setAvailableMeals,
        availableSeats,
        setAvailableSeats
      }}
    >
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/meals">
            <MealsComponent />
          </Route>
          <Route path="/meals/:id">
            <MealById />
          </Route>
          <Route path="/about">
            < About />
          </Route>
          <Route path="/joinus">
            <AddNewMeal />
          </Route>
        </Switch>
        <FooterComponent />
      </Router>

    </Data.Provider>
  );
}

export default App;
