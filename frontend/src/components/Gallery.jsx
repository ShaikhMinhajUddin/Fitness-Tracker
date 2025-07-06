import React from 'react';
import cardio from "../assets/Cardio.jpg";
import yoga from "../assets/Yoga.jpg";
import tracking from '../assets/tracking.jpg';
import push from '../assets/push.jpg';
import fk from '../assets/FK.jpg';
import hero from '../assets/hero2.jpg';

const BlogItem = ({ backgroundImage, title, link }) => {
  return (
    <article
      className="relative  bg-black  w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
      <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
        <h3 className="text-center">
          <a className="text-white text-2xl font-bold text-center" href={link}>
            <span className="absolute inset-0"></span>
            {title}
          </a>
        </h3>
      </div>
    </article>
  );
};

const Gallery = () => {
  const blogItems = [
    {
      src:cardio,
      title: 'cardio is any activity that gets you breathing a little harder and increases your heart rate. ',
     
    },
    {
      src:hero,
      title: 'Dumbbell Exercises for a Full-Body Workout',
     
    },
    {
      src:fk,
      title: 'endurance, strength, balance, and flexibility. Each one has different benefits. ',
     
    },{
      src:push,
      title: 'Push-ups target the chest, shoulders, and triceps and work your core, back, and legs. ',
     
    },{
      src:tracking,
      title: 'TrackinA wrist-worn device heart rate, sleep patterns and swimming laps.',
     
    },{
      src:yoga,
      title: 'a practice that connects the body, breath, and mind.',
      
    },
   
    
    
  ];

  return (<div className=' bg-black flex'>
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mb-12 py-12">
      <article>
        <h2 data-aos="fade-down" className="text-center sm:text-4xl font-bold text-primary">BLOG</h2>
        <section
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
          className="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8"
        >
          {blogItems.map((item, index) => (
            <BlogItem
              key={index}
              backgroundImage={item.src}
              title={item.title}
              link={item.link}
            />
          ))}
        </section>
      </article>
    </section>
    </div>
  );
};

export default Gallery;
