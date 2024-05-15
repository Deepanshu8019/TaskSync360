import React, { useState, useEffect } from 'react';
import { IoIosArrowForward } from "react-icons/io";

const BackgroundChanger = ({ setBackgroundColor }) => {
  const gradient = [
    'linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)',
    'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)',
    'linear-gradient(to right, #74ebd5 0%, #9face6 100%)',
    'linear-gradient(to top, #d9afd9 0%, #97d9e1 100%)',
    'linear-gradient(to right, #ff758c 0%, #ff7eb3 100%);',
    'linear-gradient(to top, #00c6fb 0%, #005bea 100%)'
  ];

  const [count, setCount] = useState(0);

  // Set initial background color
  useEffect(() => {
    setBackgroundColor(gradient[1]);
  }, []); // Run only once after the initial render

  return (
    <div className=' w-full flex felx items-center justify-center'>
      <div className='m-20 text-3xl flex items-center background-wrapper'>
        <button onClick={() => {
          setCount((prevCount) => (prevCount === 0 ? gradient.length - 1 : prevCount - 1));
          setBackgroundColor(gradient[count]);
        }}><IoIosArrowForward className='rotate-180' /></button>
        <span className=''>Change Theme</span>
        <button onClick={() => {
          setCount((prevCount) => (prevCount === gradient.length - 1 ? 0 : prevCount + 1));
          setBackgroundColor(gradient[count]);
        }}><IoIosArrowForward /></button>
      </div>
    </div>
  );
};

export default BackgroundChanger;
