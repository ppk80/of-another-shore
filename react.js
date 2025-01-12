import React from 'react';
import { motion } from 'framer-motion';

const FloatingImages = () => {
  // Animation configurations for each image
  const imageConfigs = [
    {
      src: "img/egg.png",
      href: "dungan.html",
      width: "400px",
      initial: { x: "20%", y: "20%", rotate: -50 },
      animate: {
        x: ["20%", "23%", "18%", "20%"],
        y: ["20%", "23%", "18%", "20%"],
        rotate: [-50, -45, -55, -50],
      },
      transition: { duration: 20, repeat: Infinity, ease: "linear" }
    },
    {
      src: "img/photograph.png",
      href: "inmachuria.html",
      width: "400px",
      initial: { x: "35%", y: "15%", rotate: 60 },
      animate: {
        x: ["35%", "38%", "33%", "35%"],
        y: ["15%", "18%", "13%", "15%"],
        rotate: [60, 65, 55, 60],
      },
      transition: { duration: 25, repeat: Infinity, ease: "linear" }
    },
    {
      src: "img/grains.png",
      href: "afterwemisrememberthegrains.html",
      width: "300px",
      initial: { x: "40%", y: "25%", rotate: 5 },
      animate: {
        x: ["40%", "43%", "38%", "40%"],
        y: ["25%", "28%", "23%", "25%"],
        rotate: [5, 8, 2, 5],
      },
      transition: { duration: 15, repeat: Infinity, ease: "linear" }
    }
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {imageConfigs.map((config, index) => (
        <motion.a
          key={index}
          href={config.href}
          target="_blank"
          className="absolute"
          initial={config.initial}
          animate={config.animate}
          transition={config.transition}
        >
          <img
            src={config.src}
            alt={`Image ${index + 1}`}
            style={{ width: config.width }}
            className="pointer-events-auto"
          />
        </motion.a>
      ))}
    </div>
  );
};

export default FloatingImages;