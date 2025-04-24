"use client";

import React, { Fragment } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddNewBlog = ({
  openDialouge,
  setopnDialouge,
  loading,
  blogFormData,
  setBlogFormData,
  handleSaveBlogData,
  currentEditedBlogID,
  setCurrentEditedBlogID,
}) => {
  return (
    <Fragment>
      <div className="p-6">
      
          <Button
            className="bg-gray-900 rounded p-2 text-white "
            onClick={() => setopnDialouge(true)}
          >
            Add New Blogs
          </Button>
          
        
      </div>
      <Link className="font-bold pl-7" href="/">
            Home
          </Link>
     

      <Dialog
        open={openDialouge}
        onOpenChange={() => {
          setopnDialouge(false);
          setBlogFormData({
            title: "",
            description: "",
          });
          setCurrentEditedBlogID(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>
              {currentEditedBlogID ? "Edit Blog" : "Add New Blogs"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                title
              </Label>
              <Input
                name="title"
                placeholder="Enter blog title"
                value={blogFormData.title}
                onChange={(event) =>
                  setBlogFormData({
                    ...blogFormData,
                    title: event.target.value,
                  })
                }
                id="title"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                description
              </Label>
              <Input
                name="description"
                placeholder="description"
                value={blogFormData.description}
                onChange={(event) =>
                  setBlogFormData({
                    ...blogFormData,
                    description: event.target.value,
                  })
                }
                id="description"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSaveBlogData}
              className="bg-gray-900 rounded p-2 text-white"
              type="button"
            >
              {loading ? "saving changeg" : "save change"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default AddNewBlog;
