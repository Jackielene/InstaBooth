import React from "react";
import { Github } from "lucide-react";

const Footer = ({
  className = "",
  companyName = "InstaBooth",
  year = new Date().getFullYear(),
  githubLink = "https://github.com",
}) => {
  return (
    <footer
      id="footer" // ✅ Added ID for smooth scrolling
      className={`w-full py-8 px-6 md:px-12 bg-black border-t border-gray-700 text-gray-400 ${className}`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Copyright & Custom Message */}
        <div className="text-center md:text-left">
          <p className="font-medium text-gray-300">
            © {year} {companyName}. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Made with ❤️ by Kiel (ReactJS)
          </p>
        </div>

        {/* GitHub Link */}
        <div className="flex items-center gap-6">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
