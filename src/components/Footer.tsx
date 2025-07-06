import React from 'react';
import { Theme } from '../styles/theme';
import { FooterData } from '../types';

interface FooterProps {
  theme: Theme;
  footerData: FooterData;
}

const Footer: React.FC<FooterProps> = ({ theme, footerData }) => {
  return (
    <footer
      className="py-12 px-6 text-gray-800"
      style={{
        background: 'linear-gradient(90deg, #ffffff 0%, #d1fae5 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img
            src="/images/amal-auto.webp"
            alt="College Logo"
            className="h-16 mb-4"
          />
          <p>{footerData.address}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          {footerData.quickLinks.map((link, index) => (
            <a
              key={index}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="block hover:underline"
            >
              {link}
            </a>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Departments</h3>
          {footerData.departments.map((dept, index) => (
            <p key={index} className="block">
              {dept}
            </p>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p>{footerData.contact}</p>
          {/* Location Map */}
          <div className="mt-4">
            <div className="rounded-lg bg-white/10 border border-white/20 p-0 mb-4 flex flex-col items-start overflow-hidden">
              <span className="font-semibold text-white mb-2 px-4 pt-4">
                Location
              </span>
              <iframe
                src={footerData.location}
                className="w-full h-40 border-0"
                style={{ minHeight: 120 }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Amal College Location"
              ></iframe>
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <a
              href={footerData.socialMedia.facebook}
              className="hover:text-gray-300"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href={footerData.socialMedia.twitter}
              className="hover:text-gray-300"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href={footerData.socialMedia.instagram}
              className="hover:text-gray-300"
            >
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
      <div className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://mhdmubashir.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-green-700"
        >
          Muhammed Mubashir
        </a>
      </div>
    </footer>
  );
};

export default Footer;