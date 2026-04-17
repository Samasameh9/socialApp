import axios from "axios"

export async function GetUserProfile(userId){
 try{
    let{data}= await  axios.get(`https://route-posts.routemisr.com/users/${userId}/profile`,{
    headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
    
 })
 return data
 }catch(error){
return error
 }
}
export async function GetUserPosts(userId){
 try{
    let{data}= await  axios.get(`https://route-posts.routemisr.com/users/${userId}/posts`,{
    headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
    
 })
 return data
 }catch(error){
return error
 }
}