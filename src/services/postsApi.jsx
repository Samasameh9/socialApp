import axios from "axios";

export async function GetPosts(){
try {
    let {data}= await axios.get('https://route-posts.routemisr.com/posts', {
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            },
            params:{
                limit:50,
                sort:'-createdAt'
            }
        }
    )
    return data

} catch (error) {
    return error
}
}
// ========================
export async function GetSinglePosts(id){
try {
    let{data}= await axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    return data

} catch (error) {
    return error
}
}
//========================
export async function CreateMyPost(formdata){
 try{
    let{data}= await axios.post(`https://route-posts.routemisr.com/posts`,formdata,{
      headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
    
 })
 return data
 }catch(error){
return error
 }

}
//============================
export async function UserPosts(userId){
 try{
    let{data}= await axios.get(`https://route-posts.routemisr.com/users/${userId}/posts`,{
     headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
  
 })
 return data
 }catch(error){
return error
 }

}
//========================
export async function UpdateMyPost(formdata,postId){
 try{
    let{data}= await axios.put(`https://route-posts.routemisr.com/posts/${postId}`,formdata,{
  headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
    
 })
 return data
 }catch(error){
return error
 }

}
//========================
export async function DeleteMyPost(id){
 try{
    let{data}= await  axios.delete(`https://route-posts.routemisr.com/posts/${id}`,
     {
    headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
    
 })
 return data
 }catch(error){
return error
 }

}
//=========================
export async function LikeUnlikePost(postId){
 try{
    let{data}= await axios.put(`https://route-posts.routemisr.com/posts/${postId}/like`,{},
 { headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
    
        })  
 return data
 }catch(error){
return error
 }

}
//==========================
export async function GetLikes(postId){
try {
    let {data}= await axios.get(`https://route-posts.routemisr.com/posts/${postId}/likes`, {
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            },
            params:{
                limit:50,
                
            }
        }
    )
    return data

} catch (error) {
    return error
}
}
//==========================
export async function SharePost(formdata,postId){
 try{
    let{data}= await axios.post(`https://route-posts.routemisr.com/posts/${postId}/share`,formdata,{
      headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
    
 })
 return data
 }catch(error){
return error
 }

}
//==========================
export async function BookmarkUnbookmark(postId){
 try{
    let{data}= await axios.put(`https://route-posts.routemisr.com/posts/${postId}/bookmark`,{},
 { headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
    
        })  
 return data
 }catch(error){
return error
 }

}
//===========================
export async function GetHome(){
try {
    let {data}= await axios.get('https://route-posts.routemisr.com/posts/feed?only=following&limit=10', {
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    return data

} catch (error) {
    return error
}
}