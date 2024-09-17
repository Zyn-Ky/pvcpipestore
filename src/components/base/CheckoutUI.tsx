"use client";
import {
  Button,
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
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import { useEffect, useRef, useState } from "react";
import { PromptAuth } from "@/components";
import paths from "@/components/paths";
import { AnimatePresence, motion } from "framer-motion";
import { useLogger } from "../hooks/logger";

export default function CheckoutUI({
  productID,
  summaryUIOnly,
}: {
  productID: string;
  summaryUIOnly?: boolean;
}) {
  const { userManager } = useGeneralFunction();
  const { Console } = useLogger();
  const [useDifferentInfo, setUseDifferentInfo] = useState("same");
  const [contactEmail, setContactEmail] = useState("");
  const [contactFirstName, setContactFirstName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [currentCheckoutPage, setCurrentCheckoutPage] = useState(1);
  const [currentPageHeight, setCurrentPageHeight] = useState(0);
  const [pageHeightAnimating, setPageHeightAnimating] = useState(false);
  const pageElements = useRef<{ id: number; element: HTMLDivElement | null }[]>(
    []
  );
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    const selectedPage = pageElements.current.filter(
      ({ id }) => id === currentCheckoutPage
    );
    if (selectedPage.length > 0 && selectedPage[0].element) {
      const clientBoundingRect =
        selectedPage[0].element.getBoundingClientRect();
      Console(
        "log",
        currentCheckoutPage,
        selectedPage[0].element,
        clientBoundingRect
      );
      setCurrentPageHeight(clientBoundingRect.height);
    }
  }, [currentCheckoutPage, pageElements]);
  if (!userManager.currentUser) return <></>;
  const Page1 = (
    <>
      <Typography variant="h4" component="h1" fontWeight="bold">
        Pengiriman
      </Typography>
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
    </>
  );
  const Page2 = (
    <>
      <Typography variant="h4" component="h1" fontWeight="bold">
        Metode Pembayaran
      </Typography>
      <p>Tes</p>
    </>
  );
  const Page3 = (
    <>
      <h1>Test</h1>
    </>
  );
  return (
    <div className="w-full h-full">
      <div className="p-0 muiSm:p-8 mx-auto">
        <Stepper
          orientation={isSmallScreen ? "vertical" : "horizontal"}
          activeStep={currentCheckoutPage}
        >
          <Step completed>
            <StepLabel>Memilih Produk</StepLabel>
          </Step>
          <Step>
            <StepLabel>Alamat pengiriman</StepLabel>
          </Step>
          <Step>
            <StepLabel>Pembayaran</StepLabel>
          </Step>
          <Step>
            <StepLabel>Ulasan</StepLabel>
          </Step>
        </Stepper>
        <div className="mt-5 flex items-center">
          <Button
            onClick={() => {
              setCurrentCheckoutPage((prev) =>
                Math.max(Math.min(prev - 1, 3), 1)
              );
            }}
          >
            Kembali
          </Button>
          <div className="flex-1"></div>
          <Button
            onClick={() => {
              setCurrentCheckoutPage((prev) =>
                Math.max(Math.min(prev + 1, 3), 1)
              );
            }}
          >
            Lanjut
          </Button>
        </div>
      </div>
      <div
        className="w-full h-full overflow-x-hidden relative transition-[height]"
        style={{
          height: currentPageHeight,
          overflowY: pageHeightAnimating ? "hidden" : "auto",
        }}
      >
        <AnimatePresence>
          {(
            [
              [Page1, 1],
              [Page2, 2],
              [Page3, 3],
            ] as [JSX.Element, number][]
          ).map((el) => (
            <motion.div
              key={el[1]}
              className="w-full h-max absolute"
              ref={(element) => {
                const current = pageElements.current;
                pageElements.current = [...current, { element, id: el[1] }];
              }}
              onAnimationStart={() => {
                setPageHeightAnimating(true);
                console.log("start");
              }}
              onAnimationComplete={() => console.log("complete")}
              onAnimationEnd={() => {
                setPageHeightAnimating(false);
                console.log("end");
              }}
              initial={
                currentCheckoutPage !== el[1]
                  ? { x: "0%", visibility: "visible", opacity: 1 }
                  : {
                      x: currentCheckoutPage > el[1] ? "100%" : "-100%",
                      visibility: "hidden",
                      opacity: 0,
                    }
              }
              animate={
                currentCheckoutPage !== el[1]
                  ? {
                      x: currentCheckoutPage > el[1] ? "-100%" : "100%",
                      visibility: "hidden",
                      opacity: 0,
                    }
                  : { x: "0%", visibility: "visible", opacity: 1 }
              }
              transition={{ type: "tween", duration: 0.35 }}
              exit={{ x: "100%" }}
            >
              {el[0]}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
