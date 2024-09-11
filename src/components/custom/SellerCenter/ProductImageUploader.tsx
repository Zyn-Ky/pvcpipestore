"use client";
import { useLogger } from "@/components/hooks/logger";
import { Console } from "console";
import { useMemo, useState } from "react";
import { useDropArea } from "react-use";
function DisplayItem() {
  return <></>;
}
export default function ProductImageUploader() {
  const { Console } = useLogger();
  const [currentDraftFiles, setCurrentFiles] = useState<
    { id: number; binary: File }[]
  >([]);
  const [bond, state] = useDropArea({
    onFiles: (files) => {
      Console("info", "ProductImageUploader Logger : File changed!", files);
      //   setImageFile(file[0] ?? null);
      setCurrentFiles((prev) => [
        ...prev,
        ...files.map((file, i) => ({ id: i, binary: file })),
      ]);
    },
    onText: () => alert("Invalid Type"),
    onUri: () => alert("Invalid Type"),
  });
  const draftFilesBlobUrl = useMemo(
    () =>
      currentDraftFiles.map((file) => ({
        id: file.id,
        url: URL.createObjectURL(file.binary),
      })),
    [currentDraftFiles]
  );
  const isDraftFilesEmpty = currentDraftFiles.length === 0;
  function ClearFile(fileId: number) {
    setCurrentFiles((prev) => {
      const filtered = draftFilesBlobUrl.filter(({ id }) => id === fileId);
      const others = prev.filter(({ id }) => id !== fileId);
      filtered.length > 0 && URL.revokeObjectURL(filtered[0].url);
      return others;
    });
  }
  const Page1 = (
    <div className="text-center">
      {!state.over && <p>Klik / Drag foto</p>}
      {state.over && <p>Lepas disini</p>}
    </div>
  );
  const Page2 = (
    <div className="flex w-full h-full p-8 gap-4">
      <div
        className="flex gap-2"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {draftFilesBlobUrl.map(({ id, url }) => (
          <img
            src={url}
            key={`DRAFT_IMAGE_PRODUCT_${id}`}
            alt=""
            onClick={(e) => {
              e.stopPropagation();
              ClearFile(id);
            }}
            width={150}
          />
        ))}
      </div>
      <button>Add</button>
    </div>
  );
  return (
    <>
      <label
        {...bond}
        className="flex flex-col justify-center items-center w-auto min-h-28 border-[8px] rounded-xl border-dashed border-blue-500 cursor-pointer"
        tabIndex={0}
        htmlFor="fileinput"
        onKeyDown={(e) =>
          e.key === "Enter" &&
          document.querySelector<HTMLInputElement>("input#fileinput")?.click()
        }
      >
        {isDraftFilesEmpty && Page1}
        {!isDraftFilesEmpty && Page2}
        <input
          type="file"
          id="fileinput"
          onChange={(e) => {
            Console(
              "info",
              "ProductImageUploader Logger : File changed!",
              e.currentTarget.files
            );
            const files = Array.from(e.currentTarget.files ?? []);
            setCurrentFiles((prev) => [
              ...prev,
              ...files.map((file, i) => ({ id: i, binary: file })),
            ]);
            e.currentTarget.value = "";
          }}
          multiple
          accept="image/png, image/jpeg"
          className="hidden w-0 h-0"
        />
      </label>
    </>
  );
}
