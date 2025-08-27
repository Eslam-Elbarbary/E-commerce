import React from "react"
import "./Home.module.css"
import { FeatureProducts } from "../featureProducts/featureProducts"
import { MainSlider } from "../MainSlider/MainSlider"
import { CatSlider } from "../CatSlider/CatSlider"
export function Home() {
    return (
    <>
    <MainSlider/>
    <CatSlider/>
    <FeatureProducts/>
    </>       
    )
}