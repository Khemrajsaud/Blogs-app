
// import BlogOverview from '@/app/components/blog-overview'
// import React from 'react'

// async function fetchListofBlogs(){
//   try {
//     const apiResponse = await fetch("http://localhost:3000/api/get-blogs",{
   
//       method: "GET",
//       cache: 'no-store'
//     })
//     const result = await apiResponse.json();
//     return result?.data
    
//   } catch (error) {
//     throw new Error(error)
    
//   }
// }

// const Blogs = async() => {

//   const blogList = await fetchListofBlogs();
//   console.log(blogList, 'blogList');
  
//   return (
//     <div>
//         <BlogOverview blogList={blogList}/>
       
//     </div>
 
//   )
// }

// export default Blogs


// app/blogs/page.tsx
import BlogOverview from '@/app/components/blog-overview'
import React from 'react'

// 🧠 Force server-side rendering to avoid prerender build errors
export const dynamic = "force-dynamic";

async function fetchListOfBlogs() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const apiResponse = await fetch(`${baseUrl}/api/get-blogs`, {
      method: "GET",
      cache: 'no-store',
    });

    const result = await apiResponse.json();
    return result?.data || [];
  } catch (error) {
    console.error("❌ Error fetching blog list:", error);
    return [];
  }
}

const Blogs = async () => {
  const blogList = await fetchListOfBlogs();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>
      <BlogOverview blogList={blogList} />
    </div>
  );
};

export default Blogs;




