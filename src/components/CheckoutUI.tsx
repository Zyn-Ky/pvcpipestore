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
import { useLogger } from "./hooks/logger";
import { useUserShippingAddress } from "./hooks/userConfig";
import { useForm, SubmitHandler } from "react-hook-form";
import { CheckoutUIPage1 } from "./base/CheckoutUIPages";
import ProtectedHiddenDevelopmentComponent from "./base/ProtectedHiddenDevComponent";
import { useDebounce } from "react-use";

export default function CheckoutUI({
  productID,
  summaryUIOnly,
}: {
  productID: string;
  summaryUIOnly?: boolean;
}) {
  const { userManager } = useGeneralFunction();
  const { Console } = useLogger();
  const [currentCheckoutPage, setCurrentCheckoutPage] = useState(
    summaryUIOnly ? 0 : 1
  );
  const [currentPageHeight, setCurrentPageHeight] = useState(0);
  const [pageHeightAnimating, setPageHeightAnimating] = useState(false);
  const [stepperHeightAnimating, setStepperHeightAnimating] = useState(false);
  const pageElements = useRef<{ id: number; element: HTMLDivElement | null }[]>(
    []
  );
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const containerFormRef = useRef<HTMLDivElement | null>(null);
  const stepsTextRef = useRef<(HTMLDivElement | null)[]>([]);
  function updateHeightStepper({
    disableAnimation,
    disableOverflowHidden,
  }: {
    disableAnimation?: boolean;
    disableOverflowHidden?: boolean;
  }) {
    const selectedPage = pageElements.current.filter(
      ({ id }) => id === currentCheckoutPage
    );
    if (selectedPage.length > 0 && selectedPage[0].element) {
      !disableOverflowHidden && setStepperHeightAnimating(true);
      stepsTextRef.current[selectedPage[0].id]?.scrollIntoView({
        behavior: disableAnimation ? "instant" : "smooth",
        block: "center",
      });
      (window as any)["x_clock_anim_stepper_height_sys_timer_id"] = setTimeout(
        () => {
          !disableOverflowHidden && setStepperHeightAnimating(false);
        },
        stepsTextRef.current[selectedPage[0].id]?.scrollTop ?? 50
      );
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
  }

  function toggleCheckoutSubPage(cb: (prev: number) => number) {
    updateHeightStepper({ disableAnimation: true });
    const prev = cb(currentCheckoutPage);
    clearTimeout((window as any)["chck_checkout_sys_timer_id"]);
    containerFormRef.current?.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    (window as any)["chck_checkout_sys_timer_id"] = setTimeout(() => {
      setCurrentCheckoutPage(
        Math.max(Math.min(prev, 3), summaryUIOnly ? 0 : 1)
      );
    }, (containerFormRef.current?.scrollTop ?? 0) + 100);
  }
  useDebounce(
    () => {
      updateHeightStepper({
        disableAnimation: false,
        disableOverflowHidden: false,
      });
    },
    100,
    [currentCheckoutPage, pageElements]
  );
  if (!userManager.currentUser) return <></>;
  const Page0 = summaryUIOnly ? (
    <ProtectedHiddenDevelopmentComponent
      forceFallback
      fallback={
        <>
          <p className="text-lg text-center font-bold">
            This component is in under major development! Expected to be working
            in v5.9
          </p>
        </>
      }
    >
      <h1>Summary</h1>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
    </ProtectedHiddenDevelopmentComponent>
  ) : (
    <ProtectedHiddenDevelopmentComponent
      forceFallback
      fallback={
        <>
          <p className="text-lg text-center font-bold">
            This component is in under major development! Expected to be working
            in v5.9
          </p>
        </>
      }
    ></ProtectedHiddenDevelopmentComponent>
  );
  const Page1 = (
    <>
      <ProtectedHiddenDevelopmentComponent
        forceFallback
        fallback={
          <>
            <p className="text-lg text-center font-bold">
              This component is in under major development! Expected to be
              working in v6.0 / v5.9 / v5.8
            </p>
          </>
        }
      >
        <CheckoutUIPage1 />
      </ProtectedHiddenDevelopmentComponent>
    </>
  );
  const Page2 = (
    <ProtectedHiddenDevelopmentComponent
      forceFallback
      fallback={
        <>
          <p className="text-lg text-center font-bold">
            This component is in under major development!
          </p>
        </>
      }
    >
      <Typography variant="h4" component="h1" fontWeight="bold">
        Metode Pembayaran
      </Typography>
      <p>Tes</p>
    </ProtectedHiddenDevelopmentComponent>
  );
  const Page3 = (
    <ProtectedHiddenDevelopmentComponent
      forceFallback
      fallback={
        <>
          <p className="text-lg text-center font-bold">
            This component is in under major development!
          </p>
        </>
      }
    >
      <h1>Test</h1>
    </ProtectedHiddenDevelopmentComponent>
  );
  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-0 muiSm:p-8 mx-auto w-full">
        <Stepper
          orientation={isSmallScreen ? "vertical" : "horizontal"}
          className={`overflow-x-auto w-full ${isSmallScreen && "h-[64px]"} ${
            stepperHeightAnimating ? "overflow-y-auto" : "overflow-y-hidden"
          }`}
          activeStep={currentCheckoutPage}
          data-invisible-scrollbar={isSmallScreen ? "true" : "false"}
        >
          <Step
            ref={(e) => {
              stepsTextRef.current[0] = e;
            }}
            completed={!summaryUIOnly}
          >
            <StepLabel>Ulasan</StepLabel>
          </Step>
          <Step
            ref={(e) => {
              stepsTextRef.current[1] = e;
            }}
          >
            <StepLabel>Alamat pengiriman</StepLabel>
          </Step>
          <Step
            ref={(e) => {
              stepsTextRef.current[2] = e;
            }}
          >
            <StepLabel>Pembayaran</StepLabel>
          </Step>
          <Step
            ref={(e) => {
              stepsTextRef.current[3] = e;
            }}
          >
            <StepLabel>Selesai</StepLabel>
          </Step>
        </Stepper>
        <div className="mt-5 flex items-center">
          <Button
            onClick={() => {
              toggleCheckoutSubPage((prev) => prev - 1);
            }}
          >
            Kembali
          </Button>
          <div className="flex-1"></div>
          <Button
            onClick={() => {
              toggleCheckoutSubPage((prev) => prev + 1);
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
        ref={containerFormRef}
      >
        <AnimatePresence>
          {(
            [
              [Page0, 0],
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
                Console("log", "start");
              }}
              onAnimationComplete={() => {
                setPageHeightAnimating(false);
                Console("log", "complete");
              }}
              onAnimationEnd={() => {
                setPageHeightAnimating(false);
                Console("log", "end");
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
