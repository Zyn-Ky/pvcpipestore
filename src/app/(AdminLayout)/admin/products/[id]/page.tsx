"use client";

import ProductImageUploader from "@/components/custom/SellerCenter/ProductImageUploader";
import { useProductInfo } from "@/components/hooks/admin";
import InfiniteCircularProgress from "@/components/InfiniteCircularProgress";
import { LoadingButton } from "@mui/lab";
import { FormControl, FormGroup, Typography } from "@mui/material";
import { useParams } from "next/navigation";
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
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

export default function AdminProductItemEditor() {
  const { id } = useParams();
  const { loading, exists, value } = useProductInfo(
    Array.isArray(id) ? id[0] : id
  );
  return loading ? (
    <InfiniteCircularProgress />
  ) : exists ? (
    value && (
      <>
        <EditorProvider>
          <FormControl method="POST" component="form" fullWidth>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Edit Produk
            </Typography>
            <FormGroup className="mb-1">
              <ProductImageUploader />
            </FormGroup>
            <FormGroup className="mb-1">
              <Typography>Deskripsi</Typography>
              <Editor
                style={{
                  minHeight: "250px",
                  maxWidth: "100%",
                  overflow: "auto",
                  maxHeight: "50vh",
                }}
                containerProps={{ style: { width: "100%" } }}
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
            </FormGroup>

            <LoadingButton type="submit" variant="contained" sx={{ m: 3 }}>
              Buat
            </LoadingButton>
          </FormControl>
        </EditorProvider>
        <p>Product Editor</p>
        <p>{id}</p>
      </>
    )
  ) : (
    <>Product Not Found</>
  );
}
