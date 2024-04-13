'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Navigation, Pagination } from 'swiper/modules';
import { testimonials } from '@/data/PracticeDtata';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import { Button } from '@/components/ui/button';

const TestimonialSlider = () => {
  const [swiper, setSwiper] = useState(null)
  const [showNavigation, setShowNavigation] = useState(false)

  return (
    <section className='relative h-auto py-4 sm:py-12 text-white'>

<h1 className="text-3xl sm:text-5xl font-bold text-primary/70 flex justify-center items-center mb-5">Testimonials</h1>
      <div className='container'>

        {/* Main slides */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          onSwiper={setSwiper}
          navigation
          pagination={{ clickable: true }}
          className='h-96 w-full rounded-lg'
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div key={index} className="flex flex-col items-center justify-center">
                <div className="w-full flex justify-center items-center relative">
                  <Image src="/logo.png" width={70} height={70} className="rounded-sm absolute top-5 left-5" />
                  <Image src={testimonial.profilePhoto} alt={testimonial.userName} width={270} height={100} className="sm:max-h-5: rounded-full sm:rounded-lg mb-4" />
                  {/* <h1 className="text-white font-bold text-sm">GRE Topper</h1> */}
                </div>

                <h2 className="text-xl font-bold mb-2 text-black">{testimonial.userName}</h2>
                <div className="flex items-center mb-2">
                  {[...Array(Math.floor(testimonial.userRating))].map((_, i) => (
                    <svg key={i} className="w-6 h-6 fill-current text-yellow-500" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 1l2.05 5.35 5.45.1c.85.01 1.2 1.14.55 1.7l-4.45 3.86 1.38 5.28c.22 1.08-.87 1.95-1.8 1.36L10 14.26l-4.63 3.24c-.94.65-2.02-.28-1.8-1.36l1.38-5.28L1 8.46c-.65-.56-.3-1.69.55-1.7l5.45-.1L10 1z" />
                    </svg>
                  ))}
                  {[...Array(5 - Math.floor(testimonial.userRating))].map((_, i) => (
                    <svg key={i} className="w-6 h-6 fill-current text-gray-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 1l2.05 5.35 5.45.1c.85.01 1.2 1.14.55 1.7l-4.45 3.86 1.38 5.28c.22 1.08-.87 1.95-1.8 1.36L10 14.26l-4.63 3.24c-.94.65-2.02-.28-1.8-1.36l1.38-5.28L1 8.46c-.65-.56-.3-1.69.55-1.7l5.45-.1L10 1z" />
                    </svg>
                  ))}
                </div>
                <p className="text-center text-black">{testimonial.description}</p>
                <Button className="hidden sm:block w-36 bg-blue-600 text-white px-3 py-2 hover:bg-blue-500/90 hover:text-white/80 rounded-md text-sm font-medium mt-2">#MJ Academy</Button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default TestimonialSlider