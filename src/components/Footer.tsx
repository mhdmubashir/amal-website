import React from 'react';
import { Theme } from '../styles/theme';
import { FooterData } from '../types';

interface FooterProps {
  theme: Theme;
  footerData: FooterData;
}

const Footer: React.FC<FooterProps> = ({ theme, footerData }) => {
  return (
    <footer className={`${theme.footer} py-12 px-6 text-white`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img src={footerData.logo} alt="College Logo" className="h-16 mb-4" />
          <p>{footerData.address}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          {footerData.quickLinks.map((link, index) => (
            <a key={index} href={`#${link.toLowerCase().replace(' ', '-')}`} className="block hover:underline">
              {link}
            </a>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Departments</h3>
          {footerData.departments.map((dept, index) => (
            <p key={index} className="block">{dept}</p>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p>{footerData.contact}</p>
          <p><a href={footerData.location} className="hover:underline">View Location</a></p>
          <div className="flex space-x-4 mt-4">
            <a href={footerData.socialMedia.facebook} className="hover:text-gray-300">
              <i className="fab fa-facebook"></i>
            </a>
            <a href={footerData.socialMedia.twitter} className="hover:text-gray-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href={footerData.socialMedia.instagram} className="hover:text-gray-300">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <iframe
            src={footerData.youtubeVideo}
            className="w-full h-32 mt-4 rounded"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;