
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Upload, CheckCircle, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DocumentUploadProps {
  documentType: string;
  description?: string;
  acceptedFormats?: string;
}

const DocumentUpload = ({ 
  documentType, 
  description,
  acceptedFormats = ".pdf,.jpg,.jpeg,.png" 
}: DocumentUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      
      // Simulate upload delay
      setTimeout(() => {
        setFile(e.target.files![0]);
        setUploading(false);
        toast.success(`${documentType} uploaded successfully`);
      }, 1500);
    }
  };
  
  const removeFile = () => {
    setFile(null);
  };
  
  return (
    <div className={cn(
      "document-card transition-all group", 
      file ? "uploaded" : "",
      uploading ? "opacity-70 pointer-events-none" : ""
    )}>
      <input
        type="file"
        id={`upload-${documentType.toLowerCase().replace(/\s+/g, '-')}`}
        className="sr-only"
        accept={acceptedFormats}
        onChange={handleFileChange}
        disabled={uploading}
      />
      
      {!file ? (
        <label 
          htmlFor={`upload-${documentType.toLowerCase().replace(/\s+/g, '-')}`}
          className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
        >
          {uploading ? (
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <Upload size={18} className="text-primary/40" />
              </div>
              <p className="text-sm font-medium text-foreground/70">Uploading...</p>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-2 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <Upload size={18} className="text-foreground/60 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm font-medium text-foreground/80">{documentType}</p>
              {description && <p className="text-xs text-foreground/50 text-center mt-1">{description}</p>}
              <p className="text-xs text-foreground/50 mt-3">Click to upload</p>
            </>
          )}
        </label>
      ) : (
        <div className="w-full flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <File size={18} className="text-primary" />
          </div>
          
          <p className="text-sm font-medium text-foreground/80 flex items-center gap-1">
            {documentType} 
            <CheckCircle size={14} className="text-primary ml-1" />
          </p>
          
          <p className="text-xs text-muted-foreground truncate max-w-full px-4 mt-1">
            {file.name}
          </p>
          
          <Button 
            type="button"
            size="sm" 
            variant="ghost" 
            className="text-xs text-destructive hover:text-destructive/80 hover:bg-destructive/10 mt-3"
            onClick={removeFile}
          >
            <X size={14} className="mr-1" /> Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
