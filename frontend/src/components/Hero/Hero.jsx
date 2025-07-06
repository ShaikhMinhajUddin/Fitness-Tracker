import React from "react";
import BannerImg from "../../assets/hero2.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BgStyle = {
  backgroundImage: `url(${BannerImg})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};
const Hero = () => {
  return (
    <div
    id='home'
      style={BgStyle}
      className="bg-black text-white duration-300 "
    >
      <div className=" bg-black/80 duration-300 " >
        <div className="container min-h-[620px] flex items-center">
          <div className="w-full md:w-[550px] mx-auto text-center space-y-5">
            <p data-aos="fade-up" className="text-primary text-2xl">
              Start Your Fitness Journey
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="300"
              className="text-5xl md:text-7xl font-bold"
            >
              Your Fitness Journey Begins!
            </h1>
            <p data-aos="fade-up" data-aos-delay="500">
              “The body achieves what the mind believes.”{" "}
            </p>
            {/*
            <Link to='/db/dashboard'>
            <button
              data-aos="fade-up"
              data-aos-delay="700"
              data-aos-once={"true"}
              className="primary-btn"
            >
              Get Started
            </button>
            </Link>
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
