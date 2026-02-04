import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import PostCard from '../card/PostCard'
import Loading from '../LoadingPage/Loading'
import { GetSinglePosts } from '../../services/postsApi'


export default function SinglePost() {
let [postDetails,setpostDetails]=useState(null)
let{id}=useParams()
   async function GetPostDetails(){
   let response=await GetSinglePosts(id)
  console.log(response)
   if(response.message=='success'){
    setpostDetails(response.post)
   }
    }
    useEffect(()=>{
GetPostDetails(id)
    },[])
  
  return <>
  {postDetails? <PostCard Allcomment={true} callback={GetPostDetails} post={postDetails}/>:<Loading/>}
  
  </>
}
