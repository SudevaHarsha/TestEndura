"use client"

import React from "react";
import TestimonialSlider from "./TestimonialSlider";

const testimonials = [
    {
      userName: 'John Doe',
      profilePhoto: '/p1.jpeg',
      userRating: 5,
      description: 'TestGlider AI helped me improve my GRE score significantly. The personalized practice questions and lectures were invaluable in my preparation journey.'
    },
    {
      userName: 'Jane Smith',
      profilePhoto: '/p2.jpeg',
      userRating: 4,
      description: 'I am extremely grateful for the guidance provided by TestGlider AI. The study materials were comprehensive and the mock tests really helped me understand the exam format.'
    },
    {
      userName: 'Michael Johnson',
      profilePhoto: '/p3.jpeg',
      userRating: 4.5,
      description: 'I highly recommend TestGlider AI for GRE preparation. The adaptive learning system helped me focus on my weak areas and improve my overall performance.'
    },
    {
      userName: 'Emily Brown',
      profilePhoto: '/p4.jpeg',
      userRating: 5,
      description: 'TestGlider AI is a game-changer in GRE preparation. The user-friendly interface and detailed analytics provided valuable insights into my progress.'
    },
    {
      userName: 'David Wilson',
      profilePhoto: '/p6.jpeg',
      userRating: 4.5,
      description: 'I cant thank TestGlider AI enough for helping me achieve my target GRE score. The platform AI-driven approach made studying efficient and effective.'
    }
  ];
  

const TestimonialsPage = () => {
  return (
    <div className="container mx-auto px-4">
      <TestimonialSlider testimonials={testimonials} />
    </div>
  );
};

export default TestimonialsPage;
