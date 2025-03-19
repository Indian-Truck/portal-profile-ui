
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
    <div className="relative">
      <Input
        id={id}
        ref={ref}
        {...props}
        className={cn(
          "pt-6 pb-2 border bg-background/50 transition-all duration-200 cursor-text",
          errorMessage && "border-destructive/50",
          props.disabled && "cursor-not-allowed opacity-70",
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
          "absolute left-3 transition-all duration-200 pointer-events-none",
          (isFocused || hasValue) 
            ? "transform -translate-y-3 text-xs text-primary/80" 
            : "transform translate-y-0 top-1/2 -translate-y-1/2 text-muted-foreground"
        )}
      >
        {label}
      </Label>
      
      {errorMessage && (
        <p className="mt-1 text-xs text-destructive">{errorMessage}</p>
      )}
    </div>
  );
});

// Add display name for better debugging
AnimatedInput.displayName = "AnimatedInput";

export default AnimatedInput;
