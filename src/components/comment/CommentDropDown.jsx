import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Spinner,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@heroui/react";
import { DeleteMyComment, UpdateMyComment } from "../../services/CommentsApi";

export default function CommentDropDown({ CommentId, callback }) {
  const [isLoading, setisLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [CommentContent, setCommentContent] = useState("");

  async function UpdateComment(e) {
    setisLoading(true);
    e.preventDefault();
    console.log(CommentContent);
    const data = {
      content: CommentContent,
    };

    const response = await UpdateMyComment(data, CommentId);
    console.log(response);
    if (response.message == "success") {
      await callback?.();
      setCommentContent("");
      
    }
    setisLoading(false);
  }

  //=================
  async function DeleteComment() {
    const response = await DeleteMyComment(CommentId);
    setisLoading(true);
    if (response.message == "success") {
      await callback();
    }
    setisLoading(false);
  }
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <h2 className="font-bold text-2xl cursor-pointer">...</h2>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem onClick={onOpen} key="edit">
            Edit comment
          </DropdownItem>
          <DropdownItem
            onClick={DeleteComment}
            key="delete"
            className="text-danger"
            color="danger"
          >
            {isLoading ? <Spinner /> : "Delete comment"}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Comment
              </ModalHeader>
              <ModalBody>
                <form onSubmit={UpdateComment}>
                  <div className="editor mx-auto w-10/12 flex flex-col  text-gray-800 border border-gray-300 p-4 shadow-lg max-w-4xl bg-white">
                    <h2 className="text-center font-bold text-2xl py-3 text-gray-600">
                      Comment
                    </h2>
                    <input
                      onChange={(e) => {
                        return setCommentContent(e.target.value);
                      }}
                      value={CommentContent}
                      className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                      spellCheck="false"
                      placeholder="Add your comment"
                      type="text"
                    />
                    <div className="count ml-auto my-2 text-gray-400 text-xs font-semibold">
                      0/300
                    </div>
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
