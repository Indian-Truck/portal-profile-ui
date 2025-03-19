
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bell, Eye, Globe, Lock, Moon, Shield, Sun, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const [theme, setTheme] = useState("system");
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-xl">Account Settings</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="w-full">
          <div className="flex">
            <div className="w-52 border-r h-[70vh] py-4">
              <TabsList className="flex flex-col h-auto p-0 bg-transparent space-y-1 w-full">
                <TabsTrigger 
                  value="general" 
                  className="w-full justify-start px-4 py-2 h-10 gap-3 data-[state=active]:text-primary"
                >
                  <User size={16} />
                  <span>General</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="privacy" 
                  className="w-full justify-start px-4 py-2 h-10 gap-3 data-[state=active]:text-primary"
                >
                  <Lock size={16} />
                  <span>Privacy</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="appearance" 
                  className="w-full justify-start px-4 py-2 h-10 gap-3 data-[state=active]:text-primary"
                >
                  <Eye size={16} />
                  <span>Appearance</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="w-full justify-start px-4 py-2 h-10 gap-3 data-[state=active]:text-primary"
                >
                  <Bell size={16} />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="w-full justify-start px-4 py-2 h-10 gap-3 data-[state=active]:text-primary"
                >
                  <Shield size={16} />
                  <span>Security</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1 px-6 py-6 overflow-y-auto max-h-[70vh]">
              <TabsContent value="general" className="mt-0 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Account Information</h3>
                  <p className="text-sm text-muted-foreground">Manage your account preferences and settings</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Language</Label>
                      <p className="text-sm text-muted-foreground">Select your preferred language</p>
                    </div>
                    <select className="p-2 border rounded-md">
                      <option>English (US)</option>
                      <option>Hindi</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Time Zone</Label>
                      <p className="text-sm text-muted-foreground">Set your local time zone</p>
                    </div>
                    <select className="p-2 border rounded-md">
                      <option>IST (UTC+5:30)</option>
                      <option>PST (UTC-8:00)</option>
                      <option>EST (UTC-5:00)</option>
                      <option>GMT (UTC+0:00)</option>
                    </select>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="privacy" className="mt-0 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Privacy Settings</h3>
                  <p className="text-sm text-muted-foreground">Control your privacy preferences</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Profile Visibility</Label>
                      <p className="text-sm text-muted-foreground">Control who can see your profile information</p>
                    </div>
                    <select className="p-2 border rounded-md">
                      <option>Everyone</option>
                      <option>Only Team Members</option>
                      <option>Only Me</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Data Sharing</Label>
                      <p className="text-sm text-muted-foreground">Allow the system to use your data for improvements</p>
                    </div>
                    <Switch id="data-sharing" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="appearance" className="mt-0 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Appearance Settings</h3>
                  <p className="text-sm text-muted-foreground">Customize how the application looks</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-base mb-3 block">Theme</Label>
                    <RadioGroup 
                      defaultValue={theme} 
                      onValueChange={setTheme}
                      className="grid grid-cols-3 gap-4"
                    >
                      <div className="flex flex-col items-center gap-2 border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors">
                        <Sun className="h-6 w-6" />
                        <RadioGroupItem value="light" id="light" className="sr-only" />
                        <Label htmlFor="light" className="cursor-pointer">Light</Label>
                      </div>
                      <div className="flex flex-col items-center gap-2 border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors">
                        <Moon className="h-6 w-6" />
                        <RadioGroupItem value="dark" id="dark" className="sr-only" />
                        <Label htmlFor="dark" className="cursor-pointer">Dark</Label>
                      </div>
                      <div className="flex flex-col items-center gap-2 border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors">
                        <Globe className="h-6 w-6" />
                        <RadioGroupItem value="system" id="system" className="sr-only" />
                        <Label htmlFor="system" className="cursor-pointer">System</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Animations</Label>
                      <p className="text-sm text-muted-foreground">Enable animations throughout the interface</p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Notification Preferences</h3>
                  <p className="text-sm text-muted-foreground">Manage how you receive notifications</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                    </div>
                    <Switch id="sms-notifications" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Browser Notifications</Label>
                      <p className="text-sm text-muted-foreground">Show notifications in browser</p>
                    </div>
                    <Switch id="browser-notifications" defaultChecked />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="mt-0 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Security Settings</h3>
                  <p className="text-sm text-muted-foreground">Manage your account security</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Session Timeout</Label>
                      <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                    </div>
                    <select className="p-2 border rounded-md">
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>4 hours</option>
                      <option>Never</option>
                    </select>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
