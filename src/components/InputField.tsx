
import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  errorMessage?: string;
  className?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({ 
  label, 
  icon, 
  errorMessage, 
  className, 
  ...props 
}, ref) => {
  return (
    <div className={cn("space-y-2 group", className)}>
      <Label 
        htmlFor={props.id || props.name} 
        className="text-sm font-medium text-foreground/80 group-hover:text-primary/80 transition-colors"
      >
        {label}
      </Label>
      
      <div className="relative animated-border">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary/70 transition-colors">
            {icon}
          </div>
        )}
        
        <Input
          ref={ref}
          {...props}
          className={cn(
            "bg-background/50 border-input/60 focus:border-primary/30 transition-all duration-300 cursor-text rounded-lg",
            "shadow-sm group-hover:shadow-md",
            icon && "pl-10",
            errorMessage && "border-destructive/50",
            props.disabled && "cursor-not-allowed opacity-70",
            className
          )}
        />
      </div>
      
      {errorMessage && (
        <p className="text-xs font-medium text-destructive animate-fade-in">{errorMessage}</p>
      )}
    </div>
  );
});

// Add display name for better debugging
InputField.displayName = "InputField";

export default InputField;
