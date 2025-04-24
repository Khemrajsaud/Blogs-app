import connectToDB from "@/database";
import { NextResponse } from "next/server";

import Blog from "@/models/blog";



export async function DELETE(req){
   
    try {
        await connectToDB();
        const {searchParams} = new URL(req.url);
        const getCurrentBlogID = searchParams.get('id');
        if(!getCurrentBlogID){
            return NextResponse.json({
                success: false,
                message:'Blog ID is required'
            })
        }

        const deleteCurrentBlogID = await Blog.findByIdAndDelete(getCurrentBlogID);
        if(deleteCurrentBlogID){
            return NextResponse.json({
                success: true,
                message: 'Blog is deleted successfully'
            })
        }
        return NextResponse.json({
            success:false,
            message: "something went wrong ! please try again"
        })
        
    } catch (error) {
       console.log(error);
       

        return NextResponse.json({
            success:false,
            message: "something went wrong ! please try again"
        })
        
    }

}