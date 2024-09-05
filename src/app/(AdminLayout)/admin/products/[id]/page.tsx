"use client";

import { useParams } from "next/navigation";

export default function AdminProductItemEditor() {
  const { id } = useParams();
  return (
    <>
      <p>Product Editor</p>
      <p>{id}</p>
    </>
  );
}
