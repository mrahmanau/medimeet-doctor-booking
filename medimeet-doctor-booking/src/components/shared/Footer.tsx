//src/components/shared/Footer.tsx
// src/components/shared/Footer.tsx

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Left side: copyright */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MediMeet. All rights reserved.
        </p>

        {/* Right side: links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="/privacy"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="/contact"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
