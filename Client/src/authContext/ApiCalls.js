import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthAction";

//this is api calls
export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try{
    const res=await axios.post("https://netflix-clone-lyart-gamma.vercel.app/server/auth/login", user);
    dispatch(loginSuccess(res.data));
  }catch(err){
    dispatch(loginFailure());
  }
};
