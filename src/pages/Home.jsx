import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Gastronomy from '../components/Gastronomy';
import VideoShowcase from '../components/VideoShowcase';
import Gallery from '../components/Gallery';
import EventCountdown from '../components/EventCountdown';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Gastronomy />
      <VideoShowcase />
      <Gallery />
      <EventCountdown />
    </>
  );
};

export default Home;
