import React from "react";
import { PostCreatePage, PostForm } from "./components/MainPage";


function PostCreate() {

    return(
        <div className="PostCreate">
            <PostCreatePage/>
        </div>
    );
}


export {PostCreate, PostForm}