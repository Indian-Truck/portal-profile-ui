
import { InputHTMLAttributes, useState, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(({ 
  label, 
  errorMessage, 
  className, 
  id,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = props.value !== undefined && props.value !== "";

  return (
    <div className="relative group">
      <Input
        id={id}
        ref={ref}
        {...props}
        className={cn(
          "pt-6 pb-2 border bg-background/50 transition-all duration-300 cursor-text rounded-lg",
          "shadow-sm group-hover:shadow-md",
          errorMessage && "border-destructive/50",
          props.disabled && "cursor-not-allowed opacity-70",
          isFocused && "border-primary ring-1 ring-primary/30",
          className
        )}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
      />
      
      <Label
        htmlFor={id}
        className={cn(
          "absolute left-3 transition-all duration-300 pointer-events-none",
          (isFocused || hasValue) 
            ? "transform -translate-y-3 text-xs text-primary/80 font-medium" 
            : "transform translate-y-0 top-1/2 -translate-y-1/2 text-muted-foreground"
        )}
      >
        {label}
      </Label>
      
      {errorMessage && (
        <p className="mt-1.5 text-xs font-medium text-destructive animate-fade-in">{errorMessage}</p>
      )}

      <div className={cn(
        "absolute bottom-0 left-0 h-0.5 bg-primary/60 w-0 transition-all duration-300",
        isFocused ? "w-full" : "w-0",
        "group-hover:w-1/4"
      )} />
    </div>
  );
});

// Add display name for better debugging
AnimatedInput.displayName = "AnimatedInput";

export default AnimatedInput;
