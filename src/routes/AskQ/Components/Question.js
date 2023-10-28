import React from "react";
import "./Question.css";

const Question =()=>{
    return (
        <div className="big-q-div">
       <textarea name="paragraph_text" cols="70" rows="10">
       Post your question here!
       </textarea>
        <button class='button-56'>
            Post
        </button>
        </div>

    );
}

export default Question;