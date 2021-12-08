import React,{ useState, useEffect  } from "react";
import "./addNewMeal.css"
import GoHome from "../../GoHomeComponent";
import postData from "../../usePost";

const AddNewMeal = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [maxReservation, setMaxReservation] = useState();
  const [price, setPrice] = useState();
  const [date, setDate] = useState(new Date())
  const [isAddNewMeal, setIsAddNewMeal] = useState(true);

  const newMeal = async (e) => {
    try {
      
      const response = await postData("/api/meals", { title, description, location, maxReservation, price, date })
     setIsAddNewMeal(response.ok)
     return e.preventDefault();
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {isAddNewMeal &&
        < div className='add-new-meal-container'>
          <h3>Add your meal here</h3>

          <div className='add-new-meal-fourm'>
            <form onSubmit={newMeal}>
              <input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
                type="text"
                minLength="2"
                required
              />
              <hr />
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                placeholder="description"
                rows="4"
                cols="23"
                required
              />
              <hr />
              <input
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                type="text"
                minLength="4"
                required
              />
              <hr />
              <label id="maxReservation">Maximum Reservation: </label>
              <br />
              <input
                htmlFor="maxReservation"
                onChange={(e) => setMaxReservation(e.target.value)}
                placeholder="max reservation"
                type="number"
                min="1"
                required
              />
              <hr />
              <label id="pric">Price: </label> <br />
              <input
                htmlFor="price"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="price"
                type="number"
                minLength="2"
                min="10"
                required
              />
              <hr />
              <button > Add </button>
            </form >
          </div>
        </div>
      }
      {!isAddNewMeal && <div className="add-meal-message">Thanks for adding new meal
        <GoHome />
      </div>}
    </>
  );
};

export default AddNewMeal;
