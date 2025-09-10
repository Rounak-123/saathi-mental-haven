import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Saathi
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted companion for mental health support. We're here to help students navigate their emotional journey with care and understanding.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/chat" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Talk to Saathi
              </Link>
              <Link to="/booking" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Book Counselor Session
              </Link>
              <Link to="/resources" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Mental Health Resources
              </Link>
              <Link to="/peer-support" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Peer Support Forum
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Privacy Policy</p>
              <p className="text-muted-foreground text-sm">Terms of Service</p>
              <p className="text-muted-foreground text-sm">Crisis Resources</p>
              <p className="text-muted-foreground text-sm">FAQ</p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Emergency Support</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">Crisis Helpline: 1800-123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">help@saathi.edu</span>
              </div>
              <div className="bg-accent-light p-3 rounded-lg">
                <p className="text-xs text-accent font-medium">
                  If you're having thoughts of self-harm, please reach out immediately to emergency services or our crisis helpline.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Saathi Mental Health Platform. Made with ❤️ for student wellbeing.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;