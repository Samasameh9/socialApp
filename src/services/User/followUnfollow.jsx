import axios from "axios"

export async function PutFollowUnfollow(userId){
 try{
    let{data}= await axios.put(`https://route-posts.routemisr.com/users/${userId}/follow`,{},{
  headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
 })
 return data
 }catch(error){
return error
 }
}