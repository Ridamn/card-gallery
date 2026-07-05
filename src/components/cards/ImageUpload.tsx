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

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("card-images")
      .upload(fileName, file);

    if (error) {
      toast.error(error.message);
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

  return (
    <div className="space-y-3">
      {value && (
        <img
          src={value}
          alt="Preview"
          className="w-full h-52 object-cover rounded-lg border"
        />
      )}

      <label
        className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition"
      >
        <span className="text-3xl mb-1"><FaFileImage/></span>

        <p className="font-medium">
          Click to upload image
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

      {uploading && (
        <p className="text-blue-600">
          Uploading...
        </p>
      )}
    </div>
  );
}

export default ImageUpload;
