
import { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  errorMessage?: string;
  className?: string;
}

const InputField = ({ 
  label, 
  icon, 
  errorMessage, 
  className, 
  ...props 
}: InputFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label 
        htmlFor={props.id || props.name} 
        className="text-sm font-medium text-foreground/80"
      >
        {label}
      </Label>
      
      <div className="relative animated-border">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        
        <Input
          {...props}
          className={cn(
            "bg-background/50 border-input/60 focus:border-primary/30 transition-all",
            icon && "pl-10",
            errorMessage && "border-destructive/50",
            props.className
          )}
        />
      </div>
      
      {errorMessage && (
        <p className="text-xs text-destructive">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
