import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export default function SimpleProductImageUploader({}: {}) {
  const [files, setFiles] = useState<File[]>([]);
  const [checked, setChecked] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const filesBlobURL = useMemo(() => {
    return files.map((file) => URL.createObjectURL(file));
  }, [files]);
  function DeleteFile(id: number[]) {
    const filteredFile = files.filter((val, i) => !id.includes(i));
    setFiles(filteredFile);
    if (!inputRef.current) return;
    const dataTransfer = new DataTransfer();
    filteredFile.forEach((file) => dataTransfer.items.add(file));
    inputRef.current.files = dataTransfer.files;
  }
  useEffect(() => {
    if (!checked) {
      setFiles([]);
      if (!inputRef.current) return;
      const dataTransfer = new DataTransfer();
      inputRef.current.files = dataTransfer.files;
    }
  }, [checked]);
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e, checked) => setChecked(checked)}
          />
        }
        label={
          <Typography variant="body1" fontWeight="bold">
            Unggah foto
          </Typography>
        }
      />
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => {
          const filesList = Array.from(e.currentTarget.files ?? []);
          setFiles(filesList);
        }}
        multiple
        accept="image/*"
        disabled={!checked}
      />
      <div className="my-2 flex gap-4">
        {filesBlobURL.map((src, i) => (
          <button
            className="border border-current border-solid bg-transparent cursor-pointer"
            onClick={() => DeleteFile([i])}
            key={i}
          >
            <img alt={`Img Product ${i}`} src={src} width={100} height={100} />
          </button>
        ))}
      </div>
      <small>
        <b>Semua foto yang ada akan dihapus</b>
      </small>
    </>
  );
}
