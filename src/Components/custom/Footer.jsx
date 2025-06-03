import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-6 mt-10">
      <div className="max-w-screen-xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
        <p className="text-sm">
          © {new Date().getFullYear()} ResumeAI. All rights reserved to Jagrat Agrawal.
        </p>
        <div className="mt-2 space-x-4">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Service</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
