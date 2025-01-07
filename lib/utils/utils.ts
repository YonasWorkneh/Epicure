const mealObject = (
  meals: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
  }[],
  isCategory = false
) =>
  meals.map((meal) => {
    return {
      id: isCategory ? meal.idCategory : meal.idMeal,
      meal: isCategory ? meal.strCategory : meal.strMeal,
      mealImg: isCategory ? meal.strCategoryThumb : meal.strMealThumb,
    };
  });

export { mealObject };
