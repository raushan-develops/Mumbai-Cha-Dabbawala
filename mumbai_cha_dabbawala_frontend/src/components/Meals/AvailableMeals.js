import { useEffect, useState } from 'react';

// import { useNavigate } from "react-router";
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import Filter from '../Filter/Filter';
import classes from './AvailableMeals.module.css';
import { BACKEND_BASE_URL } from '../../config';

const AvailableMeals = () => {

  const [filteredCourse, setFilteredCourse] = useState('0');

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();


  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        `${BACKEND_BASE_URL}/mealslist`
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedMeals = [];

      // Atlas / mongoose returns an array of documents. Support both array and object shapes.
      if (Array.isArray(responseData)) {
        responseData.forEach((doc) => {
          loadedMeals.push({
            id: doc._id || doc.id || '',
            name: doc.name,
            description: doc.description,
            // normalize category to string; default to '0' (no filter) when missing
            category: doc.category !== undefined && doc.category !== null ? String(doc.category) : '0',
            price: doc.price,
          });
        });
      } else {
        for (const key in responseData) {
          loadedMeals.push({
            id: responseData[key]._id || key,
            name: responseData[key].name,
            description: responseData[key].description,
            category: responseData[key].category !== undefined && responseData[key].category !== null ? String(responseData[key].category) : '0',
            price: responseData[key].price,
          });
        }
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  // console.log(meals);
  const filterChangeHandler = (selectedCourse) => {
    setFilteredCourse(selectedCourse);
  };
  // Normalize comparison to strings to avoid type mismatch between backend and select values
  let filteredMeals = meals.filter((meal) => String(meal.category) === String(filteredCourse));
  if (String(filteredCourse) === '0') filteredMeals = meals;
  // console.log(meals);
  // console.log(typeof(filteredMeals));
  // console.log(filteredMeals);
  const mealsList = filteredMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      category={meal.category}
      description={meal.description}
      price={meal.price}
    />
  ));


  return (
    <section className={classes.meals}>
      <Card>
        <Filter
          selected={filteredCourse}
          onChangeFilter={filterChangeHandler} ></Filter>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
