import React, { useContext, useEffect, useState } from "react";
import userimage from "./../../assets/user.png";
import { AuthContext } from "../../context/authContext";
import CommentDropDown from "./CommentDropDown";
import {
  CreateReply,
  GetReplies,
  PutLikeUnlike,
} from "../../services/CommentsApi";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import ReplyCommentss from "./ReplyComments";
export default function Comment({
  Allcomment,
  Comment,
  id,
  callback,
  postId,
  refreshComments,
}) {
  let { UserDetails } = useContext(AuthContext);
  let [Alllike, setAlllike] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [postBody, setpostBody] = useState("");
  const [image, setimage] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const [ReplyComments, setReplyComments] = useState([]);
  const [showReplies, setShowReplies] = useState(false);

  async function CreateReplyComment() {
    const formdata = new FormData();
    formdata.append("content", postBody ?? "");
    if (image) {
      formdata.append("image", image);
    }
    const response = await CreateReply(formdata, postId, Comment?._id);
    if (response.success == true) {
      setpostBody("");
      setimage("");
      setimageUrl("");
      setError("");
      GetCommentsReplies;
      callback();
    }
  }
  function handleImg(e) {
    setimage(e.target.files[0]);
    setimageUrl(URL.createObjectURL(e.target.files[0]));
    e.target.value = "";
  }
  //===========================

  async function CreateLikeUnlick() {
    const response = await PutLikeUnlike(Comment?._id, postId);
    if (response.success == true) {
      setAlllike(response?.data);
    }
  }
  //================================
  async function GetCommentsReplies() {
    const response = await GetReplies(postId, Comment?._id);
    if (response.success == true) {
      setReplyComments(response?.data?.replies);
    }
  }
  useEffect(() => {
    GetCommentsReplies();
  }, [postId, Comment?._id]);
  return (
    <>
      <div className="w-full relative flex items-center bg-gray-100  justify-between border-1 border-gray-200 py-1 rounded-md px-2 my-2">
        <div className="flex">
          {UserDetails?._id !== Comment?.commentCreator?._id ? (
            <Link href={`/userprofileDetails/${Comment?.commentCreator?._id}`}>
              <img
                onError={(e) => {
                  e.target.src = userimage;
                }}
                className=" rounded-full w-10 h-10 mr-3"
                src={
                  UserDetails?._id === Comment?.commentCreator?._id
                    ? UserDetails?.photo
                    : Comment?.commentCreator?.photo
                }
                alt="user photo"
              />
            </Link>
          ) : (
            <img
              onError={(e) => {
                e.target.src = userimage;
              }}
              className=" rounded-full w-10 h-10 mr-3"
              src={
                UserDetails?._id === Comment?.commentCreator?._id
                  ? UserDetails?.photo
                  : Comment?.commentCreator?.photo
              }
              alt="user photo"
            />
          )}

          <div>
            <h3 className="text-md font-semibold ">
              {Comment?.commentCreator.name}
            </h3>

            <p className="text-xs text-gray-500">
              {Comment?.createdAt
                .split(".")
                .slice(0, 1)
                .join(" ")
                .replace("T", " ")}
            </p>
            <p>{Comment?.content}</p>
            <div className="absolute top-10 right-5">
              <button
                onClick={onOpen}
                className="text-xs border p-1 cursor-pointer  rounded border-green-700"
              >
                Reply
              </button>

              <button
                onClick={() => {
                  CreateLikeUnlick();
                }}
                className={`text-xs mx-2 p-1 border rounded border-green-700 cursor-pointer ${Alllike?.liked == true ? "text-green-700" : "text-black"}`}
              >
                Like
              </button>
            </div>
            <div className="w-full flex  flex-col gap-2 items-center bg-gray-100  justify-between  py-1 rounded-md px-2 ">
              {ReplyComments?.length >0 && <button className="text-green-700 cursor-pointer" onClick={() => setShowReplies(!showReplies)}>
                {showReplies ? "Hide Replies" : "Show Replies"}
              </button>}
              {showReplies &&
                ReplyComments.map((reply) => (
                  <ReplyCommentss reply={reply} key={reply._id} />
                ))}
            </div>
          </div>
        </div>
        {UserDetails?._id == Comment?.commentCreator?._id &&
          UserDetails?._id == id && (
            <CommentDropDown
              callback={callback}
              CommentId={Comment._id}
              postId={postId}
              refreshComments={refreshComments}
            />
          )}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">reply</ModalHeader>
              <ModalBody>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    CreateReplyComment();
                  }}
                >
                  <div className="editor mx-auto w-10/12 flex flex-col  text-gray-800 border border-gray-300 p-4 shadow-lg max-w-4xl bg-white">
                    <h2 className="text-center font-bold text-2xl py-3 text-gray-600">
                      Reply
                    </h2>
                    <input
                      onChange={(e) => {
                        return setpostBody(e.target.value);
                      }}
                      value={postBody}
                      className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                      spellCheck="false"
                      placeholder="reply to comment"
                      type="text"
                    />
                    {imageUrl ? (
                      <div className="relative">
                        <img
                          src={imageUrl}
                          alt="postimage"
                          className="w-full"
                        />
                        <svg
                          onClick={() => {
                            setimageUrl("");
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 absolute top-2 right-2 cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    ) : null}
                    {/* icons */}
                    <div className="icons flex text-gray-500 m-2">
                      <input
                        onChange={handleImg}
                        type="file"
                        name=""
                        id={postId}
                        className="hidden"
                      />
                      <svg
                        className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <svg
                        className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <label htmlFor={postId}>
                        {" "}
                        <svg
                          className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                          />
                        </svg>
                      </label>

                      <div className="count ml-auto text-gray-400 text-xs font-semibold">
                        0/300
                      </div>
                    </div>
                    {/* buttons */}

                    {error && (
                      <h2 className="text-red-500 text-center mb-2">{error}</h2>
                    )}
                    <div className="buttons flex justify-end">
                      <Button
                        isLoading={isLoading}
                        type="submit"
                        className="btn border border-green-700 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-green-700"
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
