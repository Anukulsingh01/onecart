import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'

export const userDataContext = createContext()
function UserContext({children}) {
    let [userData,setUserData] = useState("")
    let {serverUrl} = useContext(authDataContext)


  //  const getCurrentUser = async () => {
  //       try {
  //           let result = await axios.get(serverUrl + "/api/user/getcurrentuser",{withCredentials:true})

  //           setUserData(result.data)
  //           console.log(result.data)

  //       } catch (error) {
  //           setUserData(null)
  //           console.log(error)
  //       }
  //   }
  const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        setUserData(null);
        return;
    }

    try {
        // Interceptor headers handle kar lega, bas call karein
        let result = await axios.get(serverUrl + "/api/user/getcurrentuser");
        setUserData(result.data);
    } catch (error) {
        setUserData(null);
        console.log("User fetch error:", error.response?.data?.message);
    }
}

    useEffect(()=>{
     getCurrentUser()
    },[])



    let value = {
     userData,setUserData,getCurrentUser
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
