import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-700 text-white py-6 mt-12">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm md:ml-16">
          &copy; {new Date().getFullYear()} capX. All rights reserved.
        </p>
        <p className="text-sm md:mr-16 mt-2 md:mt-0">
          Design & Developed by:
          <strong className="ml-2">
            <a href="https://raushan-kumar.onrender.com" className="text-gray-400 hover:text-white">
              Raushan Kumar
            </a>
          </strong>
        </p>
      </div>
      <div className="mt-4">
        <ul className="flex justify-center space-x-6">
          <li>
            <a href="#privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#contact" className="text-gray-400 hover:text-white">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
