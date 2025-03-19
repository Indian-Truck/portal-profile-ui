
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { 
  User, Mail, Phone, MapPin, Calendar, 
  BadgeCheck, Globe, Building, Upload, 
  Save, Loader2, FileText
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

import FormSection from "./FormSection";
import InputField from "./InputField";
import DocumentUpload from "./DocumentUpload";
import ProfilePicture from "./ProfilePicture";
import { cn } from "@/lib/utils";
import { ProfileFormValues, profileFormSchema } from "@/lib/form-schema";

interface ProfileFormProps {
  onSave: () => void;
  saving: boolean;
}

const ProfileForm = ({ onSave, saving }: ProfileFormProps) => {
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: "",
      employeeId: "",
      mobileNumber: "",
      whatsappNumber: "",
      email: "",
      gender: "",
      country: "",
      state: "",
      city: "",
      address: "",
      pincode: "",
    },
  });

  const handleSubmit = (data: ProfileFormValues) => {
    console.log("Form submitted:", data);
    console.log("Profile picture:", profilePicture);
    onSave();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Profile Picture Section */}
        <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start mb-4 animate-fade-in">
          <ProfilePicture 
            onChange={setProfilePicture}
            className="sm:sticky sm:top-24"
          />
          
          {/* Personal Information */}
          <FormSection 
            title="Personal Information" 
            icon={<User size={18} />}
            className="w-full"
          >
            <div className="form-grid">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <InputField 
                      label="Full Name" 
                      icon={<User size={16} />} 
                      placeholder="John Doe" 
                      {...field} 
                      errorMessage={form.formState.errors.fullName?.message}
                    />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <InputField 
                      label="Employee ID" 
                      icon={<BadgeCheck size={16} />} 
                      placeholder="EMP123" 
                      {...field} 
                      errorMessage={form.formState.errors.employeeId?.message}
                    />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <InputField 
                      label="Email" 
                      type="email"
                      icon={<Mail size={16} />} 
                      placeholder="john.doe@example.com" 
                      {...field} 
                      errorMessage={form.formState.errors.email?.message}
                    />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <InputField 
                      label="Mobile Number" 
                      icon={<Phone size={16} />} 
                      placeholder="+1 (555) 123-4567" 
                      {...field} 
                      errorMessage={form.formState.errors.mobileNumber?.message}
                    />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="whatsappNumber"
                render={({ field }) => (
                  <FormItem>
                    <InputField 
                      label="WhatsApp Number (optional)" 
                      icon={<Phone size={16} />} 
                      placeholder="+1 (555) 123-4567" 
                      {...field} 
                      errorMessage={form.formState.errors.whatsappNumber?.message}
                    />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground/80">
                      Gender
                    </FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background/50 border-input/60 transition-all">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FormSection>
        </div>
        
        {/* Demographics & Dates */}
        <FormSection 
          title="Demographics & Dates" 
          icon={<Calendar size={18} />}
        >
          <div className="form-grid">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium text-foreground/80">
                    Date of Birth
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal bg-background/50 border-input/60",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <Calendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="joiningDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium text-foreground/80">
                    Joining Date
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal bg-background/50 border-input/60",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <Calendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormSection>
        
        {/* Location Information */}
        <FormSection 
          title="Location Information" 
          icon={<MapPin size={18} />}
        >
          <div className="form-grid">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <InputField 
                    label="Country" 
                    icon={<Globe size={16} />} 
                    placeholder="United States" 
                    {...field} 
                    errorMessage={form.formState.errors.country?.message}
                  />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <InputField 
                    label="State/Province" 
                    icon={<MapPin size={16} />} 
                    placeholder="California" 
                    {...field} 
                    errorMessage={form.formState.errors.state?.message}
                  />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <InputField 
                    label="City" 
                    icon={<Building size={16} />} 
                    placeholder="San Francisco" 
                    {...field} 
                    errorMessage={form.formState.errors.city?.message}
                  />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <InputField 
                    label="Pincode/ZIP" 
                    icon={<MapPin size={16} />} 
                    placeholder="94103" 
                    {...field} 
                    errorMessage={form.formState.errors.pincode?.message}
                  />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-sm font-medium text-foreground/80">
                    Address
                  </FormLabel>
                  <FormControl>
                    <textarea 
                      className="w-full min-h-[80px] rounded-md border border-input/60 bg-background/50 px-3 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:ring-offset-1"
                      placeholder="123 Main St, Apt 4B"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormSection>
        
        {/* Document Management */}
        <FormSection 
          title="Document Management" 
          icon={<FileText size={18} />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <DocumentUpload 
              documentType="Passport" 
              description="Upload both pages" 
            />
            
            <DocumentUpload 
              documentType="PAN Card" 
            />
            
            <DocumentUpload 
              documentType="Aadhaar Card" 
              description="Front and back" 
            />
            
            <DocumentUpload 
              documentType="Canceled Cheque" 
            />
            
            <DocumentUpload 
              documentType="Educational Certificate" 
              description="Highest qualification" 
            />
            
            <DocumentUpload 
              documentType="Other Documents" 
              description="Add any other relevant documents" 
            />
          </div>
        </FormSection>
        
        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            className="gap-2"
          >
            Cancel
          </Button>
          
          <Button 
            type="submit" 
            className="gap-2"
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
