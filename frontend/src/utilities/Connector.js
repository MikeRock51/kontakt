import axios from "axios";
import toast from "react-hot-toast";


const API_URL = process.env.REACT_APP_API_URL;

export async function CreateUser(userData) {
  try {
    const response = await axios.post(API_URL + "/users", userData);
    console.log(response);
    toast.success(response.data.message);
    return true;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.error || "Network error");
    return false;
  }
}

export async function LoginUser(userData) {
  try {
    const response = await axios.post(API_URL + "/sign_in", userData);
    console.log(response);
    toast.success(response.data.message);
    return response.data.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error || "Error signing you in...");
    return false;
  }
}

export async function LogoutUser(token) {
  try {
    const response = await axios.delete(API_URL + "/sign_out", {
      headers: { "auth_token": token },
    });
    console.log(response.data);
    toast.success("Logout successfull");
    return true;
  } catch (error) {
    console.log(error);
    // toast.error("Sign out failed, please try again!");
    return false;
  }
}
