import React, { useEffect, useState, useContext, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MealsComponent from "./components/meals/MealsComp";
import MealById from "./components/meals/MealById";
import NavBar from "./components/structures/Nav";
import Title from "./components/structures/Title";
import ReservationForm from "./components/reservation/ReservationForm";
import AddNewMeal from "./components/meals/AddNewMeal";
import FetchAvaliableReservations from "./components/reservation/AvailableReservations";
import "./App.css";
import FooterComponent from "./components/structures/Footer.component";
import About from './components/structures/About'

export const Data = createContext();

////// is it good idea to define all stats here and pass it by context or
// we can do better method like custom hook

function App() {
  const [meals, setMeals] = useState([]);
  const [idMeal, setIdMeal] = useState({});
  const [availableMeals, setAvailableMeals] = useState([]);
  const [available, setAvailable] = useState();

  const fetchMeals = async () => {
    try {
      const response = await fetch("/api/meals");
      if (!response.ok) {
        `'Error :' ${response.status}`;
      } else {
        const data = await response.json();
        console.log(data);
        setMeals(data);
      }
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <Data.Provider
      value={{
        meals,
        setMeals,
        idMeal,
        setIdMeal,
        availableMeals,
        setAvailableMeals,
        available,
        setAvailable,
      }}
    >
      <Router>
        <NavBar />
       
        <Switch>
          <Route exact path="/">
            <Title />
            <FetchAvaliableReservations />
          </Route>
          <Route path="/meals/:id">
            <MealById />
            <ReservationForm />
          </Route>
          <Route exact path="/meals">
            <MealsComponent />
            <AddNewMeal />
          </Route>
          <Route  path="/about">
            < About />
          </Route>
        </Switch>
        <FooterComponent></FooterComponent>
      </Router>
     
    </Data.Provider>
  );
}

export default App;
