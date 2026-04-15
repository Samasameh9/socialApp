import { createContext, useEffect, useState } from "react"
import { GetUserLogged } from "../services/User/LoggedUser";


export let AuthContext=createContext()

export function  AuthContextProvider({children}){
const [userToken, setuserToken] = useState(null)

 let [UserDetails, setUserDetails] = useState(null);
 
 //user details
 async function GetUserDetails(){
  let response=await GetUserLogged()
   if(response.message=='success'){
     setUserDetails(response?.data?.user)
    
     
   }
   
}
useEffect(()=>{
    if(localStorage.getItem("token")!=null){
        setuserToken(localStorage.getItem("token"))
        GetUserDetails()
    }
},[])

    return <AuthContext.Provider value={{userToken,setuserToken , UserDetails,   setUserDetails,GetUserDetails}}>
{children}
    </AuthContext.Provider>
}