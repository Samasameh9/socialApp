import { Button, Input, Link } from "@heroui/react";
import React, { useContext, useEffect, useState } from "react";
import Comment from "../comment/Comment";
import { CreateMyComment, GetComments } from "./../../services/CommentsApi";
import PostDropDown from "../posts/PostDropDown";
import { AuthContext } from "../../context/authContext";
import { GetLikes, LikeUnlikePost, SharePost } from "../../services/postsApi";
import toast, { Toaster } from "react-hot-toast";

export default function PostCard({ post, Allcomment, callback }) {
  let { UserDetails } = useContext(AuthContext);
  let [commentContent, setcommentContent] = useState("");
  let [Allpostcomments, setAllpostcomments] = useState([]);
  let [likeunlick, setlikeunlick] = useState(null);
  let [Alllike, setAlllike] = useState([]);
  let [isLoading, setisLoading] = useState(false);

  async function createComment(e) {
    setisLoading(true);
    e.preventDefault();
    const response = await CreateMyComment(commentContent, post.id);
    if (response.success == true) {
      setcommentContent("");
      await GetAllComments();
      await callback?.();
    }
    setisLoading(false);
  }
  //========================
  async function GetAllComments() {
    let response = await GetComments(post.id);
    if (response.success == true) {
      setAllpostcomments(response?.data?.comments);
    }
  }
  //========================
  async function GetAllLikes() {
    let response = await GetLikes(post.id);
    if (response.success == true) {
      setAlllike(response?.data);
    }
  }
  useEffect(() => {
    GetAllComments();
    GetAllLikes();
  }, [post.id]);
  //========================
  async function createlikeUnlick() {
    const response = await LikeUnlikePost(post.id);
    if (response.success == true) {
      setlikeunlick(response?.data);
      GetAllLikes();
    }
  }
  //========================
  async function SharePosts() {
    const response = await SharePost({ body: "check this post" }, post.id);
    if (response.success == true) {
      toast.success(response.message);
      callback();
    } else {
      toast.error(response.message);
    }
  }
  return (
    <>
      <div className=" w-full flex flex-col px-3 lg:px-10 py-3  ">
        <Toaster />
        <div className="w-sm md:w-lg lg:w-3xl mx-auto bg-white ">
          <div className=" w-full rounded-md shadow-md h-auto py-3 px-3  ">
            <div className="w-full h-16 flex items-center  justify-between  ">
              <div className="flex">
                <img
                  className=" rounded-full w-10 h-10 mr-3"
                  src={post.user?.photo}
                  alt="user photo"
                />
                <div>
                  <h3 className="text-md font-semibold "> {post.user.name}</h3>
                  <p className="text-xs text-gray-500">
                    {post.createdAt
                      .split(".")
                      .slice(0, 1)
                      .join(" ")
                      .replace("T", " ")}
                  </p>
                </div>
              </div>

              {UserDetails?._id == post.user._id && (
                <PostDropDown callback={callback} postId={post.id} />
              )}
            </div>
            {post.body ? <p>{post.body}</p> : null}
            {post.image ? (
              <img
                src={post.image}
                className="w-full h-60 object-cover object-center"
                alt={post.body}
              />
            ) : null}
            {post.sharedPost && (
              <div className="flex flex-col gap-2">
                <div className="border border-green-700 rounded-md p-3 bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={post.sharedPost.user?.photo}
                      className="w-8 h-8 rounded-full"
                      alt="shared user"
                    />
                    <h4 className="text-sm font-semibold">
                      {post.sharedPost.user?.name}
                    </h4>
                  </div>
                  {post.sharedPost.body && (
                    <p className="text-sm text-gray-700 mb-2">
                      {post.sharedPost.body}
                    </p>
                  )}
                  {post.sharedPost.image && (
                    <img
                      src={post.sharedPost.image}
                      className="w-full h-60 object-cover rounded-md"
                      alt="shared post"
                    />
                  )}
                </div>
              </div>
            )}
            <div className="w-full h-8 flex items-center px-3 my-3">
              <div className="bg-green-700 z-10 w-5 h-5 rounded-full flex items-center justify-center ">
                <svg
                  className="w-3 h-3 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width={27}
                  height={27}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#b0b0b0"
                  strokeWidth={2}
                  strokeLinecap="square"
                  strokeLinejoin="round"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              </div>
              <div className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center -ml-1">
                <svg
                  className="w-3 h-3 fill-current stroke-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width={27}
                  height={27}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#b0b0b0"
                  strokeWidth={2}
                  strokeLinecap="square"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className="w-full flex justify-between">
                <p className="ml-3 text-gray-500">{Alllike?.likes?.length}</p>
                <p className="ml-3 text-gray-500 flex cursor-pointer ">
                  {post.commentsCount}{" "}
                  <Link
                    className="ps-1 text-green-700"
                    href={`/singlepost/${post.id}`}
                  >
                    {" "}
                    comments
                  </Link>
                </p>
              </div>
            </div>
            <hr />
            <div className="grid grid-cols-3 w-full px-5 my-3">
              <button
                onClick={() => {
                  createlikeUnlick();
                }}
                className="flex flex-row justify-center items-center w-full space-x-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={27}
                  height={27}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={
                    likeunlick?.liked === true
                      ? "green"
                      : likeunlick?.liked === false
                        ? "#838383"
                        : Alllike?.likes?.some(
                              (like) => like._id === UserDetails.id,
                            )
                          ? "green"
                          : "#838383"
                  }
                  strokeWidth={2}
                  strokeLinecap="square"
                  strokeLinejoin="round"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                <span
                  className={`cursor-pointer font-semibold text-lg ${
                    likeunlick?.liked === true
                      ? "text-green-600"
                      : likeunlick?.liked === false
                        ? "text-gray-600"
                        : Alllike?.likes?.some(
                              (like) => like._id === UserDetails.id,
                            )
                          ? "text-green-600"
                          : "text-gray-600"
                  }`}
                >
                  Like
                </span>
              </button>

              <button className="flex flex-row justify-center items-center w-full space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={27}
                  height={27}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#838383"
                  strokeWidth={2}
                  strokeLinecap="square"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="cursor-pointer font-semibold text-lg text-gray-600">
                  Comment
                </span>
              </button>
              <button
                onClick={() => {
                  SharePosts();
                }}
                className="flex flex-row justify-center items-center w-full space-x-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={27}
                  height={27}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#838383"
                  strokeWidth={2}
                  strokeLinecap="square"
                  strokeLinejoin="round"
                >
                  <circle cx={18} cy={5} r={3} />
                  <circle cx={6} cy={12} r={3} />
                  <circle cx={18} cy={19} r={3} />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                <span className="cursor-pointer font-semibold text-lg text-gray-600">
                  Share
                </span>
              </button>
            </div>
            <div className="w-full">
              <form onSubmit={createComment} className="flex gap-3 ">
                <Input
                  value={commentContent}
                  onChange={(e) => setcommentContent(e.target.value)}
                  placeholder=" add your comment..."
                  variant="bordered"
                />
                <Button
                  isLoading={isLoading}
                  type="submit"
                  className="bg-green-700 text-white "
                >
                  Add comment
                </Button>
              </form>

              {Allpostcomments?.length > 0 && Allcomment == false ? (
                <Comment
                  callback={callback}
                  Comment={post.topComment}
                  id={post.user._id}
                  postId={post.id}
                  refreshComments={GetAllComments}
                />
              ) : (
                Allpostcomments?.map((comment) => {
                  return (
                    <Comment
                      key={comment._id}
                      callback={callback}
                      Comment={comment}
                      id={post.user._id}
                      postId={post.id}
                      refreshComments={GetAllComments}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
