import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "./supabase";

const signUp = async (email: string, password: string) => {
  try {
    const { data: user, error } = await supabase
      .from("user")
      .select("*")
      .eq("email", email);
    if (error)
      throw new Error(
        JSON.stringify({
          email: "",
          password: "",
          internal: "Something went wrong",
        })
      );

    if (user[0])
      throw new Error(
        JSON.stringify({
          email: "User already exists. Please use another email.",
          password: "",
        })
      );
    const { data: users, error: err } = await supabase
      .from("user")
      .insert([{ email, password }])
      .select();
    if (err)
      throw new Error(
        JSON.stringify({
          email: "",
          password: "",
          internal: "Something went wrong",
        })
      );

    if (!users) throw new Error(`Error trying to insert user`);
    return users[0];
    // Do something with the user object
  } catch (err: any) {
    throw err;
  }
};

const signIn = async (email: string, password: string) => {
  try {
    const { data: users, error } = await supabase
      .from("user")
      .select("*")
      .eq("email", email);
    if (!users?.length)
      throw new Error(
        JSON.stringify({
          email: "Incorrect email. Please try again !",
          password: "",
        })
      );
    if (users?.length)
      if (users[0].password !== password)
        throw new Error(
          JSON.stringify({
            email: "",
            password: "Incorrect password. Please try again !",
          })
        );
    if (error)
      throw new Error(
        JSON.stringify({
          email: "",
          password: "",
          internal: "Something went wrong",
        })
      );
    return users?.length ? users[0] : [];
  } catch (err: any) {
    throw err;
  }
};

const fetchUser = async () => {
  const id = (await AsyncStorage.getItem("userId")) || "";

  try {
    const { data: user, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", JSON.parse(id));
    console.log(error);
    if (error) {
      throw new Error(
        JSON.stringify({
          email: "",
          password: "",
          internal: "Something went wrong",
        })
      );
    }
    // console.log()
    return user ? user[0] : null;
  } catch (err: any) {
    throw err;
  }
};

const updateUser = async (updates: {
  name?: string;
  email?: string;
  currPass?: string;
  newPass?: string;
  image?: File;
}) => {
  try {
    const updateData: any = {};
    const { email, currPass, newPass, image, name } = updates;
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    const id = (await AsyncStorage.getItem("userId")) || "";
    if (currPass && newPass) {
      const user = await fetchUser();
      if (currPass !== user.password)
        throw new Error(
          JSON.stringify({ currPass: "Enter the correct password." })
        );
      updateData.password = newPass;
    }
    if (image) {
      console.log("filed included");
      const { data: profile, error } = await supabase.storage
        .from("User")
        .upload(`${id}`, image, {
          cacheControl: "3600",
          upsert: true,
        });
      console.log(profile);
      if (error) {
        console.log(error);
        throw new Error(
          JSON.stringify({
            internal: "Error updating image. Please try again.",
          })
        );
      }
      if (profile) {
        updateData.image = profile.fullPath;
      }
    }
    const { data: updatedUser, error } = await supabase
      .from("user")
      .update(updateData)
      .eq("id", JSON.parse(id))
      .select("*");
    if (error)
      throw new Error(JSON.stringify({ internal: "Something went wrong" }));
    return updatedUser[0];
  } catch (err: any) {
    console.error(err.message);
  }
};

const bookmarkRecipe = async (recipeId: string, email: string) => {
  try {
    const { data: user, error } = await supabase
      .from("user")
      .select("*")
      .eq("email", email);
  } catch (err: any) {
    console.error(err.message);
  }
};

export { signUp, signIn, updateUser, fetchUser, bookmarkRecipe };
