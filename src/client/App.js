import React, { useEffect, useState, useContext, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MealsComponent from "./components/meals/MealsComp";
import MealById from "./components/meals/MealById";
import NavBar from "./components/structures/Nav";
import Title from "./components/structures/Title";
import ReservationForm from "./components/reservation/ReservationForm";
import AddNewMeal from "./components/meals/AddNewMeal";

export const Data = createContext();

function App() {
  const [meals, setMeals] = useState([]);
  const [idMeal, setIdMeal] = useState({});
  const [availableMeals, setAvailableMeals] = useState([]);
  const [available, setAvailable] = useState();

  const fetchMeals = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/meals");
      if (!response.ok) {
        `'Error :' ${response.status}`;
      } else {
        const data = await response.json();
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
          </Route>
          <Route path="/meals/:id">
            <MealById />
            <ReservationForm />
          </Route>
          <Route exact path="/meals">
            <MealsComponent />
            <AddNewMeal />
          </Route>
        </Switch>
      </Router>
    </Data.Provider>
  );
}

export default App;
