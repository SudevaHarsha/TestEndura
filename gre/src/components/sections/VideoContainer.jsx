import React from 'react';

import Image from "next/image"

const VideoContainer = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-4">AI-Powered Essay & Speech Corrections</h2>
      <p className="text-lg text-center text-gray-700 mb-8">Faster than Ever. Revise your answers within seconds with TestGlider AI&apos;s Correction and improve your score. Receive up to 6 monthly correction credits with a basic subscription.</p>

      <div className="aspect-w-16 aspect-h-9">
        <Image alt="image" loading="lazy" width="1454" height="850" decoding="async" data-nimg="1" style={{ color: 'transparent' }} src="/img1.png" />
      </div>
    </div>
  );
};

export default VideoContainer;
