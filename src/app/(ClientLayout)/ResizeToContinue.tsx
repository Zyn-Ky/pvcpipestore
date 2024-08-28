import { AnimResizeIcon } from "@/components/assets/images";
import Image from "next/image";

export default function ResizeToContinue() {
  return (
    <>
      <div className="hidden fixed inset-0 flex-col justify-center  text-center  text-xs items-center text-black bg-neutral-100 z-godMode dangerWidth:flex dangerHeight:flex">
        <a
          href="https://www.flaticon.com/free-animated-icons/enlarge"
          title="enlarge animated icons"
          target="_blank"
        >
          <Image
            src={AnimResizeIcon}
            priority
            width={80}
            height={80}
            alt="Enlarge animated icons created by Freepik - Flaticon"
          />
        </a>
        <p>Enlarge animated icons created by Freepik - Flaticon</p>
        <br />
        <p>Resize to continue</p>
      </div>
    </>
  );
}
