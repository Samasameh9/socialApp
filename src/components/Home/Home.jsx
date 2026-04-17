import React, { useEffect, useState } from 'react'
import { GetHome } from '../../services/postsApi'
import PostCard from '../card/PostCard';
import Loading from '../LoadingPage/Loading';

export default function Home() {
  const [Homeposts,setHomeposts] = useState([])
    const [loading, setLoading] = useState(true);
    async function GetHomePosts() {
        setLoading(true);
        const response= await GetHome()
        console.log(response);
        if(response.success==true){
            setHomeposts(response?.data?.posts)
        }
        setLoading(false)
        
    }
    useEffect(()=>{
        GetHomePosts();
    },[]);
  return <>
  
    <h2 className="flex justify-center text-2xl font-bold text-green-700 py-4"> Posts</h2>
        {loading ? (
          <Loading />
        ) : Homeposts.length === 0 ? (
          <h2 className="text-center font-bold text-3xl text-green-700 my-5">
            No posts
          </h2>
        ) : (
          Homeposts.map((post) => (
            <PostCard key={post?.id} post={post}  Allcomment={false} Homeposts={Homeposts} />
          ))
        )}
  
  
  </>
}
