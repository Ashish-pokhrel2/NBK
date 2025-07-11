import React from 'react';
import nbkLogo from "../../assets/imgs/logo.jpeg";
import ctevt from "../../assets/imgs/ctevt.png";
import '../../styles/home.css'; // Import your custom styles
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaPaw,
  FaEnvelope,
  FaBus,
  FaTiktok
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className=" bg-[#0C1E48] text-white py-10 px-4 md:px-20 font-sans text-sm">
      <div className=" flex flex-col md:flex-row gap-38 justify-between">
        {/* Left Column */}
        <div className="flex flex-col gap-6 max-w-xs">
          <img src={nbkLogo} alt="USA Logo" className="w-30 mx-15" />
          <div className="leading-relaxed">
            <p className="font-bold text-xl ">NBK POLYTECHNIC INSTITUTE</p>
            <p>(251) 460-6101</p>
            <p>MOBILE, Itahari-9</p>
            <p className="underline cursor-pointer">Privacy Statement | Contact NBK</p>
            <p>© 2025 CTEVT</p>
          </div>
          
        </div>

        {/* Center Column */}
        <div className="grid grid-cols-2 gap-x-25 mt-10 gap-y-2 text-white text-sm">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-base mb-2">NBK RESOURCES</p>
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Courses</a>
            <a href="#" className="hover:underline">Our Faculty</a>
            <a href="#" className="hover:underline">About Us</a>
            <a href="#" className="hover:underline">Gallery</a>
            <a href="#" className="hover:underline">Notification</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
         
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-10 max-w-xs">
          <div className="flex justify-start gap-4 mr-[40] text-2xl">
            <FaFacebookF className="cursor-pointer hover:text-gray-400" />
            <FaTwitter className="cursor-pointer hover:text-gray-400" />
            <FaTiktok className="cursor-pointer hover:text-gray-400" />
            <FaInstagram className="cursor-pointer hover:text-gray-400" />
            <FaEnvelope className="cursor-pointer hover:text-gray-400" />
          </div>
          <div>
            <img src={ctevt} alt="Upward & Onward Logo" className="w-48" />
            <p className="text-xs mt-2 leading-snug tracking-wide w-48">People with skills are the assets of the nation and the people without skills are the liabilities</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
