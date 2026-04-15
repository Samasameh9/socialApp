import axios from "axios"

export async function GetUserBookmarks(){
 try{
    let{data}= await  axios.get(`https://route-posts.routemisr.com/users/bookmarks`,{
    headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
    
 })
 return data
 }catch(error){
return error
 }

}