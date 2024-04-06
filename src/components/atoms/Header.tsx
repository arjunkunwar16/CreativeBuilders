import React from "react";
import { motion } from "framer-motion";

import { styles } from "../../constants/styles";
import { textVariant } from "../../utils/motion";


interface IHeader {
  useMotion: boolean;
  p: string;
  h2: string;
}

export const Header: React.FC<IHeader> = ({ useMotion, p, h2 }) => {


  const Content = () => (
    <>
      <p className={styles.sectionSubText}>{p}</p>
      <h2 className={styles.sectionHeadText} style={{ background: "linear-gradient(to right, red, purple)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradientAnimation 1s infinite" }}>{h2}</h2>
    </>
  );

  return useMotion === true ? (
    <motion.div variants={textVariant()}>
      <Content />
    </motion.div>
  ) : (
    <Content />
  );
};
