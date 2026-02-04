import axios from "axios"

export async function CreateMyComment(content,id){
 try{
    let{data}= await  axios.post(`https://linked-posts.routemisr.com/comments`,{
        content:content,
        post:id
    },{
    headers:{
        token:localStorage.getItem("token")
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
        token:localStorage.getItem("token")
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
        token:localStorage.getItem("token")
    }
 })
 return data
 }catch(error){
return error
 }

}