
import { ArrowLeft, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SettingsDialog from "./SettingsDialog";

const ProfileHeader = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full h-9 w-9 text-foreground/70 hover:text-foreground"
        >
          <ArrowLeft size={18} />
        </Button>
        
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Profile Management</h1>
          <p className="text-muted-foreground text-sm">Update your personal information and documents</p>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2 text-sm rounded-full px-4 bg-background/80 backdrop-blur-xs"
        onClick={() => setShowSettings(true)}
      >
        <Settings size={14} />
        <span>Settings</span>
      </Button>

      <SettingsDialog open={showSettings} onOpenChange={setShowSettings} />
    </div>
  );
};

export default ProfileHeader;
