
import BlogOverview from '@/app/components/blog-overview'
import React from 'react'

async function fetchListofBlogs(){
  try {
    const apiResponse = await fetch("http://localhost:3000/api/get-blogs",{
      method: "GET",
      cache: 'no-store'
    })
    const result = await apiResponse.json();
    return result?.data
    
  } catch (error) {
    throw new Error(error)
    
  }
}

const Blogs = async() => {

  const blogList = await fetchListofBlogs();
  console.log(blogList, 'blogList');
  
  return (
    <div>
        <BlogOverview blogList={blogList}/>
       
    </div>
 
  )
}

export default Blogs
