"use client";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import { useEffect, useState } from "react";
import { PromptAuth } from "@/components";
import paths from "@/components/paths";

export default function CheckoutUI(props: { summaryUIOnly?: boolean }) {
  const { userManager } = useGeneralFunction();
  const [useDifferentInfo, setUseDifferentInfo] = useState("same");
  const [contactEmail, setContactEmail] = useState("");
  const [contactFirstName, setContactFirstName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  if (!userManager.currentUser) return <></>;
  return (
    <div className="w-full h-full">
      <div className="p-8">
        <Stepper activeStep={1}>
          <Step completed={false}>
            <StepLabel>Alamat pengiriman</StepLabel>
          </Step>
          <Step completed={false}>
            <StepLabel>Pembayaran</StepLabel>
          </Step>
        </Stepper>
      </div>
      <FormControl className={`w-full [&_.MuiFormGroup-root]:my-4`}>
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
        <FormGroup className="flex-row justify-between gap-4">
          <TextField
            type="text"
            name="user_firstname"
            label="Nama depan"
            variant="filled"
            className="flex-1"
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
            className="flex-1"
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
          <TextField
            type="text"
            label="Pesan kepada penjual"
            multiline
            minRows={3}
            maxRows={6}
            variant="filled"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
