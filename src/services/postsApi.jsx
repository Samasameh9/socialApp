import axios from "axios";

export async function GetPosts(){
try {
    let {data}= await axios.get('https://linked-posts.routemisr.com/posts', {
            headers:{
                token:localStorage.getItem('token')
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
    let{data}= await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
            headers:{
                token:localStorage.getItem('token')
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
    let{data}= await axios.post(`https://linked-posts.routemisr.com/posts`,formdata,{
    headers:{
        token:localStorage.getItem("token")
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
    let{data}= await axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts?limit=2`,{
    headers:{
        token:localStorage.getItem("token")
    },
  
 })
 return data
 }catch(error){
return error
 }

}
//========================
export async function UpdateMyPost(formdata,postId){
 try{
    let{data}= await axios.put(`https://linked-posts.routemisr.com/posts/${postId}`,formdata,{
    headers:{
        token:localStorage.getItem("token")
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
    let{data}= await  axios.delete(`https://linked-posts.routemisr.com/posts/${id}`,
     {
    headers:{
        token:localStorage.getItem("token")
    }
    
 })
 return data
 }catch(error){
return error
 }

}