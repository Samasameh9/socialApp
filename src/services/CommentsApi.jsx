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
export async function DeleteMyComment(id){
 try{
    let{data}= await  axios.delete(`https://linked-posts.routemisr.com/comments/${id}`,
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
export async function UpdateMyComment(formdata,commentId){
 try{
    let{data}= await axios.put(`https://linked-posts.routemisr.com/comments/${commentId}`,formdata,{
  headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
 })
 return data
 }catch(error){
return error
 }

}