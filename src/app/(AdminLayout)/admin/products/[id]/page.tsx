"use client";

import HTMLEditor from "@/components/custom/SellerCenter/HTMLEditor";
import SimpleProductImageUploader from "@/components/custom/SellerCenter/SimpleProductImageUploader";
import { useProductInfo } from "@/components/hooks/productManager";
import InfiniteCircularProgress from "@/components/InfiniteCircularProgress";
import { StoredProductCardInfo } from "@/libs/config";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  FormGroup,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EditorProvider } from "react-simple-wysiwyg";

export default function AdminProductItemEditor() {
  const { id } = useParams();
  const { loading, exists, value, edit, editState } = useProductInfo(
    Array.isArray(id) ? id[0] : id
  );
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");

  const { register, handleSubmit } = useForm<StoredProductCardInfo>({
    values: { ...value },
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  function UpdateProductInfo(val: StoredProductCardInfo) {
    edit({ ...val, Description: description, Images: [] });
  }
  return loading ? (
    <InfiniteCircularProgress />
  ) : exists ? (
    value && (
      <>
        <EditorProvider>
          <FormControl
            onSubmit={handleSubmit(UpdateProductInfo)}
            component="form"
            fullWidth
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {editState === "finished" && "Selesai!"}
              {editState === "editing" && "Memuat..."}
              {(editState === "idle" || editState === "error") && "Edit Produk"}
            </Typography>
            <TextField
              {...register("Name", {
                required: true,
                disabled: editState === "editing",
              })}
              label="Judul"
              slotProps={{ inputLabel: { sx: { fontWeight: "bold" } } }}
              margin="normal"
            />
            <TextField
              {...register("CatalogID", {
                required: true,
                disabled: editState === "editing",
              })}
              label="Nomor Kategori"
              slotProps={{ inputLabel: { sx: { fontWeight: "bold" } } }}
              margin="normal"
            />
            <FormGroup className="mb-4">
              <SimpleProductImageUploader />
            </FormGroup>
            <FormGroup className="mb-4">
              <HTMLEditor
                defaultValue={value.Description}
                onChange={(val) => setDescription(val)}
              />
            </FormGroup>
            <FormGroup className="flex-row gap-4">
              <TextField
                type="number"
                label="Stok"
                {...register("AvailableStock", {
                  required: true,
                  disabled: editState === "editing",
                })}
                margin="normal"
                slotProps={{ inputLabel: { sx: { fontWeight: "bold" } } }}
              />
              <TextField
                type="number"
                slotProps={{ inputLabel: { sx: { fontWeight: "bold" } } }}
                {...register("Price", {
                  required: true,
                  disabled: editState === "editing",
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Select
                        value="IDR"
                        placeholder="Mata uang"
                        variant="standard"
                        size="small"
                        {...register("SuggestedCurrency", {
                          required: true,
                          disabled: editState === "editing",
                        })}
                      >
                        <MenuItem value="IDR">IDR</MenuItem>
                      </Select>
                    </InputAdornment>
                  ),
                }}
                label="Harga"
                margin="normal"
              />
            </FormGroup>
            <LoadingButton
              type="submit"
              variant="contained"
              sx={{ m: 3 }}
              loading={editState === "editing"}
            >
              Edit
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
