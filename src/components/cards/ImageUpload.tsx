import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { toast } from "react-hot-toast";
import { FaFileImage } from "react-icons/fa";

type Props = {
  value: string;
  onChange: (url: string) => void;
};

function ImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  async function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be 5 MB or smaller.");
      return;
    }

    setUploading(true);
    setSelectedFile(file);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("card-images")
      .upload(fileName, file);

    if (error) {
      toast.error(error.message);
      setSelectedFile(null);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("card-images")
      .getPublicUrl(fileName);

    onChange(data.publicUrl);

    toast.success("Image uploaded!");

    setUploading(false);
  }

  function removeImage() {
    setSelectedFile(null);
    onChange("");
  }

  return (
    <div className="space-y-3">
      <label className="block text-lg font-semibold text-gray-900">Image</label>

      <div className="rounded-xl border-2 border-dashed border-gray-300 p-4">
        {!value ? (
          <label className="flex cursor-pointer flex-col items-center justify-center py-8">
            <span className="mb-3 text-5xl">< FaFileImage/></span>

            <p className="text-lg font-semibold">
              {uploading ? "Uploading..." : "Click to upload image"}
            </p>

            <p className="text-sm text-gray-500">
              JPG, PNG, WEBP (Max 5 MB)
            </p>

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageChange}
              className="hidden"
              disabled={uploading}
            />
          </label>
        ) : (
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={value}
                alt="Preview"
                className="h-28 w-44 rounded-lg border object-cover"
              />

              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-white shadow transition hover:bg-red-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex-1">
              <p className="text-lg font-semibold">
                {uploading ? "Uploading image..." : "Image uploaded"}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {selectedFile?.name}
              </p>

              <label className="mt-3 inline-block cursor-pointer text-blue-600 hover:underline">
                Change image

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
