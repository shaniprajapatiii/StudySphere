import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl py-5 px-4 shadow-[0_-10px_30px_rgba(2,6,23,0.35)]">
      <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-x-4 gap-y-3 text-xs md:text-sm text-slate-400">
        <div className="flex items-center gap-2 text-slate-500">
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          <Link to="/about" className="ds-link font-medium">
            About Us
          </Link>
        </div>
        <div className="order-last md:order-none w-full md:w-auto text-center mt-0.5 md:mt-0 text-slate-500 tracking-wide">
          &copy; {new Date().getFullYear()} StudySphere
        </div>
        <div className="flex gap-3 items-center">
          <Link
            to="/privacy"
            className="ds-link font-medium"
          >
            Privacy
          </Link>
          <Link to="/terms" className="ds-link font-medium">
            Terms
          </Link>
          <Link
            to="/contact"
            className="ds-link font-medium"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
