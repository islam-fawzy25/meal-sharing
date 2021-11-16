import React, { useEffect, useState, useContext, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MealsComponent from "./components/meals/MealsComp";
import MealById from "./components/meals/MealById";
import NavBar from "./components/structures/Nav";
import Home from "./components/structures/Home";
import ReservationForm from "./components/reservation/ReservationForm";
import AddNewMeal from "./components/meals/AddNewMeal";
import FetchAvaliableReservations from "./components/reservation/AvailableReservations";
import "./App.css";
import FooterComponent from "./components/structures/Footer.component";
import About from './components/structures/About'
import useFetch from "./components/UseFetch";

export const Data = createContext();

function App() {
  const [meals, setMeals] = useState([]);
  const [idMeal, setIdMeal] = useState({});
  const [availableMeals, setAvailableMeals] = useState([]);
  const [available, setAvailable] = useState();

const {data,error,isPending}=useFetch("/api/meals");

  useEffect(() => {
    setMeals(data);
  }, [data]);
  
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
            <Home />
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
