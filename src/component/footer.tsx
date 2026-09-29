import { Flame, ShieldCheck } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <span className="logo">
        <span className="logo-mark"><Flame size={17} aria-hidden="true" /></span>
        LPG Express
      </span>
      <p className="footer-copy">
        <ShieldCheck size={15} aria-hidden="true" /> Safe LPG delivery across Pakistan · © {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default Footer;