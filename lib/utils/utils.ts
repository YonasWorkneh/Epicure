import { fetch as fetchNetworkInfo } from "@react-native-community/netinfo";

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
  meals?.length
    ? meals?.map((meal) => {
        return {
          id: isCategory ? meal.idCategory : meal.idMeal,
          meal: isCategory ? meal.strCategory : meal.strMeal,
          mealImg: isCategory ? meal.strCategoryThumb : meal.strMealThumb,
          api: Object.keys(meal).some((key: string) => key.includes("str"))
            ? "mealDb"
            : "forkify",
        };
      })
    : [];
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
const mealForkify = (
  meals: {
    id: string;
    title: string;
    image_url: string;
  }[]
) =>
  meals?.length
    ? meals?.map((meal) => {
        return {
          id: meal.id,
          meal: meal.title,
          mealImg: meal.image_url,
          api: "forkify",
        };
      })
    : [];

export { mealObject, checkNetwork, mealForkify };
