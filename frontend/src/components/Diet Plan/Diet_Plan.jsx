import React from "react";
import Slider from "react-slick";
import abd from "../../assets/abd.jpg";
import Fk from "../../assets/FK.jpg";
import Pwr from "../../assets/Pwr.jpg";
import WL from "../../assets/WL.jpg";

const Diet_PlanData = [
  {
    id: 1,
    name: "Abdominal Excerises",
    text: "Abdominal Exercises help strengthen the core muscles, improve posture, and support overall stability They target the abs, obliques, and lower back to enhance balance and athletic performance",
   src: abd
  },
  {
    id: 2,
    name: "Flex Muscles",
    text: "Flexing muscles involves contracting them to display strength, improve muscle control, or enhance definition. It can also be used as a technique to build mind-muscle connection during workouts.",
   src:Fk,
  },
  {
    id: 3,
    name: "Powerfull Vitamin",
    text: "Powerful vitamins play a key role in boosting energy, supporting immunity, and enhancing overall health. They help your body function at its best, especially during intense workouts or recovery.",
    src: Pwr,
  },
  {
    id: 5,
    name: "Weight Lifting ",
    text: "Weight lifting is a strength-training exercise that builds muscle, increases endurance, and boosts metabolism. It helps improve overall fitness, bone density, and body composition when done consistently and safely",
    src:WL,
  },
];

const Diet_Plan = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div id="exercise">
    <div className="py-10 bg-black text-white w-full" >
      <div className="container mx-auto">
        {/* header */}
        <div className="text-center mb-10 max-w-[600px] mx-auto" >
          <h1 data-aos="fade-up" className="text-3xl font-bold">
           Why Choose US
          </h1>
        </div>

        {/* cards */}
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {Diet_PlanData.map((data) => (
              <div key={data.id} className="my-6">
                <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl bg-primary/10 relative dark:bg-dark">
                  <div className="mb-4">
                    <img
                      src={data.src}
                      alt=""
                      className="rounded-full w-20 h-20"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <p className="text-xs text-gray-300">{data.text}</p>
                      <h1 className="text-xl font-bold text-white dark:text-primary">
                        {data.name}
                      </h1>
                    </div>
                  </div>
                  <p className="text-primary/20 text-9xl font-serif absolute top-0 right-0"></p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Diet_Plan;
