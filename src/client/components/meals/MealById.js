import { useParams } from "react-router-dom";
import React ,{useEffect ,useContext }from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { Data } from "../../App";

const MealById = () => {
  const { meals, idMeal, setIdMeal } =useContext(Data)
  const param = useParams();


  useEffect(()=>{(async()=>{
    const mealByID = await meals.find((meal) => meal.id == Number(param.id));
    setIdMeal(mealByID);
  })()
  
  },[])
  return (
    // <div>
    //   <h3>{idMeal.title}</h3>
    //   <li>{idMeal.price} .Kr</li>
    //   <p>{idMeal.description}</p>
    //   <div>Location: {idMeal.location}</div>
    //   <br />
    // </div>

    <Card style={{ width: "18rem" }}>
    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
    <Card.Body>
      <Card.Title>{idMeal.title}</Card.Title>
      <Card.Title>{idMeal.price} Kr</Card.Title>
      <Card.Text>
      {idMeal.description}
        </Card.Text>
        <Card.Title>Location: {idMeal.location}</Card.Title>

    </Card.Body>

   
  </Card>
  );
};

export default MealById;
