import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo1 from '../assets/bmwlogo.png';
import logo2 from '../assets/bmwlogo2.png';
import logo3 from '../assets/bmwlogo3.png';
import logo4 from '../assets/bmwlogo4.png';
import logo5 from '../assets/bmwlogo5.png';
import logo6 from '../assets/bmwlogo6.png';
import styles from './Sectionlogo.module.scss';

const Sectionlogo = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className={styles.logodiv}>
      <div className={styles.container}>
        <div className={styles.card} data-aos="fade-up" data-aos-delay="0">
          <img src={logo1} alt="BMW" />
          <h1>BMW</h1>
        </div>
        <div className={styles.card} data-aos="fade-up" data-aos-delay="100">
          <img src={logo2} alt="Lamborghini" />
          <h1>Lamborghini</h1>
        </div>
        <div className={styles.card} data-aos="fade-up" data-aos-delay="200">
          <img src={logo3} alt="Nissan" />
          <h1>Nissan</h1>
        </div>
        <div className={styles.card} data-aos="fade-up" data-aos-delay="300">
          <img src={logo4} alt="Lexus" />
          <h1>Lexus</h1>
        </div>
        <div className={styles.card} data-aos="fade-up" data-aos-delay="400">
          <img src={logo5} alt="Toyota" />
          <h1>Toyota</h1>
        </div>
        <div className={styles.card} data-aos="fade-up" data-aos-delay="500">
          <img src={logo6} alt="Mercedes-Benz" />
          <h1>Mercedes-Benz</h1>
        </div>
      </div>
    </div>
  );
};

export default Sectionlogo;
