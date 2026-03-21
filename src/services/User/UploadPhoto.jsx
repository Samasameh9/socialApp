import axios from "axios"

export async function UploadPhoto(formdata){
 try{
    let{data}= await axios.put(`https://route-posts.routemisr.com/users/upload-photo`,formdata,{
     headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
    
 })
 return data
 }catch(error){
return error
 }

}