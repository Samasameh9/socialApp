import axios from 'axios'


export default async function SignUpApi(userData) {
  try {
       let {data}= await axios.post("https://linked-posts.routemisr.com/users/signup",userData)
 return data
  } catch (error) {
    return error.response.data
  }
}
