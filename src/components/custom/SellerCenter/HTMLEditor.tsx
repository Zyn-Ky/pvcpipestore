import { Typography } from "@mui/material";
import { useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

export default function HTMLEditor({
  onChange,
  disabled,
  defaultValue,
}: {
  onChange?: (val: string) => void;
  disabled?: boolean;
  defaultValue?: string;
}) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  return (
    <>
      <Typography variant="body1" fontWeight="bold" gutterBottom>
        Deskripsi
      </Typography>
      <Editor
        style={{
          minHeight: "250px",
          maxWidth: "100%",
          overflow: "auto",
          maxHeight: "50vh",
        }}
        onChange={(e) => {
          setInternalValue(e.target.value);
          onChange && onChange(e.target.value);
        }}
        disabled={disabled ?? false}
        containerProps={{ style: { width: "100%" } }}
        defaultValue={defaultValue ?? ""}
        value={internalValue}
      >
        <Toolbar>
          <BtnUndo />
          <BtnRedo />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          <BtnClearFormatting />
          <Separator />
          <BtnStyles />
        </Toolbar>
      </Editor>
    </>
  );
}
