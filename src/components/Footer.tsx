
import { Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-8 border-t border-zinc-800 mt-12 bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center">
            <div className="flex flex-col">
              <p className="text-zinc-300 text-sm font-medium">
                AttendX <span className="text-zinc-500">v1.0.0</span>
              </p>
              <p className="text-zinc-400 text-sm mt-1">
                Track your course attendance with precision
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-zinc-400 text-sm">
              © {currentYear} Made with 💙 by
              <span className="font-medium text-primary ml-1">mrdeeeeep</span>
            </p>
            
            <a
              href="https://github.com/mrdeeeeep"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors"
            >
              <Github size={16} />
              <span className="text-sm">github.com/mrdeeeeep</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
