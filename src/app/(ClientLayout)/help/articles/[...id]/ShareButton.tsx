"use client";

import {
  EmailShare,
  FacebookShare,
  TelegramShare,
  WhatsappShare,
} from "react-share-kit";

export default function ShareButton() {
  return (
    <div className="flex gap-4 my-4 px-2 ">
      <EmailShare
        url={globalThis.window && window.location.href}
        subject={"Hey check out this post"}
        size={40}
      />
      <FacebookShare
        url={globalThis.window && window.location.href}
        quote={"react-share-kit - social share buttons for next & react apps."}
        size={40}
      />
      <WhatsappShare
        url={globalThis.window && window.location.href}
        title={"Check out this post"}
        size={40}
      />
      <TelegramShare
        url={globalThis.window && window.location.href}
        size={40}
      />
    </div>
  );
}
