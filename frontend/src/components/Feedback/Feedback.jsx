import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'
import BgVideo from '../../assets/videos/vid.mp4';


function Feedback() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_95xmaoj', 'template_jje6u7q', form.current, {
                publicKey: 'zi0Qh7B_zx6maZ-5R',
            })
            .then(
                () => {
                    console.log('Thank you for your feedback ');
                },
                (error) => {
                    console.log('Please try again ', error.text);
                },
            );
    };

    return (
        <div  data-aos="fade-down-right "className='relative w-full h-screen overflow-hidden' id='feedback'>
        <video 
            className="absolute top-0 left-0 w-full h-full object-cover" 
            autoPlay 
            muted 
            loop
        >
            <source src={BgVideo} type="video/mp4" />
        </video>

        <div className='relative z-10 flex flex-col items-center justify-center h-full'>
            <div className='text-4xl font-bold text-orange-400 text-center p-8 '>
                <h1>Feedback</h1>
            </div>

       

            <div data-aos="zoom-in-down" className='flex h[100vh] items-center justify-center relative'>
                <form ref={form} onSubmit={sendEmail}>
                    <div className='relatives my-4'>
                        <label className=' text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600  peer-fous:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'  > Type your Name</label>
                        <input type="text" name="name" className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 apparence-none dark:focus:blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-orange-600 peer' />
                    </div>
                    <div className='relatives'>
                        <label className=' text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-fous:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'> Type your Email</label>
                        <input type="email" name="email" className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 apparence-none dark:focus:blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-orange-600 peer' />
                    </div>
                    <div className='relatives'>
                        <label className=' text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-fous:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Enter Your Phone Number</label>
                        <input type='text' name='phone' className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 apparence-none dark:focus:blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-orange-600 peer' />
                    </div>
                    <div>
                        < label className=' text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-fous:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'> Feedback  </label>
                        <textarea name="feedback" className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 apparence-none dark:focus:blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-orange-600 peer' />
                    </div>
                    <div className='py-4 '><button className='inline-block font-semibold py-2 px-6 bg-primary text-white hover:bg-primary/80 duration-200 tracking-widest uppercase rounded-md'><input type="submit" value="Send" /></button></div>




                </form>
            </div>
        </div>
</div>
    );
};

export default Feedback