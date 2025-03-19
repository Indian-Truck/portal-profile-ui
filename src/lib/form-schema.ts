
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
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
