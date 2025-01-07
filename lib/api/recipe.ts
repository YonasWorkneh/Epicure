import { forkify, mealdb } from "@/constants/url";
import { fetch as fetchNetworkInfo } from "@react-native-community/netinfo";
// Function to make API request to Meal DB based on category
async function getRecipesByCategory(category: string) {
  const key = category.split(" ").join("");
  if (key.toLowerCase() === "italian") return await getRecipesByArea(key);
  if (key.toLowerCase() === "all") return await getRandomMeals();
  try {
    const response = await fetch(`${mealdb}/filter.php?c=${key}`);
    const { meals } = await response.json();
    return meals;
  } catch (error: any) {
    await checkNetwork();
    throw error;
  }
}

// Function to make API request to Meal DB based on search area
async function getRecipesByArea(area: string) {
  try {
    const response = await fetch(`${mealdb}/filter.php?a=${area}`);
    const { meals } = await response.json();
    return meals;
  } catch (err: any) {
    const netStatus = await checkNetwork();
    if (netStatus) throw err;
    else throw new Error(`Network error`);
  }
}

async function getRandomMeals() {
  try {
    const catRes = await fetch(`${mealdb}/categories.php`);
    const { categories } = await catRes.json();
    const response = await Promise.all(
      categories.map((category: { strCategory: string }) =>
        fetch(`${mealdb}/filter.php?c=${category?.strCategory}`)
      )
    );
    const data = await Promise.all(response.map((res) => res.json()));
    const recipes = data.map((meals) => meals.meals).map((recipe) => recipe[0]);
    return recipes;
  } catch (err: any) {
    const netStatus = await checkNetwork();
    if (netStatus) throw err;
    else throw new Error(`Network error`);
  }
}

async function getRecipesSearch(key: string) {
  try {
    const response = await fetch(`${forkify}/recipes?`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err: any) {
    const netStatus = await checkNetwork();
    if (netStatus) throw err;
    else throw new Error(`Network error`);
  }
}

async function getRecipeDetail(id: string) {
  try {
    const response = await fetch(`${forkify}/recipes/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err: any) {
    const netStatus = await checkNetwork();
    if (netStatus) throw err;
    else throw new Error(`Network error`);
  }
}

async function getCategories() {
  try {
    const response = await fetch(`${mealdb}/categories.php`);
    const { categories } = await response.json();
    return categories;
  } catch (err) {
    console.error(err.message);
  }
}

async function checkNetwork() {
  try {
    const res = await fetchNetworkInfo();
    const status = res.isConnected;
    console.log(status);
    return status;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
}

export { getRecipesByCategory, getRecipeDetail, getCategories };
