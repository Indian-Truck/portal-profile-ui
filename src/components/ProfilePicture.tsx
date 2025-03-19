
import { useState } from "react";
import { Camera, Upload, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProfilePictureProps {
  initialImage?: string;
  onChange?: (file: File | null) => void;
  className?: string;
}

const ProfilePicture = ({ initialImage, onChange, className }: ProfilePictureProps) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // File size validation (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setIsUploading(true);
      
      // Create preview URL
      const imageUrl = URL.createObjectURL(file);
      
      // Simulate upload delay
      setTimeout(() => {
        setImage(imageUrl);
        setIsUploading(false);
        onChange?.(file);
        toast.success("Profile picture updated successfully");
      }, 1000);
    }
  };
  
  const removeImage = () => {
    setImage(null);
    onChange?.(null);
    toast.success("Profile picture removed");
  };
  
  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      <div className="relative group">
        <Avatar className={cn(
          "w-32 h-32 border-4 border-background shadow-xl transition-all duration-300",
          "hover:border-primary/20 group-hover:shadow-primary/20",
          isUploading && "opacity-70"
        )}>
          <AvatarImage src={image || undefined} className="object-cover" />
          <AvatarFallback className="bg-primary/5 text-primary">
            <User size={40} strokeWidth={1.5} />
          </AvatarFallback>
        </Avatar>
        
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm rounded-full">
            <div className="animate-pulse">
              <Camera size={28} className="text-primary" />
            </div>
          </div>
        )}
        
        <input
          type="file"
          id="profile-picture-input"
          className="sr-only"
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleImageChange}
          disabled={isUploading}
        />
        
        <div className={cn(
          "absolute -bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 transition-all",
          "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
        )}>
          <label
            htmlFor="profile-picture-input"
            className={cn(
              "bg-primary text-white rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors",
              "hover-scale shadow-md"
            )}
          >
            <Camera size={16} />
          </label>
          
          {image && (
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="rounded-full w-8 h-8 hover-scale"
              onClick={removeImage}
            >
              <X size={14} />
            </Button>
          )}
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-base font-medium text-foreground/90">Profile Picture</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Click on the avatar to update your profile picture
        </p>
      </div>
    </div>
  );
};

export default ProfilePicture;
