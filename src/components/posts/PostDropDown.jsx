import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "@heroui/react";
import { DeleteMyPost, UpdateMyPost } from "../../services/postsApi";

export default function PostDropDown({ postId, callback }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [postBody, setpostBody] = useState("");
  const [image, setimage] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [isLoading, setisLoading] = useState(false);

  async function UpdatePost(e) {
    setisLoading(true);
    e.preventDefault();
    console.log(postBody, image);
    const formdata = new FormData();
    formdata.append("body", postBody ?? "");
    if (image) {
      formdata.append("image", image);
    }
    const response = await UpdateMyPost(formdata, postId);
    console.log(response);
    if (response.message == "success") {
      await callback();
      setpostBody("");
      setimageUrl("");
    }
    setisLoading(false);
  }

     async function DeletePost(){
        const response=await DeleteMyPost(postId)
        setisLoading(true)
        if(response.message=='success'){
       await callback()  
        }
        setisLoading(false)
      }
  function handleImg(e) {
    setimage(e.target.files[0]);
    setimageUrl(URL.createObjectURL(e.target.files[0]));
    e.target.value = "";
  }
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <h2 className="font-bold text-2xl cursor-pointer">...</h2>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="edit">
            {" "}
            <button onClick={onOpen}>Edit post</button>
          </DropdownItem>
          <DropdownItem onClick={DeletePost} key="delete" className="text-danger" color="danger">
         {isLoading?<Spinner/>:"Delete post"}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update post
              </ModalHeader>
              <ModalBody>
                <form onSubmit={UpdatePost}>
                  <div className="editor mx-auto w-10/12 flex flex-col  text-gray-800 border border-gray-300 p-4 shadow-lg max-w-4xl bg-white">
                    <h2 className="text-center font-bold text-2xl py-3 text-gray-600">
                      Post
                    </h2>
                    <input
                      onChange={(e) => {
                        return setpostBody(e.target.value);
                      }}
                      value={postBody}
                      className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                      spellCheck="false"
                      placeholder="Add your post"
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
