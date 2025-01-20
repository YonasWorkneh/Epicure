import { forkify, mealdb } from "@/constants/url";
import { checkNetwork } from "../utils/utils";

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
    const response = await Promise.allSettled([
      fetch(`${forkify}/recipes?search=${key}`),
      fetch(`${mealdb}/search.php?s=${key}`),
    ]);
    const [fky, mdb] = response;
    const fkyResult =
      fky.status === "fulfilled"
        ? await fky.value.json()
        : { error: fky.reason };
    const mdbResult =
      mdb.status === "fulfilled"
        ? await mdb.value.json()
        : { error: mdb.reason };

    if (fkyResult.error) throw Error("Error fetching recipes");
    if (mdbResult.error) throw Error("Error fetching recipes");
    const { recipes: fkyRecipes } = fkyResult.data;
    const { meals: mdbRecipes } = mdbResult;

    return { fkyRecipes, mdbRecipes };
  } catch (err: any) {
    const netStatus = await checkNetwork();
    if (netStatus) throw err;
    else throw new Error(`Network error`);
  }
}

async function getRecipeDetail(id: string, api: string) {
  try {
    const response =
      api === "forkify"
        ? await fetch(`${forkify}/recipes/${id}`)
        : await fetch(`${mealdb}/lookup.php?i=${id}`);
    const data = await response.json();
    const recipe = api === "forkify" ? data.data.recipe : data.meals[0];
    return recipe;
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
    // console.log(categories);
    return categories;
  } catch (err: any) {
    console.error(err.message);
  }
}

export {
  getRecipesByCategory,
  getRecipeDetail,
  getCategories,
  getRecipesSearch,
};
