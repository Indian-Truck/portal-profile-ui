
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

const FormSection = ({ title, icon, children, className }: FormSectionProps) => {
  return (
    <div className={cn("mb-8 animate-fade-in", className)}>
      <h2 className="section-heading">
        <span className="text-primary">{icon}</span>
        {title}
      </h2>
      
      <div className="glass-card rounded-xl p-6">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
