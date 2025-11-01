import React from 'react';
import Navbar from '../sections.js/Navbar';
import Footer from '../sections.js/Footer';

const About = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container mt-5 flex-grow-1">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-4">About Our Services</h1>
            <p className="lead text-center">
              We provide comprehensive logistics solutions for transporting your loads anywhere in the world.
              Our network of professional drivers and modern fleet ensures safe, reliable, and timely delivery
              of your cargo to any destination you need.
            </p>
            <p className="text-center">
              Whether you need to ship goods across the country or internationally, our experienced team
              handles all aspects of the transportation process. From pickup to delivery, we ensure your
              shipments arrive on time and in perfect condition.
            </p>
            <div className="text-center mt-4">
              <h3>Why Choose Us?</h3>
              <ul className="list-unstyled">
                <li>✓ Global coverage with local expertise</li>
                <li>✓ Real-time tracking and updates</li>
                <li>✓ Competitive pricing</li>
                <li>✓ Professional and experienced drivers</li>
                <li>✓ Comprehensive insurance coverage</li>
                <li>✓ 24/7 customer support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
