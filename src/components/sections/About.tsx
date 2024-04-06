import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

import { services } from '../../constants';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { config } from '../../constants/config';
import { Header } from '../atoms/Header';

interface IServiceCard {
  index: number;
  title: string;
  icon: string;
}

const ServiceCard: React.FC<IServiceCard> = ({ index, title, icon }) => (
  <Tilt glareEnable tiltEnable tiltMaxAngleX={30} tiltMaxAngleY={30} glareColor="#aaa6c3">
    <div className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
        className="green-pink-gradient shadow-card w-full rounded-[20px] p-[1px]"
      >
        <div className="bg-tertiary flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] px-12 py-5">
          <img src={icon} alt="web-development" className="h-16 w-16 object-contain" />

          <h3 className="text-center text-[20px] font-bold text-white">{title}</h3>
        </div>
      </motion.div>
    </div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.about} />

      <div className="flex">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="text-secondary mt-4 max-w-3xl text-[17px] leading-[30px]"
        >
          {config.sections.about.content}
          <span className="font-bold">Turn your design dreams into reality!</span> <br />
          <br />
          Our platform combines cutting-edge 3D generation technology with an NFT marketplace.
          <br />
          <br />
          Simply describe your ideal structure, and watch as our AI creates stunning architectural
          models. Sell your creations or find affordable inspiration for your next project. Imagine
          your dream home, a futuristic office, or a whimsical retreat.
          <br />
          <br /> Describe it, and our AI will bring it to life in 3D. Architects, find a new outlet
          for your creativity! Design enthusiasts, discover affordable inspiration! Build, explore,
          and profit within our innovative architecture and NFT marketplace.
        </motion.p>

        <img src="../giphy.gif" alt="Description of GIF" className="ml-10 rounded-xl shadow-2xl" />
      </div>
    </>
  );
};

export default SectionWrapper(About, 'about');
