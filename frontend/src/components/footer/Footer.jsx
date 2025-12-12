import { Link } from "react-router-dom";
import { TYPOGRAPHY } from "../../constants/designSystem";

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white py-1 px-2">
      <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-x-3 gap-y-0 text-xs md:text-sm text-gray-600">
        <div className="flex items-center">
          <Link to="/about" className={`${TYPOGRAPHY.link} font-medium`}>
            About Us
          </Link>
        </div>
        <div className="order-last md:order-none w-full md:w-auto text-center mt-0.5 md:mt-0 text-gray-500">
          &copy; {new Date().getFullYear()} StudySphere
        </div>
        <div className="flex gap-3">
          <Link
            to="/privacy"
            className={`${TYPOGRAPHY.link} font-medium`}
          >
            Privacy
          </Link>
          <Link to="/terms" className={`${TYPOGRAPHY.link} font-medium`}>
            Terms
          </Link>
          <Link
            to="/contact"
            className={`${TYPOGRAPHY.link} font-medium`}
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
