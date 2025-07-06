import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from './Navbar/Navbar';
import Hero from './Hero/Hero';
import About from "./About/About";
import Feedback from "./Feedback/Feedback";
import Footer from './Footer/Footer'
import AppStoreBanner from "./AppStoreBanner/AppStoreBanner";
import About2 from "./About/About2";
import Gallery from "./Gallery";
import Diet_Plan from '../components/Diet Plan/Diet_Plan';




const Website = () => {
    useEffect(() => {
        AOS.init({
          offset: 100,
          duration: 800,
          easing: "ease-in-sine",
          delay: 100,
        });
        AOS.refresh();
      }, []);
  return (
    <div>
      <Navbar/>
      <Hero/>
      <About />
      <About2/>
      <Diet_Plan/>
      <Gallery/>
      <Feedback/>
      <AppStoreBanner/>
      <Footer/>
      
    </div>
  )
}
export default Website