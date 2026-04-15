import React, { useEffect, useState } from 'react'
import { GetUserBookmarks } from '../../services/User/Bookmarks'
import PostCard from '../card/PostCard';
import Loading from '../LoadingPage/Loading';

export default function AllBookmarks() {
let [UserBookmarks,setUserBookmarks]= useState([])
const [isLoading, setIsLoading] = useState(true);
async function GetBookmarks() {
  setIsLoading(true);
  const response =await GetUserBookmarks();
  console.log(response);
  if(response.success==true){
setUserBookmarks(response?.data?.bookmarks)
  }
   setIsLoading(false);
}

useEffect(()=>{
  GetBookmarks()
},[])
  return<>
 {
   isLoading ? (
     <Loading />
  ) :
   UserBookmarks?.length > 0 ? (
    UserBookmarks.map((bookmark) => (
      <PostCard key={bookmark._id} post={bookmark} refreshBookmarks={GetBookmarks}  />
    ))
  ) : (
    <div className="flex justify-center items-center h-lvh">
      <p className="text-2xl font-bold text-green-700 border-2 rounded-2xl p-5">
        No Bookmarks
      </p>
    </div>
  )
}
  
  </>
}
