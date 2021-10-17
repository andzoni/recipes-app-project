import { useState, useEffect } from 'react';

export default function useCategories() {
  const [foodCategories, setFoodCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);

  const foodFilter = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinkFilter = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const LENGTH_LIMIT = 6;

  useEffect(() => {
    const fetchApiCategories = async (url, length) => {
      try {
        const response = await (await fetch(url)).json();
        const responseKeys = Object.keys(response)[0];

        return response[responseKeys].slice(0, length - 1);
      } catch (error) {
        console.log(error);
      }
    };

    setFoodCategories(fetchApiCategories(foodFilter, LENGTH_LIMIT));
    setDrinkCategories(fetchApiCategories(drinkFilter, LENGTH_LIMIT));
  }, []);

  return { foodCategories, drinkCategories };
}
