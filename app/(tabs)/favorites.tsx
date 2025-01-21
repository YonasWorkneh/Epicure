import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import images from "../../constants/images";
import MenuIcon from "@/components/MenuIcon";
import SearchBar from "@/components/SearchBar";
import { getBookmarkedRecipes, getRecipeDetail } from "@/lib/api/recipe";
import Loader from "@/components/Loader";
import FavouriteItem from "@/components/FavoriteItem";
import { showMessage } from "react-native-flash-message";

interface Recipe {
  id?: string;
  title?: string;
  src?: string;
  publisher?: string;
  api?: string;
}

export default function favorites() {
  const [error, setError] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    const getFavorites = async () => {
      try {
        setIsLoading(true);
        const data = await getBookmarkedRecipes();
        if (!data.length) setError("No Bookmarked recipes.");
        const promises = data.map(async (item: any) => {
          return getRecipeDetail(item.recipeId, item.api);
        });

        // Wait for all promises to resolve
        const results = await Promise.all(promises);
        const modifiedResults = results.map((result: any) => {
          const isMealDb = Object.keys(result).some((key: any) =>
            key.includes("str")
          );
          if (isMealDb)
            return {
              title:
                result.strMeal.length > 20
                  ? `${result.strMeal.slice(0, 20)}-`
                  : result.strMeal,
              src: result.strMealThumb,
              id: result.idMeal,
              publisher: "meal Db",
              api: "mealDb",
            };
          return {
            title:
              result.title.length > 10
                ? `${result.title.slice(0, 15)}-`
                : result.title,
            src: result.image_url,
            id: result.id,
            publisher: result.publisher,
            api: "forkify",
          };
        });
        console.log(modifiedResults);
        if (!modifiedResults.length) {
          setError("no favorites");
        }
        setFavoriteRecipes(modifiedResults);
      } catch (err: any) {
        showMessage({
          type: "danger",
          message: "Error trying to fetch you favorite recipes . ",
        });
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    };
    getFavorites();
  }, []);
  return (
    <SafeAreaView>
      {/* header */}
      <View style={tw`px-4 flex flex-row  justify-between items-center`}>
        <CustomButton icon={<MenuIcon />} />
        <Text style={tw`font-bold text-2xl text-amber-500`}>Epicure</Text>
        <Link href={"./profile"}>
          <Image source={images.avatar} style={tw`w-10 h-10`} />
        </Link>
      </View>
      <View style={tw`px-4`}>
        <Text
          style={[
            tw`font-semibold text-2xl text-amber-500 my-5`,
            { fontFamily: "Diphylleia-Regular" },
          ]}
        >
          Favourites
        </Text>
        {/* search bar */}
        <SearchBar
          onSearch={() => console.log("object")}
          placeholder={"Search your favorites"}
        />
      </View>
      {/* list of favorites */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <View style={tw`items-center mt-20`}>
          <Image
            source={require("../../assets/images/empty-box.png")}
            style={tw`h-40 w-50`}
          />
          <Text style={tw`${"font-pbold text-gray-600 text-[1.1rem] mb-5"}`}>
            No Favorites
          </Text>
          <Text style={tw`${"text-xs text-gray-400 text-center mb-5"}`}>
            Looks like you haven't added any {`\n`} recipe to your favorite.
          </Text>
          <CustomButton
            backgroundStyles="bg-amber-500 py-2 rounded-[4rem] p-2 px-6"
            text="Browse recipes"
            textStyles="text-white text-xs"
            onPress={() => router.navigate("/(tabs)/home")}
          />
        </View>
      ) : (
        <FlatList
          data={favoriteRecipes}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<View style={tw`mt-3`}></View>}
          renderItem={({ item, index }) => (
            <FavouriteItem
              title={item.title}
              src={item.src}
              id={item.id}
              api={item.api}
              key={item.title}
              publisher={item.publisher}
              removeHandler={setFavoriteRecipes}
              duration={(index + 2) * 100}
            />
          )}
          contentContainerStyle={tw`p-4`}
          ListFooterComponent={<View style={{ height: 300 }} />}
        />
      )}
    </SafeAreaView>
  );
}
