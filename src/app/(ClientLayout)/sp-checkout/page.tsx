"use client";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import CSS from "@/scss/CheckoutPage.module.scss";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import { useEffect, useState } from "react";
import { PromptAuth } from "@/components";
import paths from "@/components/paths";

export default function CheckoutPage() {
  const { userManager } = useGeneralFunction();
  const [useDifferentInfo, setUseDifferentInfo] = useState("same");
  const [contactEmail, setContactEmail] = useState("");
  const [contactFirstName, setContactFirstName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  if (!userManager.currentUser)
    return (
      <PromptAuth
        message="Masuk untuk checkout barang anda"
        redirectPath={paths.CHECKOUT_PAGE}
      />
    );

  return (
    <div className={CSS.CheckoutContainer}>
      <FormControl
        className={CSS.Form}
        sx={{
          ".MuiFormGroup-root": {
            my: 1,
          },
        }}
      >
        <h1>Checkout</h1>
        <FormGroup>
          <FormLabel id="demo-radio-buttons-group-label">
            Pilih informasi pengiriman
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            onChange={(e) => {
              setUseDifferentInfo(e.currentTarget.value);
            }}
            value={useDifferentInfo}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value={"same"}
              control={<Radio />}
              label="Pakai informasi default"
            />
            <FormControlLabel
              value={"different"}
              control={<Radio />}
              label="Pakai informasi lainnya"
            />
          </RadioGroup>
        </FormGroup>
        <FormGroup>
          <TextField
            type="text"
            name="user_firstname"
            label="Nama depan"
            variant="filled"
            value={
              useDifferentInfo === "same"
                ? userManager.currentUser.displayName &&
                  userManager.currentUser.displayName.split(" ")[0]
                : contactFirstName
            }
            InputProps={{ readOnly: useDifferentInfo === "same" }}
            onChange={(e) => {
              setContactFirstName(e.currentTarget.value);
            }}
          />
          <TextField
            type="text"
            name="user_lastname"
            value={
              useDifferentInfo === "same"
                ? userManager.currentUser.displayName &&
                  userManager.currentUser.displayName.split(" ")[1]
                : contactLastName
            }
            label="Nama belakang"
            variant="filled"
            InputProps={{ readOnly: useDifferentInfo === "same" }}
            onChange={(e) => {
              setContactLastName(e.currentTarget.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            type="email"
            name="user_email"
            label="Email"
            variant="filled"
            value={
              useDifferentInfo === "same"
                ? userManager.currentUser.email && userManager.currentUser.email
                : contactEmail
            }
            InputProps={{ readOnly: useDifferentInfo === "same" }}
            onChange={(e) => {
              setContactEmail(e.currentTarget.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            type="text"
            label="Alamat"
            variant="filled"
            value={
              useDifferentInfo === "same"
                ? userManager.currentUser.email && userManager.currentUser.email
                : contactEmail
            }
            InputProps={{ readOnly: useDifferentInfo === "same" }}
            onChange={(e) => {
              setContactEmail(e.currentTarget.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <TextField type="time" label="placeholder" variant="filled" />
        </FormGroup>
      </FormControl>
    </div>
  );
}
