"use client";
import useSavedFormState from "@/components/custom/SellerCenter/useSavedFormState";
import {
  FormControl,
  FormGroup,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function ClientForm() {
  useSavedFormState();
  return (
    <>
      <FormControl onChange={(...e) => console.log(e)}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Tambah produk
        </Typography>
        <FormGroup sx={{ mb: 1 }}>
          <TextField id="filled-basic" label="Judul" variant="filled" />
        </FormGroup>
        <FormGroup>
          <Typography>Kategori</Typography>
          <Select value={224} label="Kategori">
            <MenuItem value={224}>Ten</MenuItem>
            <MenuItem value={1}>Twenty</MenuItem>
            <MenuItem value={22}>Thirty</MenuItem>
          </Select>
        </FormGroup>
      </FormControl>
    </>
  );
}
