
import { useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileForm from "@/components/ProfileForm";
import { toast } from "sonner";

const Index = () => {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast.success("Profile updated successfully");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="w-full bg-primary/5 border-b border-primary/10 py-8 mb-8">
        <div className="profile-container">
          <ProfileHeader />
        </div>
      </div>
      
      <main className="profile-container">
        <ProfileForm onSave={handleSave} saving={saving} />
      </main>
    </div>
  );
};

export default Index;
