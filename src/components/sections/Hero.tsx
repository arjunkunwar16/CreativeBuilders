import { styles } from '../../constants/styles';
import { config } from '../../constants/config';

const Hero = () => {
  return (
    <section className={`relative mx-auto h-full w-full`}>
      <div className={`inset-0 relative top-[4vh] mx-auto max-w-7xl ${styles.paddingX} py-32`}>
        {/*<div className="mt-5 flex flex-col items-center justify-center">*/}
        {/*  <div className="h-5 w-5 rounded-full bg-[#FF0000FF]" />*/}
        {/*  <div className="violet-gradient h-40 w-1 sm:h-80" />*/}
        {/*</div>*/}
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            <span className="text-[#FF0000FF]">{config.hero.name}</span>{' '}
            <span className="relative">
              presents
              <div
                style={{
                  position: 'absolute',
                  bottom: 8,
                  left: 0,
                  height: '5px',
                  width: '100%',
                  zIndex: -1,
                  backgroundColor: '#00ffc3', // Change this to the color of your choice
                }}
              />
            </span>
          </h1>
          <p className={`${styles.heroSubText} text-white-100 mt-2`}>
            <span className="typewriter">
              Where <span className="gradient-text">Ideas</span> Constructs Itself
            </span>
            <span className="cursor"></span>
          </p>
        </div>
      </div>

      {/*<ComputersCanvas />*/}

      {/*<div className="xs:bottom-10 absolute bottom-32 flex w-full items-center justify-center">*/}
      {/*  <a href="#about">*/}
      {/*    <div className="border-secondary flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 p-2">*/}
      {/*      <motion.div*/}
      {/*        animate={{*/}
      {/*          y: [0, 24, 0],*/}
      {/*        }}*/}
      {/*        transition={{*/}
      {/*          duration: 1.5,*/}
      {/*          repeat: Infinity,*/}
      {/*          repeatType: 'loop',*/}
      {/*        }}*/}
      {/*        className="bg-secondary mb-1 h-3 w-3 rounded-full"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </a>*/}
      {/*</div>*/}
    </section>
  );
};

export default Hero;
