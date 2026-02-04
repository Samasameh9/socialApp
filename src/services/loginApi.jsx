import axios from 'axios'


export default async function SignIn(userData) {
  try {
       let {data}= await axios.post("https://linked-posts.routemisr.com/users/signin",userData)
 return data
  } catch (error) {
    return error.response.data
  }
}
//==================================
export async function ChangePassword(userData) {
  try {
    let { data } = await axios.patch("https://linked-posts.routemisr.com/users/change-password",
      userData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return data;

  } catch (error) {
    return error.response?.data;
  }
}