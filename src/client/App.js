import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MealsComponent from "./components/meals/MealsComp";
import MealById from "./components/meals/MealById";
import NavBar from "./components/structures/Nav";
import Title from "./components/structures/Title";
import ReservationForm from "./components/reservation/ReservationForm";
import AddNewMeal from "./components/meals/AddNewMeal"


function App() {
  const [meals, setMeals] = useState([]);
  const [idMeal, setIdMeal] = useState({});
  const [availableMeals, setAvailableMeals] = useState([]);
  const [available, setAvailable] = useState(true);

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
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Title />
        </Route>
        <Route path="/meals/:id">
          <MealById
            meals={meals}
            setMeals={setMeals}
            idMeal={idMeal}
            setIdMeal={setIdMeal}
            availableMeals={availableMeals}
            setAvailableMeals={setAvailableMeals}
            available={available}
            setAvailable={setAvailable}
          />
          <ReservationForm
            meals={meals}
            setMeals={setMeals}
            idMeal={idMeal}
            setIdMeal={setIdMeal}
            availableMeals={availableMeals}
            setAvailableMeals={setAvailableMeals}
            available={available}
            setAvailable={setAvailable}
          />
        </Route>
        <Route exact path="/meals">
          <MealsComponent
            meals={meals}
            setMeals={setMeals}
            available={available}
            setAvailable={setAvailable}
            availableMeals={availableMeals}
            setAvailableMeals={setAvailableMeals}
            idMeal={idMeal}
            setIdMeal={setIdMeal}
          />
          <AddNewMeal/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
