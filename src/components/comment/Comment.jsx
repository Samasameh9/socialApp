import React, { useContext } from "react";
import userimage from "./../../assets/user.png";
import { AuthContext } from "../../context/authContext";
import CommentDropDown from "./CommentDropDown";

export default function Comment({ Comment, id, callback }) {
  let { UserDetails } = useContext(AuthContext);

  return (
    <>
      <div className="w-full h-16 flex items-center bg-gray-100  justify-between border-1 border-gray-200 py-5 rounded-md px-2 my-2">
        <div className="flex">
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
          </div>
        </div>
        {UserDetails?._id == Comment?.commentCreator?._id &&
          UserDetails?._id == id && (
            <CommentDropDown callback={callback} CommentId={Comment._id} />
          )}
      </div>
    </>
  );
}
