import React, { useContext, useEffect, useState } from "react";
import { UserPosts } from "../../services/postsApi";
import { GetUserLogged } from "../../services/User/LoggedUser";
import PostCard from "./../card/PostCard";
import { UploadPhoto } from "../../services/User/UploadPhoto";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../LoadingPage/Loading";
import { AuthContext } from "../../context/authContext";

export default function Profile() {
  const { UserDetails, GetUserDetails } = useContext(AuthContext);
  let [userPosts, setuserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // user posts
  async function GetUserPosts() {
    setLoading(true);
    let response = await UserPosts(UserDetails?.id);
    console.log(response);
    if (response.message == "success") {
      setuserPosts(response?.data?.posts);
    }
    setLoading(false);
    console.log(response?.data?.posts);
  }
  //upload photo
  async function handleUpload(e) {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("photo", file);

    let response = await UploadPhoto(formData);
    console.log(response);
    if (response.success == true) {
      toast.success("Photo changed");
      await GetUserDetails();
      await GetUserPosts();
    } else {
      toast.error("Photo unchanged try again");
    }
  }

  useEffect(() => {
    GetUserDetails();
  }, []);

  useEffect(() => {
    if (UserDetails?._id) {
      GetUserPosts();
    }
  }, [UserDetails]);

  return (
    <>
      <Toaster />
      <label
        htmlFor="uploadphoto"
        className="font-bold flex gap-1  text-xl items-center border rounded-2xl justify-center p-2 cursor-pointer bg-green-700 text-white hover:bg-green-600 duration-250 w-sm md:w-lg lg:w-3xl mx-auto"
      >
        <h2>Click to change your profile photo</h2>{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </label>

      <input
        type="file"
        onChange={handleUpload}
        id="uploadphoto"
        className=" hidden"
      />
      {loading ? (
        <Loading />
      ) : userPosts.length === 0 ? (
        <h2 className="text-center font-bold text-3xl text-green-700 my-5">
          No posts
        </h2>
      ) : (
        userPosts.map((post) => (
          <PostCard key={post?._id} post={post} callback={GetUserPosts} />
        ))
      )}
    </>
  );
}
