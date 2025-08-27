import React from "react"
import NotFoundPic from "../../assets/404.jpg"
import "./NotFound.module.css"
export function NotFound() {
    return (
    <>
    <div className="container mx-auto text-center">
        <img className=" w-full " src={NotFoundPic} alt="" />
    </div>
    </>       
    )
}