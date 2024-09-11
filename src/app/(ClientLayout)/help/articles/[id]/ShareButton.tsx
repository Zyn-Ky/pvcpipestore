"use client";

import {
  EmailShare,
  FacebookShare,
  TelegramShare,
  WhatsappShare,
  TwitterShare,
  PocketShare,
  LineShare,
} from "react-share-kit";

export default function ShareButton({
  description,
  title,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 my-4 px-2 overflow-auto">
      <EmailShare
        url={globalThis.window && window.location.href}
        body={`Check out this post!\n\n${
          globalThis.window && window.location.href
        }\n${title}\n\nShort Description:\n${description}\n\n\n\nShared by react-share-kit`}
        subject={`Check out this post!`}
        size={40}
      />
      <FacebookShare
        url={globalThis.window && window.location.href}
        quote={`- ${title}\n\n${description}`}
        size={40}
      />
      <WhatsappShare
        url={globalThis.window && window.location.href}
        title={`Check out this post!\n\nTitle : ${title}`}
        size={40}
      />
      <TelegramShare
        url={globalThis.window && window.location.href}
        title={`Check out this post!\n\nTitle : ${title}`}
        size={40}
      />
      <TwitterShare
        url={globalThis.window && window.location.href}
        title={`Check out this post called ${title}`}
        hashtags={["pipapvc", "pipa", "kpipa"]}
        size={40}
      />
      <PocketShare
        url={globalThis.window && window.location.href}
        title={`title`}
        content={`Title : ${title}\nDescription : ${description}`}
        size={40}
      />
      <LineShare
        url={globalThis.window && window.location.href}
        title={`Check out this post!\n\nTitle : ${title}`}
        size={40}
      />
    </div>
  );
}
