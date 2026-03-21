import axios from "axios"

export async function GetUserLogged(){
 try{
    let{data}= await  axios.get(`https://route-posts.routemisr.com/users/profile-data`,{
    headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
    
 })
 return data
 }catch(error){
return error
 }

}