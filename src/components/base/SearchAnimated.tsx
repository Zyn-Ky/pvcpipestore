"use client";
import { Backdrop, DialogContent } from "@mui/material";
import FocusTrap from "@mui/material/Unstable_TrapFocus/FocusTrap";
import gsap, { Expo } from "gsap";
import {
  createContext,
  HTMLAttributes,
  MutableRefObject,
  PropsWithChildren,
  ReactNode,
  RefObject,
  useContext,
  useRef,
  useState,
} from "react";
import { useIsomorphicLayoutEffect, useLockBodyScroll } from "react-use";

type contextProp = {
  searchButtonRef: MutableRefObject<HTMLButtonElement | null> | null;
  searchModalRef: MutableRefObject<HTMLDivElement | null> | null;
  opened: boolean;
  triggerSearchButton: (open?: boolean) => void;
};
export const srchBtnContext = createContext<contextProp>({
  opened: false,
  triggerSearchButton() {},
  searchButtonRef: null,
  searchModalRef: null,
});

interface SearchModalProps<T = HTMLDivElement>
  extends PropsWithChildren<HTMLAttributes<T>> {
  contentProps?: HTMLAttributes<T>;
  searchButtonCloneNode: ReactNode;
}
export function SearchModal(props: SearchModalProps<HTMLDivElement>) {
  const ctx = useContext(srchBtnContext);
  const {
    className,
    contentProps,
    children,
    searchButtonCloneNode,
    ...rootProps
  } = props;
  const {
    className: contentClassName,
    style,
    ...anotherContentProps
  } = contentProps || {};
  return (
    <>
      <Backdrop
        open={ctx.opened}
        className="z-muiModal"
        onClick={() => ctx.triggerSearchButton(false)}
      />
      <FocusTrap open={ctx.opened}>
        <div className="invisible">
          <div
            ref={ctx.searchModalRef}
            className={`fixed h-[100vh] w-[100vw] overflow-hidden top-0 left-0 z-muiModal will-change-[transform,top,left,width,height,border-radius,opacity] ${
              className && className
            }`}
            {...rootProps}
          >
            <div
              className="relative h-full"
              style={{
                display: "none",
              }}
              data-splash
            >
              {searchButtonCloneNode && searchButtonCloneNode}
            </div>
            <DialogContent
              className={`p-4 ${contentClassName && contentClassName}`}
              data-search-content
              style={{
                display: "block",
                ...(style && style),
              }}
              {...anotherContentProps}
            >
              {children && children}
            </DialogContent>
          </div>
        </div>
      </FocusTrap>
    </>
  );
}
export const SearchButtonConsumer = srchBtnContext.Consumer;
export function SearchButtonProvider(
  props: PropsWithChildren<{
    borderRadiusBtn?: string | number;
    duration?: number;
  }>
) {
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchModalRef = useRef<HTMLDivElement>(null);
  const [searchBoxOpened, setSearchBoxOpened] = useState(false);
  const searchBoxAnimTl = useRef<gsap.core.Timeline | null>(null);
  useLockBodyScroll(searchBoxOpened);

  function calculatePosition(element: HTMLElement) {
    const root = document.documentElement;
    var rect = element.getBoundingClientRect();
    var body = document.body;
    var scrollTop = window.pageYOffset || root.scrollTop || body.scrollTop || 0;
    var scrollLeft =
      window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;

    var clientTop = root.clientTop || body.clientTop || 0;
    var clientLeft = root.clientLeft || body.clientLeft || 0;

    return {
      top: Math.round(rect.top + scrollTop - clientTop),
      left: Math.round(rect.left + scrollLeft - clientLeft),
      height: rect.height,
      width: rect.width,
    };
  }

  function toggleSearchBox(
    fromElement: HTMLElement,
    toElement: HTMLElement,
    invertBorderRadius: boolean
  ) {
    if (!searchBoxAnimTl.current) return;
    const body = document.body;
    const from = calculatePosition(fromElement);
    const to = calculatePosition(toElement);
    const splash = fromElement.querySelector<HTMLElement>("[data-splash]");
    const content = fromElement.querySelector<HTMLElement>(
      "[data-search-content]"
    );

    if (splash) {
      splash.style.setProperty("display", "block");
    }
    if (content) content.style.setProperty("display", "none");
    console.log(from, to);

    const clone = fromElement.cloneNode(true);
    searchBoxAnimTl.current.set([fromElement, toElement], {
      visibility: "hidden",
      opacity: 0,
    });
    searchBoxAnimTl.current.set(clone, { position: "absolute", margin: 0 });
    body.appendChild(clone);

    searchBoxAnimTl.current.set(clone, {
      ...from,
      borderRadius: invertBorderRadius
        ? "0px"
        : props.borderRadiusBtn ?? "16px",
    });
    searchBoxAnimTl.current.to(clone, {
      x: to.left - from.left,
      y: to.top - from.top,
      width: to.width,
      height: to.height,
      autoRound: false,
      borderRadius: invertBorderRadius
        ? props.borderRadiusBtn ?? "16px"
        : "0px",
      opacity: 1,
      ease: Expo.easeInOut,
      duration: props.duration ?? 0.425,
      onComplete,
    });
    function onComplete() {
      if (!searchBoxAnimTl.current) return;
      searchBoxAnimTl.current
        .fromTo(clone, { opacity: 1 }, { opacity: 0 }, 0)
        .fromTo(
          toElement,
          {
            visibility: "hidden",
            opacity: 0,
          },
          {
            visibility: "visible",
            opacity: 1,
          },
          0
        )
        .call(() => {
          if (splash) {
            splash.style.setProperty("display", "none");
          }
          if (content) content.style.removeProperty("display");
          body.removeChild(clone);
        });
    }
  }
  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      searchBoxAnimTl.current = tl;
    }, [searchButtonRef.current]);
    return () => {
      ctx.clear();
      ctx.revert();
      ctx.kill(true);
    };
  });
  return (
    <srchBtnContext.Provider
      value={{
        opened: searchBoxOpened,
        searchButtonRef,
        searchModalRef,
        triggerSearchButton(open) {
          setSearchBoxOpened(open ?? !searchBoxOpened);
          if (!searchButtonRef.current || !searchModalRef.current) return;
          if (!searchBoxOpened)
            toggleSearchBox(
              searchButtonRef.current,
              searchModalRef.current,
              false
            );
          if (searchBoxOpened)
            toggleSearchBox(
              searchModalRef.current,
              searchButtonRef.current,
              true
            );
        },
      }}
    >
      {props.children}
    </srchBtnContext.Provider>
  );
}
