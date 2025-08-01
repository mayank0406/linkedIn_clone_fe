import { createContext, useContext, useEffect, useState } from "react";
import {authDataContext} from "./AuthContext";
import axios from "axios";

export const userDataContext = createContext();
const UserContext = ({children}) => {
    const {serverUrl} = useContext(authDataContext);
    const [userData , setUserDataLocal] = useState(null);

  const getCurrentUser = async () => {
    try {
     let respose = await axios.get(serverUrl + "/api/v1/users/getcurrentuser", { withCredentials: true })
     console.log(respose.data);
     setUserDataLocal(respose.data);
    } catch (error) {
      console.log(error);
      setUserDataLocal(null);
    }
  }

  useEffect(()=>{
    getCurrentUser();
  },[])

  const value = {
    userData ,setUserDataLocal
  }
    
  return (
    <div>
        <userDataContext.Provider value={value}>
        {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext