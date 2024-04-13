"use client"

import "./index.css";

import { motion } from 'framer-motion';
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from 'next/image';

const InfiniteSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 1000,
        cssEase: "linear"
    };
    return (
        <div className="w-full overflow-hidden flex flex-col mt-20">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary flex justify-center items-center mb-5">Our University Partners</h1>
            <div className="TopDev_Mobileslider">
                <ul className="TopDev_MobileDevelopers">
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-1.jpeg' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-2.png' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-3.png' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-4.jpeg' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-5.png' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-7.jpeg' height={150} width={150}
                    /></li>

                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-1.jpeg' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-2.png' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-3.png' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-4.jpeg' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-5.png' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-7.jpeg' height={150} width={150}
                    /></li>
                </ul>
            </div>
            {/* <div className="TopDev_Mobileslider relative w-full">
                <ul className="TopDev_MobileDevelopers2 flex flex-nowrap mt-32">
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-1.png' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-2.png' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-3.png' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-4,jpeg' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-5.png' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-7.jpeg' height={150} width={150}
                    /></li>
                </ul>

                <ul style={{left:"0px"}}>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-1.png' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-2.png' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-3.png' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-4,jpeg' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-5.png' height={150} width={150}
                    /></li>
                    <li className="w-64 h-w-64 flex items-center justify-center"><Image src='/logo-7.jpeg' height={150} width={150}
                    /></li>
                </ul>
            </div> */}
            <div className="relative w-full">
                <div className="flex flex-nowrap mt-32 <960:mt-12">
                    <div className="orig animate-rolling-right-1 flex" style={{animationDuration: '55s'}}>
                        <div className="w-64 h-64"><Image src='/logo-1.jpeg' height={150} width={150} className="max-w-fit <960:h-35" /></div>

                        <div className="w-64 h-64"><Image src='/logo-2.png' height={150} width={150} className="max-w-fit <960:h-35" /></div>

                        <div className="w-64 h-64"><Image src='/logo-3.png' height={150} width={150} className="max-w-fit <960:h-35" /></div>

                        <div className="w-64 h-64"><Image src='/logo-4.jpeg' height={150} width={150} className="max-w-fit <960:h-35" /></div>

                        <div className="w-64 h-64"><Image src='/logo-5.png' height={150} width={150} className="max-w-fit <960:h-35" /></div>

                        <div className="w-64 h-64"><Image src='/logo-7.jpeg' height={150} width={150} className="max-w-fit <960:h-35" /></div>

                    </div>
                    <div className="clone animate-rolling-right-2 flex" style={{animationDuration: '55s', left: '0px'}}>
                        <div className="w-64 h-64"><Image src='/logo-1.jpeg' height={150} width={150} className="max-w-fit <960:h-35" /></div>

                        <div className="w-64 h-64"><Image src='/logo-2.png' height={150} width={150} className="max-w-fit <960:h-35" /></div>

                        <div className="w-64 h-64"><Image src='/logo-3.png' height={150} width={150} className="max-w-fit <960:h-35" /></div>

                        <div className="w-64 h-64"><Image src='/logo-4.jpeg' height={150} width={150} className="max-w-fit <960:h-35" /></div>

                        <div className="w-64 h-64"><Image src='/logo-5.png' height={150} width={150} className="max-w-fit <960:h-35" /></div>

                        <div className="w-64 h-64"><Image src='/logo-7.jpeg' height={150} width={150} className="max-w-fit <960:h-35" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfiniteSlider