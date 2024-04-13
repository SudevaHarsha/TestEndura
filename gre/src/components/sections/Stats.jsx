import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const StatsCard = ({ stat, text }) => {
  const controls = useAnimation();
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut" }
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center p-4">
      <motion.div
        animate={controls}
        initial={{ opacity: 0, y: 50 }}
        style={{ fontSize: "3rem" }}
      >
        {stat}
      </motion.div>
      <div className="mt-2">{text}</div>
    </div>
  );
};

const ContainerWithCards = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Statistics</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard stat={100} text="Happy Customers" />
        <StatsCard stat={50} text="Projects Completed" />
        <StatsCard stat={90} text="Team Members" />
      </div>
    </div>
  );
};

export default ContainerWithCards;
