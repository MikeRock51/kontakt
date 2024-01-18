import axios from "axios";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL;

export async function FetchUserCotacts(authToken) {
  try {
    const response = await axios.get(API_URL + "/users/contacts", { headers: {auth_token: authToken} });
    console.log(response);
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.error || "Network error");
    return false;
  }
}
