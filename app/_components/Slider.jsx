"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const sliderData = [
  {
    image: "/1.jpg",
    title: "Let us find your Forever Home.",
    description:
      "Step into a world where comfort meets elegance. Discover curated collections that redefine your living space.",
  },
  {
    image: "/2.jpg",
    title: "Find your perfect spot.",
    description:
      "Every corner tells a story. Let our exquisite designs turn your house into a home, full of character and charm.",
  },
  {
    image: "/3.jpg",
    title: "Discover new places.",
    description:
      "Explore spaces that inspire. From timeless classics to modern masterpieces, we have something for every taste.",
  },
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section className="relative h-screen w-screen -mt-24">
      <Slider {...settings}>
        {sliderData.map((slide, index) => (
          <div
            key={index}
            className="relative h-screen w-screen overflow-x-hidden"
          >
            <div
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 to-white/25"></div>
              <div className="relative mx-auto h-full w-full max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
                <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right sm:mt-12 sm:ml-4 custom-position-small-screens">
                  <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-extrabold sm:text-5xl text-black"
                  >
                    {slide.title.split(" ").map((word, i) => (
                      <span
                        key={i}
                        className={
                          i === 3
                            ? "block font-extrabold text-rose-700"
                            : ""
                        }
                      >
                        {word}{" "}
                      </span>
                    ))}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="mt-4 sm:mt-6 max-w-lg sm:text-xl/relaxed text-black"
                  >
                    {slide.description}
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Carousel;
