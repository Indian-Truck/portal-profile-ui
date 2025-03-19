
import { z } from "zod";

export const profileFormSchema = z.object({
  // Personal Information
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  employeeId: z.string().min(1, "Employee ID is required"),
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
  whatsappNumber: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  
  // Demographics
  gender: z.enum(["male", "female", "other", ""]),
  dateOfBirth: z.date().optional(),
  
  // Location
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  pincode: z.string().min(1, "Pincode is required"),
  
  // Employment
  joiningDate: z.date().optional(),
  
  // Preferences (added)
  language: z.enum(["en-US", "hi-IN", "es-ES", "fr-FR"]).optional().default("en-US"),
  theme: z.enum(["light", "dark", "system"]).optional().default("system"),
  notifications: z.object({
    email: z.boolean().optional().default(true),
    sms: z.boolean().optional().default(false),
    browser: z.boolean().optional().default(true),
  }).optional().default({
    email: true,
    sms: false,
    browser: true,
  }),
  privacy: z.object({
    profileVisibility: z.enum(["everyone", "team", "private"]).optional().default("team"),
    dataSharing: z.boolean().optional().default(true),
  }).optional().default({
    profileVisibility: "team",
    dataSharing: true,
  }),
  security: z.object({
    twoFactorEnabled: z.boolean().optional().default(false),
    sessionTimeout: z.enum(["30m", "1h", "4h", "never"]).optional().default("4h"),
  }).optional().default({
    twoFactorEnabled: false,
    sessionTimeout: "4h",
  }),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
