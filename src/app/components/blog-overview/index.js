"use client";

import React, { useEffect, useState } from "react";

import AddNewBlog from "../add-new-blog";

const initialBlogFormData = {
  title: "",
  description: "",
};

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const BlogOverview = ({ blogList }) => {
  const [openDialouge, setopnDialouge] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  const [currentEditedBlogID, setCurrentEditedBlogID] = useState(null);

  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);
  console.log(blogFormData);

  async function handleSaveBlogData() {
    try {
      setLoading(true);
      const apiResponse = currentEditedBlogID != null ?
      await fetch(`/api/update-blog?id=${currentEditedBlogID}`,{
        method: 'PUT',
        body: JSON.stringify(blogFormData)
      }):
      await fetch("api/add-blog", {
        method: "POST",

        body: JSON.stringify(blogFormData),
      });
      const result = await apiResponse.json();
      if (result?.success) {
        setBlogFormData(initialBlogFormData);
        setopnDialouge(false);
        setLoading(false);
        setCurrentEditedBlogID(null);
        router.refresh();
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setBlogFormData(initialBlogFormData);
    }
  }

  async function handleDeleteBlogByID(getCurrentID) {
    try {
      const apiResponse = await fetch(`/api/delete-blog?id=${getCurrentID}`, {
        method: "DELETE",
      });
      const result = await apiResponse.json();

      if (result?.success) router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  function handleEdit(getCurrentID) {
    setCurrentEditedBlogID(getCurrentID?._id);
    setBlogFormData({
      title: getCurrentID?.title,
      description: getCurrentID?.description,
    })
    setopnDialouge(true)
  }
  console.log(currentEditedBlogID);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-500 to-blue-600">
      <AddNewBlog
        openDialouge={openDialouge}
        setopnDialouge={setopnDialouge}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
        currentEditedBlogID={currentEditedBlogID}
        setCurrentEditedBlogID={setCurrentEditedBlogID}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5 mx-5">
        {blogList.map((blockItem) => (
  <Card className="bg-white border-none " key={blockItem._id}>
    <CardContent>
      <CardTitle className='py-2 px-2'>{blockItem?.title}</CardTitle>
      <CardDescription className='py-2 px-2'>{blockItem?.description}</CardDescription>
      <div className="flex items-center mt-5 gap-5">
        <Button
          onClick={() => handleEdit(blockItem)}
          className="bg-gray-900 text-white font-semibold rounded p-2"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteBlogByID(blockItem._id)}
          className="bg-gray-900 text-white font-semibold rounded px-3 py-1"
        >
          Delete
        </Button>
      </div>
    </CardContent>
  </Card>
))
}
      </div>
    </div>
  );
};

export default BlogOverview;
