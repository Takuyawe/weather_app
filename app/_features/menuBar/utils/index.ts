import axios from "axios";

export const handleSignIn = async (email: string, password: string) => {
  const response = await axios.get("http://localhost:3000/api/auth/signIn", {
    params: {
      email: email,
      password: password,
    },
  });
  const data = response.data;
  return data;
};

export const handleSignOut = async () => {
  const response = await axios.get("http://localhost:3000/api/auth/signOut");
  const data = response.data;
  return data;
};

export const fetchFavorites = async (owner: string) => {
  const response = await axios.get(
    "http://localhost:3000/api/favorites/fetchData",
    {
      params: {
        owner: owner,
      },
    }
  );
  const data = response.data.favorites;
  return data;
};

export const removeFavorite = async (locationName: string, owner: string) => {
  const response = await axios.delete(
    "http://localhost:3000/api/favorites/removeData",
    {
      data: { locationName, owner },
    }
  );
  const data = response.data;
  return data;
};
