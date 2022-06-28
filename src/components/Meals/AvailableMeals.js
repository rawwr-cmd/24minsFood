import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState, useCallback } from "react";

const AvailableMeats = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const fetchMealsHandler = useCallback(async () => {
    setIsLoading(true);
    setHttpError(null);
    try {
      const response = await fetch(
        "https://minsfood-116fe-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Lmao, we have messed up our backend (Comeback later)");
      }

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
    } catch (error) {
      setHttpError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <Card>{httpError}</Card>
      </section>
    );
  }

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
      <Card>{mealsList}</Card>
    </section>
  );
};

export default AvailableMeats;
