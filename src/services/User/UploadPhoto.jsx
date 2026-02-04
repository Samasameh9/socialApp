import axios from "axios"

export async function UploadPhoto(formdata){
 try{
    let{data}= await axios.put(`https://linked-posts.routemisr.com/users/upload-photo`,formdata,{
    headers:{
        token:localStorage.getItem("token")
    }
    
 })
 return data
 }catch(error){
return error
 }

}