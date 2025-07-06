import React from "react";
import BannerImg from "../../assets/abc.jpg";

const About = () => {
  return (
    <div className="py-14 bg-black  duration-300" > 
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center" id='about'>
          <div data-aos="fade-up">
            <img
              src={BannerImg}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] rounded-lg shadow-lg object-cover mx-auto"
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <div data-aos="zoom-in" className="flex items-center gap-4">
                <div className="text-primary/70 text-7xl ">
                  <h1 className="font-bold">01</h1>
                </div>
                <div>
                  <p className="text-primary font-bold">Fitness Tracking</p>
                  <h1 className="text-slate-100  font-bold text-3xl ">About us</h1>
                </div>
              </div>
              <p data-aos="fade-up" className="leading-8 tracking-wide text-gray-300">
                These websites focus on tracking your physical activities such as steps taken, distance covered, and calories burned. They often use sensors in smartphones or wearable devices to monitor movement.
                <br/><br/>
                Workout and Exercise Applications: These websites provide users with various workout routines, exercises, and fitness plans. They can be tailored to different fitness levels and goals, including strength training, cardio, yoga, and more.
              </p>
              
             
            </div>
          </div>
        </div>
      </div>
    </div>

    
  );
};

export default About;
