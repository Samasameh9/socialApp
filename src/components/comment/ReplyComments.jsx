import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext';
import userimage from "./../../assets/user.png";
export default function ReplyCommentss({reply}) {
      let { UserDetails } = useContext(AuthContext);
  return <>
  
                <div
                  className="w-full flex border border-gray-200  items-center bg-gray-100  py-1 rounded-md px-2 my-2"
                >
                  <div className="flex ">
                     {UserDetails?._id !== reply?.commentCreator?._id ?   <Link href={`/userprofileDetails/${reply?.commentCreator?._id}`}><img
                      onError={(e) => (e.target.src = userimage)}
                      className="rounded-full w-10 h-10 mr-3"
                      src={reply?.commentCreator?.photo}
                      alt="user"
                    /></Link>:<img
                      onError={(e) => (e.target.src = userimage)}
                      className="rounded-full w-10 h-10 mr-3"
                      src={reply?.commentCreator?.photo}
                      alt="user"
                    />}
                    <div>
                      <h3 className="text-md font-semibold">
                        {reply?.commentCreator?.name}
                      </h3>

                      <p className="text-xs text-gray-500">
                        {reply?.createdAt?.split(".")[0].replace("T", " ")}
                      </p>

                      <p>{reply?.content}</p>
                      {reply?.image && (
                        <div>
                          <img
                            src={reply?.image}
                            className="w-full h-40 object-cover  rounded-2xl"
                            alt="reply image"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
          
           
  </>
}
