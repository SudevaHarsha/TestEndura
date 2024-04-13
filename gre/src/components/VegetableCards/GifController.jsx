import React, { useEffect, useRef, useState } from 'react';

export const GifPlayer = ({ gifUrl, previewUrl, width, height }) => {
  const gifRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const gifElement = gifRef.current;

    if (isHovered) {
      gifElement.play();
    } else {
      gifElement.pause();
      gifElement.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <video
      src={isHovered ? gifUrl : previewUrl}
      alt="GIF"
      width={width}
      height={height}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={gifRef}
    />
  );
};