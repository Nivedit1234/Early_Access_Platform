import React from 'react';
import ImageCarousel from './ImageCarousel';

const GameContent = () => {
  // Sample data
  const images = [
    { id: 1, url: 'cod-img1.webp' },
    { id: 2, url: 'cod-img2.webp' },
    { id: 3, url: 'cod-img3.jpg' },
  ];

  const trailer = { id: 1, title: 'Game Trailer', videoUrl: 'https://example.com/trailer.mp4' };

  return (
    <div>
      <ImageCarousel images={images} />
      <div className="flex justify-center bg-black p-8">
        <div className="w-full max-w-4xl">
          <video className="w-full h-auto object-contain" controls>
            <source src={trailer.videoUrl} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default GameContent;
