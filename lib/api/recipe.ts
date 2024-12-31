import { forkify, mealdb } from "@/constants/url";
// Function to make API request to Meal DB based on category
async function getRecipesByCategory(category: string) {
  if (category.toLowerCase() === "italian")
    return await getRecipesByArea(category);
  try {
    const response = await fetch(`${mealdb}/filter.php?c=${category}`);
    const { meals } = await response.json();
    return meals;
  } catch (error: any) {
    console.error(
      `Error fetching recipes from Meal DB for category ${category}: ${error.message}`
    );
    throw error;
  }
}

// Function to make API request to Meal DB based on search area
async function getRecipesByArea(area: string) {
  try {
    const response = await fetch(`${mealdb}/filter.php?a=${area}`);
    const { meals } = await response.json();
    return meals;
  } catch (error: any) {
    console.error(
      `Error fetching recipes from Meal DB for area ${area}: ${error.message}`
    );
    throw error;
  }
}

async function getRecipesSearch(key: string) {
  try {
    const response = await fetch(`${forkify}/recipes?`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: any) {
    console.error(`Error fetching recipes from Forkify: ${error.message}`);
    throw error;
  }
}

async function getRecipeDetail(id: string) {
  try {
    const response = await fetch(`${forkify}/recipes/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: any) {
    console.error(
      `Error fetching recipe details from Forkify: ${error.message}`
    );
    throw error;
  }
}

export { getRecipesByCategory, getRecipeDetail };
