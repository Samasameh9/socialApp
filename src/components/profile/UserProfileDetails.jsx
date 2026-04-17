import React, { useContext, useEffect, useState } from "react";
import { GetUserPosts, GetUserProfile } from "../../services/User/userProfile";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { PutFollowUnfollow } from "../../services/User/followUnfollow";
import Loading from "../LoadingPage/Loading";
import PostCard from "../card/PostCard";

export default function UserProfileDetails() {
  let { UserDetails, setUserDetails } = useContext(AuthContext);
  let [userProfileDetails, setuserProfileDetails] = useState([]);
  let [handlefollow, sethandlefollow] = useState(false);
  let [userPosts, setuserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  let { userId } = useParams();
  async function UserProfile() {
    const response = await GetUserProfile(userId);
    if (response.success == true) {
      setuserProfileDetails(response?.data?.user);
    }
  }
  //=============================
  async function createFollowUnfollow() {
    const response = await PutFollowUnfollow(userId);
    console.log(response);

    if (response.success == true) {
      sethandlefollow(response?.data?.following);
      await UserProfile();
      await UserpostsDetails();
    }
  }
  //=============================
  async function UserpostsDetails() {
    setLoading(true);
    const response = await GetUserPosts(userId);
    if (response.message == "success") {
      setuserPosts(response?.data?.posts);
    }
    setLoading(false);
  }
  useEffect(() => {
    UserProfile();
    UserpostsDetails();
  }, [userId]);
  return (
    <>
      <div className="container mx-auto 2xl:w-3xl">
        <div className=" flex flex-col md:flex-row items-center justify-evenly  py-5 md:px-5">
          <div className=" w-sm  lg:w-1/3 ">
            <img
              src={userProfileDetails?.photo}
              alt="user photo"
              className="rounded-2xl w-full border-2 border-green-700"
            />
          </div>
          <div className=" py-5 text-center">
            <h3 className="font-bold text-green-700">
              Followers: {userProfileDetails?.followersCount}
            </h3>
            <h3 className="font-bold text-green-700 py-3">
              Following: {userProfileDetails?.followingCount}
            </h3>
            <h3 className="font-bold text-green-700">
              Posts: {userPosts?.length}
            </h3>
            <button
              onClick={() => createFollowUnfollow()}
              className={` border-2 p-2 border-green-700 mt-3 rounded-2xl ${
                userProfileDetails?.followers?.some(
                  (follower) => follower._id === UserDetails?._id,
                ) || handlefollow
                  ? "text-green-700"
                  : "text-gray-500"
              } font-semibold cursor-pointer`}
            >
              { userProfileDetails?.followers?.some(
                  (follower) => follower._id === UserDetails?._id,
                ) ||handlefollow?'unfollow':'follow'}
            </button>
          </div>
        </div>
        <div className="border rounded-2xl border-green-700 w-1/2 mx-auto">
          <h2 className="font-bold text-green-700 px-5 text-xl underline ">
            Details:
          </h2>
          <h4 className="px-5 font-semibold text-green-700">
            Name : {userProfileDetails?.name}
          </h4>
          <h4 className="px-5 font-semibold text-green-700">
            Gender : {userProfileDetails?.gender}
          </h4>
          <h4 className="px-5 font-semibold text-green-700">
            Email : {userProfileDetails?.email}
          </h4>
          <h4 className="px-5 font-semibold text-green-700">
            Date of birth :{" "}
            {new Date(userProfileDetails?.dateOfBirth).toLocaleDateString()}
          </h4>
          <h4 className="px-5 font-semibold text-green-700">
            Joined at :{" "}
            {userProfileDetails?.createdAt
              ?.split(".")
              .slice(0, 1)
              .join(" ")
              .replace("T", " ")}
          </h4>
        </div>
        <h2 className="flex justify-center text-2xl font-bold text-green-700 my-5">
          {" "}
          posts
        </h2>
        {loading ? (
          <Loading />
        ) : userPosts.length === 0 ? (
          <h2 className="text-center font-bold text-3xl text-green-700 my-5">
            No posts
          </h2>
        ) : (
          userPosts.map((post) => (
            <PostCard
              key={post?._id}
              post={post}
              callback={GetUserPosts}
              Allcomment={false}
            />
          ))
        )}
      </div>
    </>
  );
}
