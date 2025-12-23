import { cn } from "@/lib/utils";

interface BrandBookNavProps {
  sections: { id: string; label: string }[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

const BrandBookNav = ({ sections, activeSection, onSectionClick }: BrandBookNavProps) => {
  return (
    <nav className="hidden lg:flex fixed left-0 top-[100vh] h-screen w-64 bg-card border-r border-border flex-col justify-center px-8 z-50">
      <div className="mb-8">
        <img 
          src="/avils-logo.gif" 
          alt="AVIL's Bathrooms" 
          className="h-10 opacity-80"
        />
      </div>
      
      <ul className="space-y-1">
        {sections.map((section, index) => (
          <li key={section.id}>
            <button
              onClick={() => onSectionClick(section.id)}
              className={cn(
                "w-full text-left py-2.5 px-4 rounded-lg font-body text-sm transition-all duration-200 flex items-center gap-3",
                activeSection === section.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <span className="text-xs opacity-50 font-mono w-5">
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.label}
            </button>
          </li>
        ))}
      </ul>
      
      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground font-body">
          AVIL's Bathrooms © 2024
        </p>
      </div>
    </nav>
  );
};

export default BrandBookNav;
