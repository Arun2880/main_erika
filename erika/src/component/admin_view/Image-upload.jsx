import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import axios from "axios";

const ProductImage = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) => {
  const inputRef = useRef(null);

  // Ensure imageFiles is an array before trying to access 'length'
  const safeImageFile = Array.isArray(imageFile) ? imageFile : [];

  // Handle file selection
  function handleChangeImage(event) {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length) {
      setImageFile((prevFiles) => Array.isArray(prevFiles) ? [...prevFiles, ...selectedFiles] : [...selectedFiles]);
    }
  }

  // Drag & Drop Handlers
  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files || []);
    if (droppedFiles.length) {
      setImageFile((prevFiles) => Array.isArray(prevFiles) ? [...prevFiles, ...droppedFiles] : [...droppedFiles]);
    }
  }
  // Remove an image from the list
  function handleRemoveImage(index) {
    setImageFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setUploadedUrl((prevUrls) => prevUrls.filter((_, i) => i !== index));
  }

  // Upload Images to Backend
  async function uploadImagesToCloudinary() {
    if (!safeImageFile || safeImageFile.length === 0) return;

    setImageLoadingState(true);
    const uploadedUrls = [];

    for (const file of safeImageFile) {
      const formData = new FormData();
      formData.append("images", file); // Ensure this matches backend

      try {
        const response = await axios.post(
          "https://erikahennaherbal.com/api/admin/products/upload-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response?.data?.success) {
          uploadedUrls.push(response.data.results[0].url);

         
           
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
   

    setUploadedUrl( [...uploadedUrls]);
    setImageFile([]); 
    
    
    setImageLoadingState(false);
  }

  // Auto-upload images when added
  useEffect(() => {
    if (safeImageFile && safeImageFile.length > 0) uploadImagesToCloudinary();
  }, [safeImageFile]);


  
  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : " max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Images</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${isEditMode ? "opacity-60" : ""} border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          ref={inputRef}
          onChange={handleChangeImage}
          multiple
          className="hidden"
          disabled={isEditMode}
        />
        {!safeImageFile.length ? (
          <Label
            htmlFor="image-upload"
            className={`${isEditMode ? " cursor-not-allowed" : ""} flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span> Drag & drop or click to upload images</span>
          </Label>
        ) : (
          <div className="space-y-2">
            {safeImageFile.map((file, index) => (
              <div key={index} className="flex items-center justify-between border p-2 rounded-lg">
                <div className="flex items-center">
                  <FileIcon className="w-8 text-primary mr-2 h-8" />
                  <p className="text-sm font-medium">{file.name}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => handleRemoveImage(index)}
                >
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only"> Remove File</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
