"use client";
import { firebaseApp, FirebaseAuth } from "@/libs/firebase/config";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc } from "firebase/firestore";
import Image from "next/image";
import React from "react";

import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";

export default function ProductList() {
  const [value, loading, error] = useCollection(
    collection(getFirestore(firebaseApp), "Products")
  );
  return (
    <>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value && (
          <span>
            {value.docs.map((doc, index) => (
              <React.Fragment key={doc.id}>
                <h1>
                  {index + 1}. {doc.data().Name}
                </h1>
                <Image
                  width={250}
                  height={250}
                  src={doc.data().Images[0]}
                  alt={doc.data().Name}
                />
                <p>Rp. {doc.data().Price}</p>
                <p>Description</p>
                <p>{doc.data().Description}</p>
                <br />
                <br />
                <br />
                {JSON.stringify(doc.data())}, <br />
                <br />
                <br />
              </React.Fragment>
            ))}
          </span>
        )}
      </p>
    </>
  );
}
