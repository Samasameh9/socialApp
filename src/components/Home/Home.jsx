import React, { useEffect, useState } from 'react'
import { GetPosts } from '../../services/postsApi'
import Loading from '../LoadingPage/Loading';
import PostCard from '../card/PostCard';
import CreatePost from './../posts/Createpost'


export default function Home() {
  
 let [AllPosts, setAllPosts] = useState([]);

async function GetAllPosts(){
  
  let response=await GetPosts()
  if(response.message=='success'){
    setAllPosts(response.posts)
console.log(response);

  }
  console.log(response.posts)
}
useEffect(()=>{
  GetAllPosts()
},[])
  return<>
      
  <div className='bg-gray-300'>
    <CreatePost callback={GetAllPosts}/>
    {AllPosts.length>0?AllPosts.map((post)=>{return  <PostCard key={post.id} post={post}   Allcomment={false} callback={GetAllPosts}/>}):<Loading/>}
          
  </div>
  
  </>
}
