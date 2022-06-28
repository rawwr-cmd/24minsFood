import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeats = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMealsHandler = async () => {
    const response = await fetch(
      "https://minsfood-116fe-default-rtdb.firebaseio.com/meals.json"
    );
    const responseData = await response.json();
    const loadedMeals = [];
    for (const key in responseData) {
      // console.log(key);
      loadedMeals.push({
        // name: responseData[key].name,
        // description: responseData[key].description,
        // price: responseData[key].price,
        ...responseData[key],
        id: key,
      });
    }
    setMeals(loadedMeals);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMealsHandler();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>We are loading! HangOn there</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeats;
