import React from "react";
import TestimonialCard from "../components/TestimonialCard";

const TestimonialSection = () => {
  return (
    <div style={{ backgroundColor: "#f8f9fa", padding: "60px 0" }}>
      <div className="container">
        <h2
          className="text-center mb-3"
          style={{ fontFamily: "Times New Roman" }}
        >
          What Our Guests Say
        </h2>
        <p className="text-center text-muted mb-5">
          Discover why discerning travellers choose QuickStay for their luxury
          accommodations around the world.
        </p>

        <div className="row g-4">
          <div className="col-md-4">
            <TestimonialCard
              image="profile.jpeg"
              name="Emma Rodriguez"
              location="Barcelona, Spain"
              rating={5}
              text="I've used many booking platforms before, but none compare to the personalized experience and attention to detail that QuickStay provides."
            />
          </div>
          <div className="col-md-4">
            <TestimonialCard
              image="profile.jpeg"
              name="Emma Rodriguez"
              location="Barcelona, Spain"
              rating={4}
              text="I've used many booking platforms before, but none compare to the personalized experience and attention to detail that QuickStay provides."
            />
          </div>
          <div className="col-md-4">
            <TestimonialCard
              image="profile.jpeg"
              name="Emma Rodriguez"
              location="Barcelona, Spain"
              rating={3}
              text="I've used many booking platforms before, but none compare to the personalized experience and attention to detail that QuickStay provides."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
