import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { motion } from 'framer-motion'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bg1 from '../assets/banner-1.jpg'
import bg2 from '../assets/banner-2.jpg'
import bg3 from '../assets/banner-3.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.8 } },
}

const slides = [
  {
    img: bg1,
    alt: 'Banner 1',
    lines: ['Find Your Perfect Match', 'Build a Lifetime of Love'],
    textColor: 'text-white',
    textPosition: 'bottom-[20%] lg:bottom-[30%] lg:left-[10%]',
  },
  {
    img: bg3,
    alt: 'Banner 2',
    lines: ['Love is Just a Click Away','Start Your Journey Now'],
    textColor: 'text-white',
    textPosition: 'bottom-[20%] lg:bottom-[30%] lg:left-[10%]',
  },
  {
    img: bg2,
    alt: 'Banner 3',
    lines: ['Enjoy a Happy and Fulfilling Life,',' with Our Matchmaking Services'],
    textColor: 'text-white text-start',
    textPosition: 'bottom-[20%] lg:bottom-[30%] lg:left-[10%]',
  },
]

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div>
      <Carousel
        autoPlay
        infiniteLoop
        showArrows
        interval={2500}
        showThumbs={false}
        onChange={(index) => setCurrentIndex(index)}
      >
        {slides.map(({ img, alt, lines, textColor, textPosition }, index) => (
          <div key={index} className="relative h-[400px] md:h-[600px] lg:h-[650px]">
            <img className="w-full h-full object-cover" src={img} alt={alt} />
            {currentIndex === index && (
              <motion.div
                className={`absolute z-10 bg-[#00000086] ${textPosition}`}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                {lines.map((line, i) => (
                  <p
                    key={i}
                    className={`${textColor} font-extrabold text-xl md:text-4xl lg:text-6xl p-1 md:p-2 rounded-lg`}
                  >
                    {line}
                  </p>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default Banner
