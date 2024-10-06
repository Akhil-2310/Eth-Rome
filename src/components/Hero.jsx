import React from 'react'

const Hero = () => {
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Create Communities while preserving privacy!</h1>
            <h4 className="py-6">
             Creators can create communities and engage with the audience and take decisions based on the proposals for betterment.
            </h4>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero
