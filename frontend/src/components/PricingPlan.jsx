// src/Pricing.js
import React from 'react';

const PricingPlan = () => {
  return (
    <section className="p-4">
      <a href="https://www.material-tailwind.com/magic-ai" target="_blank" rel="noopener noreferrer">
        Generated with <b>Magic AI Blocks</b> by Creative Tim
      </a>
      <br />
      <br />

      <div className="relative bg-clip-border bg-white text-gray-700 flex h-full min-h-[314px] w-full flex-col items-center justify-center rounded-xl !bg-gray-900 px-8">
        <div className="container mx-auto text-center">
          <h2 className="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-white mb-4">Pricing</h2>
          <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-white mb-8 opacity-70">Choose the perfect plan for your dining experience</p>
        </div>
      </div>
      <div className="px-10 pt-8 pb-16 -mt-16 lg:px-30 xl:px-40">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md lg:h-max lg:scale-105 z-10 translate-y-0">
            <div className="p-6 text-center">
              <h5 className="antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-green-500 flex justify-center mt-2 mb-2">Basic Plan</h5>
              <h3 className="antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-blue-gray-900 flex justify-center mt-5 mb-2">
                $9.99
                <span className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 self-end -translate-y-1">/per month</span>
              </h3>
              <ul className="flex flex-col items-center justify-start gap-3 pt-6 mt-2 mb-5">
                <div className="">
                  <li className="flex items-center gap-2 py-1 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                    </svg>
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-inherit">Online ordering</p>
                  </li>
                  <li className="flex items-center gap-2 py-1 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                    </svg>
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-inherit">Limited support</p>
                  </li>
                </div>
              </ul>
              <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full flex items-center justify-center gap-4"
                type="button"
              >
                Join
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md lg:h-max lg:scale-105 z-10 translate-y-0">
            <div className="p-6 text-center">
              <h5 className="antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-green-500 flex justify-center mt-2 mb-2">Premium Plan</h5>
              <h3 className="antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-blue-gray-900 flex justify-center mt-5 mb-2">
                $19.99
                <span className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 self-end -translate-y-1">/per month</span>
              </h3>
              <ul className="flex flex-col items-center justify-start gap-3 pt-6 mt-2 mb-5">
                <div className="">
                  <li className="flex items-center gap-2 py-1 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                    </svg>
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-inherit">Online ordering</p>
                  </li>
                  <li className="flex items-center gap-2 py-1 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                    </svg>
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-inherit">24/7 support</p>
                  </li>
                  <li className="flex items-center gap-2 py-1 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                    </svg>
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-inherit">Special events access</p>
                  </li>
                </div>
              </ul>
              <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full flex items-center justify-center gap-4"
                type="button"
              >
                Join
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md lg:h-max lg:scale-105 z-10 translate-y-0">
            <div className="p-6 text-center">
              <h5 className="antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-green-500 flex justify-center mt-2 mb-2">Ultimate Plan</h5>
              <h3 className="antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-blue-gray-900 flex justify-center mt-5 mb-2">
                $29.99
                <span className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 self-end -translate-y-1">/per month</span>
              </h3>
              <ul className="flex flex-col items-center justify-start gap-3 pt-6 mt-2 mb-5">
                <div className="">
                  <li className="flex items-center gap-2 py-1 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                    </svg>
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-inherit">Online ordering</p>
                  </li>
                  <li className="flex items-center gap-2 py-1 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                    </svg>
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-inherit">24/7 support</p>
                  </li>
                  <li className="flex items-center gap-2 py-1 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                    </svg>
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-inherit">Special events access</p>
                  </li>
                  <li className="flex items-center gap-2 py-1 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                    </svg>
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-inherit">Personal chef consultation</p>
                  </li>
                </div>
              </ul>
              <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full flex items-center justify-center gap-4"
                type="button"
              >
                Join
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlan;
