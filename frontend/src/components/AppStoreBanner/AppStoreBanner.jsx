import React from "react";
import AppStoreImg from "../../assets/app_store.jpg";
import PlayStoreImg from "../../assets/play_store.jpg";
import pattern from "../../assets/dumbell.jpg";

const AppStoreBanner = () => {
  return (
    <div className=" bg-black w-full h-full">
      <div
        className="text-white sm:min-h-[400px] sm:flex sm:justify-end sm:items-center rounded-xl bg-cover bg-center bg-no-repeat"
       
      >
        <div className="w-full h-full">
          <div className="space-y-0 max-w-xl mx-auto">
            <h1
              data-aos="fade-up"
              className="text-2xl text-center sm:text-4xl font-semibold font-serif mb-4"
            >
              Get In Touch
            </h1>
            <p>        We're here to support you on your fitness journey. Whether you have questions about our tracker, need help setting goals, or just want to share your progress—we’d love to hear from you. Our team is always ready to assist and keep you motivated.
Drop us a message anytime and let’s reach those goals together.
Stay strong, stay connected!

     </p>
            <div
              data-aos="fade-up"
              className="flex flex-wrap justify-center items-center gap-4"
            >
             
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppStoreBanner;
