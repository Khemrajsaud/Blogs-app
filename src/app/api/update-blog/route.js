import connectToDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const EditNewBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function PUT(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const getCurrentBlogID = searchParams.get("id");

    if (!getCurrentBlogID) {
      return NextResponse.json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const { title, description } = await req.json();
    const { error } = EditNewBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const updateBlogID = await Blog.findOneAndUpdate(
      {
        _id: getCurrentBlogID,
      },
      { title, description },
      { new: true }
    );

    if(updateBlogID){
        return NextResponse.json({
            success: true,
            message: 'Blog is updated successfully'
        })
    }else{
        return NextResponse.json({
            success: false,
            message: "Blog is updated successfully",
          });

    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Blog is updated successfully",
    });
  }
}
