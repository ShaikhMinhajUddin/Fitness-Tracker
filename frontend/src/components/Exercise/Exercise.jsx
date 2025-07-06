import React from "react";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import { GiWeightLiftingUp } from "react-icons/gi";
import { GiMuscleUp } from "react-icons/gi";
import { GiMedicinePills } from "react-icons/gi";
import { MdSportsGymnastics } from "react-icons/md";
import { TbYoga } from "react-icons/tb";





const skillsData = [
  {
    name: "WEIGHT lIFTING",
    icon: (<GiWeightLiftingUp  className="text-5xl text-primary group-hover:text-black duration-300"/> ),
    
    link: "#",
    description: [
      "Weight training, also known as resistance.",
      "or strength training, builds lean, stronger muscles,",
      "strengthens your bones and joints,",
      "and can help keep your metabolism in a healthy state",    ],
   
    aosDelay: "0",
  },
  {
    name: "FLEX MUSCLES",
    icon: (<GiMuscleUp className="text-5xl text-primary group-hover:text-black duration-300"/> ),
    
    link: "#",
    description: [
      "Muscle flexion, muscle flexion is not ",
      "only popular in bodybuilding",
      "competitions but is also an ",
     "exercise to increase muscle strength.",    ],
   
    aosDelay: "0",
  },
  {
    name: "POWERFULL VITAMIN",
    icon: (<GiMedicinePills className="text-5xl text-primary group-hover:text-black duration-300"/> ),
    
    link: "#",
    description: [
      "itamins aid in energy being released from carbohydrates",
      "Other important roles of micronutrients ",
      "include aiding in the production of oxygen-carrying",
      "proteins, maintenance of bone health ",
      "proper immune system function, and fluid balance",    ],
   
    aosDelay: "0",
  },
  {
    name: "CARDIO",
    icon: (<MdSportsGymnastics  className="text-5xl text-primary group-hover:text-black duration-300"/> ),
    
    link: "#",
    description: [
      "Also called aerobic or endurance exercise, ",
      " cardio is any activity that gets you breathing a little harder ",
      "and increases your heart rate. Low-intensity activities ",
      "(such as walking your dog or waltzing) count.",    ],
   
    aosDelay: "0",
  },
  {
    name: " YOGA ",
    icon: (<TbYoga  className="text-5xl text-primary group-hover:text-black duration-300"/> ),
    
    link: "#",
    description: [
      "Then choose a more vigorous yoga style like ",
      " power yoga, Ashtanga yoga, or Bikram yoga. ",
      "All three styles combine an athletic series of poses ",
      " into a vigorous, total-body workout.",    ],
   
    aosDelay: "0",
  },
 
  {
    name: " WALKING  ",
    icon: (<FaPersonWalkingDashedLineArrowRight  className="text-5xl text-primary group-hover:text-black duration-300"/> ),
    
    link: "#",
    description: [
      "Walking for 30 minutes a day or more on most days ",
      " of the week is a great way to improve or maintain your overall health.. ",
      "If you can't manage 30 minutes a day,",
      "remember even short walks more frequently can be beneficial. ",    ],
   
    aosDelay: "0",
  },
 
  
  
];
const Exercise = () => {
  return (
    <>
      
      
      <div  className="dark:bg-black dark:text-white py-14 sm:min-h-[600px] sm:grid sm:place-items-center" id='exercise'>
        <div className="container">
          <div className="pb-12">
            <h1
              data-aos="fade-up"
              className="text-3xl font-bold text-center sm:text-4xl"
            >
              Why <span className="text-primary">Choose</span> Us
            </h1>
            <h1
              data-aos="fade-up"
              className="text-3xl font-bold text-center sm:text-4xl"
            >
             Buid  Your  <span className="text-primary">Best Body</span> 
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {skillsData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card   sm:space-y-6 p-4 sm:py-16 bg-gray-200 dark:bg-dark  hover:bg-primary/20 dark:hover:bg-primary/50 duration-300 text-black dark:text-white rounded-lg group "
              >
                {/* <div className="grid place-items-center">{skill.icon}</div> */}
                <h1 className="text-3xl font-bold">{skill.name}</h1>
                <h1 className="text-center text-4xl font-semibold text-primary">
                 {skill.Icon}
                </h1>

                {skill.description.map((desc) => (
                  <p>{desc}</p>
                ))}
                
               
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Exercise;