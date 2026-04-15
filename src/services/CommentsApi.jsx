import axios from "axios"

export async function CreateMyComment(content,id){
 try{
    let{data}= await  axios.post(`https://route-posts.routemisr.com/posts/${id}/comments`,{
        content:content,
        
    },{
    headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
    
 })
 return data
 }catch(error){
return error
 }

}
//=====================================
export async function DeleteMyComment(id, postId){
 try{
    let{data}= await  axios.delete(`https://route-posts.routemisr.com/posts/${postId}/comments/${id}`,
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
//====================================
export async function UpdateMyComment(formdata,commentId,postId){
 try{
    let{data}= await axios.put(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,formdata,{
  headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
 })
 return data
 }catch(error){
return error
 }

}
//====================================
export async function GetComments(postId){
try {
    let {data}= await axios.get(`https://route-posts.routemisr.com/posts/${postId}/comments`, {
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            },
            params:{
                limit:10,
                sort:'-createdAt'
            }
        }
    )
    return data

} catch (error) {
    return error
}
}
//============================
export async function CreateReply(formdata,postId,commentId){
 try{
    let{data}= await  axios.post(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies`,formdata,{
    headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
    
 })
 return data
 }catch(error){
return error
 }
}
//===========================
export async function PutLikeUnlike(commentId,postId){
 try{
    let{data}= await axios.put(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/like`,{},{
  headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
 })
 return data
 }catch(error){
return error
 }
}
//===========================
export async function GetReplies(postId,commentId){
try {
    let {data}= await axios.get(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies`, {
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            },
            params:{
                limit:10,
                sort:'-createdAt'
            }
        }
    )
    return data

} catch (error) {
    return error
}
}
