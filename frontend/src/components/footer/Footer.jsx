import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="backdrop-blur-xl py-5 px-4 theme-border border-t"
      style={{
        backgroundColor: "var(--bg-overlay)",
        boxShadow: "0 -4px 24px var(--shadow-color, rgba(0,0,0,0.15))",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-x-4 gap-y-3 text-xs md:text-sm theme-text-muted">
        <div className="flex items-center gap-2 theme-text-subtle">
          <span className="h-2 w-2 rounded-full bg-cyan-400/80" />
          <Link to="/about" className="ds-link font-medium">
            About Us
          </Link>
        </div>
        <div className="order-last md:order-none w-full md:w-auto text-center mt-0.5 md:mt-0 theme-text-subtle tracking-wide">
          &copy; {new Date().getFullYear()} StudySphere
        </div>
        <div className="flex gap-3 items-center">
          <Link to="/privacy" className="ds-link font-medium">
            Privacy
          </Link>
          <Link to="/terms" className="ds-link font-medium">
            Terms
          </Link>
          <Link to="/contact" className="ds-link font-medium">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
