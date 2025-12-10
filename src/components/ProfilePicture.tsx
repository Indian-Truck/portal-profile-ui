import { useState } from "react";
import { Camera, User, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProfilePictureProps {
  initialImage?: string;
  onChange?: (file: File | null, avatarUrl?: string) => void;
  className?: string;
}

const PRESET_AVATARS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&backgroundColor=c0aede",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna&backgroundColor=d1d4f9",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Max&backgroundColor=ffd5dc",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie&backgroundColor=ffdfbf",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack&backgroundColor=c1f4c5",
  "https://api.dicebear.com/7.x/lorelei/svg?seed=Felix&backgroundColor=b6e3f4",
  "https://api.dicebear.com/7.x/lorelei/svg?seed=Aneka&backgroundColor=c0aede",
];

const ProfilePicture = ({ initialImage, onChange, className }: ProfilePictureProps) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setIsUploading(true);
      const imageUrl = URL.createObjectURL(file);
      
      setTimeout(() => {
        setImage(imageUrl);
        setSelectedAvatar(null);
        setIsUploading(false);
        onChange?.(file);
        toast.success("Profile picture updated");
      }, 800);
    }
  };
  
  const selectPresetAvatar = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
    setImage(avatarUrl);
    onChange?.(null, avatarUrl);
    toast.success("Avatar selected");
  };
  
  const removeImage = () => {
    setImage(null);
    setSelectedAvatar(null);
    onChange?.(null);
    toast.success("Profile picture removed");
  };
  
  return (
    <div className={cn("flex flex-col items-center space-y-6", className)}>
      {/* Main Avatar */}
      <div className="relative group">
        <Avatar className={cn(
          "w-28 h-28 border-4 border-primary/20 shadow-lg transition-all duration-300",
          "hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10",
          isUploading && "opacity-70 animate-pulse"
        )}>
          <AvatarImage src={image || undefined} className="object-cover" />
          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
            <User size={36} strokeWidth={1.5} />
          </AvatarFallback>
        </Avatar>
        
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm rounded-full">
            <Camera size={24} className="text-primary animate-bounce" />
          </div>
        )}
        
        <input
          type="file"
          id="profile-picture-input"
          className="sr-only"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleImageChange}
          disabled={isUploading}
        />
        
        <div className={cn(
          "absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2 transition-all duration-200",
          "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
        )}>
          <label
            htmlFor="profile-picture-input"
            className={cn(
              "bg-primary text-primary-foreground rounded-full p-2 cursor-pointer",
              "hover:bg-primary/90 transition-all shadow-md hover:scale-110"
            )}
          >
            <Camera size={14} />
          </label>
          
          {image && (
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="rounded-full w-7 h-7 hover:scale-110 transition-transform"
              onClick={removeImage}
            >
              <X size={12} />
            </Button>
          )}
        </div>
      </div>
      
      {/* Avatar Selection */}
      <div className="w-full space-y-3">
        <p className="text-sm font-medium text-center text-muted-foreground">
          Or choose an avatar
        </p>
        <div className="grid grid-cols-4 gap-3">
          {PRESET_AVATARS.map((avatar, index) => (
            <button
              key={index}
              type="button"
              onClick={() => selectPresetAvatar(avatar)}
              className={cn(
                "relative rounded-full overflow-hidden transition-all duration-200",
                "hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
                selectedAvatar === avatar && "ring-2 ring-primary scale-105"
              )}
            >
              <Avatar className="w-12 h-12">
                <AvatarImage src={avatar} className="object-cover" />
                <AvatarFallback className="bg-muted">
                  <User size={16} />
                </AvatarFallback>
              </Avatar>
              {selectedAvatar === avatar && (
                <div className="absolute inset-0 bg-primary/30 flex items-center justify-center rounded-full">
                  <Check size={16} className="text-primary-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Upload hint */}
      <p className="text-xs text-muted-foreground text-center">
        Upload your own or select from presets above
      </p>
    </div>
  );
};

export default ProfilePicture;
