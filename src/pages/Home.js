import React from "react";
import HeroSection from "../Sections/Hero";
import FeaturedHotels from "../Sections/FeaturedHotels";
import ExclusiveOffers from "../Sections/ExclusiveOffers";
import TestimonialSection from "../Sections/TestimonialSection";
import NewsletterSection from "../Sections/NewsletterSection";
export const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedHotels />
      <ExclusiveOffers />
      <TestimonialSection />
      <NewsletterSection />
    </div>
  );
};
