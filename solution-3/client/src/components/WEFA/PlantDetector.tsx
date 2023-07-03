import React, { useState } from "react";
import imageCompression from "browser-image-compression";

import { RC as PlantIcon } from "../../assets/icons/plant.svg";
import { useApp } from "../../hooks/app/useApp";

import { PlantInfo } from "./PlantInfo";
import { PlantError } from "./PlantError";

interface PlantDetectorProps {
  onPlantDetection: (image: string | ArrayBuffer) => void;
  detecting: boolean;
  detected?: boolean;
  error: string | null;
  plantDetails?: PlantDetails | null;
}

export const PlantDetector: React.FC<PlantDetectorProps> = ({
  onPlantDetection,
  detecting,
  detected,
  error,
  plantDetails,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const { isDesktop } = useApp();

  async function handleImage(file: File | null) {
    if (!file) {
      return;
    }

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    const url = URL.createObjectURL(compressedFile);

    if (url) {
      setPreview(url);

      const reader = new FileReader();
      reader.onloadend = () => {
        const image = reader.result;
        if (!image) {
          console.log("No image");
          return;
        }

        onPlantDetection(image);
      };
      reader.readAsDataURL(file);
    }
  }

  // function handleRemove() {
  //   setPreview(null);
  // }

  function handleDragOver(e: React.DragEvent<HTMLLabelElement>) {
    e.stopPropagation();
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.stopPropagation();
    e.preventDefault();

    const files = e.dataTransfer.files;
    if (files.length) {
      handleImage(files[0]);
    }
  }

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      handleImage(file);
    }
  }

  return (
    <label
      className={`relative grid w-full aspect-square cursor-pointer appearance-none place-items-center rounded-lg border-2 border-dashed border-primary transition-all focus:outline-none ${
        isDesktop ? "hover:border-yellow-600 hover:text-blue-500" : ""
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        className="hidden"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleUpload}
        disabled={detecting}
      />
      {preview ? (
        <>
          <img
            src={preview}
            alt="Selected Plant Photo"
            className="w-full rounded-lg object-cover"
          />
          {!detected && plantDetails && !error && (
            <PlantInfo {...plantDetails} />
          )}
          {error && <PlantError />}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-1">
          <PlantIcon className="scale-125 fill-secondary" />
          <p
            className={`text-center text-2xl tracking-wide text-secondary ${
              isDesktop ? "hover:text-blue-500" : ""
            }`}
          >
            {isDesktop ? "Drop or Click to Add" : "Tap to Add"} Plant Image
          </p>
        </div>
      )}
    </label>
  );
};
