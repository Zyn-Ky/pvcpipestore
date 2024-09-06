"use client";
import { PromptAuth } from "@/components";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import paths from "@/components/paths";
import LoginIcon from "@mui/icons-material/Login";
import Image from "next/image";
import { useState } from "react";
import UpdatePhotoModule from "./UpdatePhotoModule";
export default function AccountSettingsUI(params: any) {
  // const [user, loading, error] = useAuthState(FirebaseAuth);
  const { apiManager, userManager } = useGeneralFunction();
  const [openedPhotoUploader, setOpenPhotoUploader] = useState(false);
  return (
    <>
      <h1>Akun</h1>

      <ProtectedHiddenDevelopmentComponent>
        {userManager.currentUser && (
          <>
            {userManager.currentUser.photoURL && (
              <Image
                src={userManager.currentUser.photoURL}
                alt={`Photo of ${userManager.currentUser.displayName}`}
                width={64}
                height={64}
                onClick={() => setOpenPhotoUploader(true)}
              />
            )}
            <p>{userManager.currentUser.displayName}</p>
            <button>Edit Profil</button>
            <UpdatePhotoModule
              open={openedPhotoUploader}
              onClose={() => setOpenPhotoUploader(false)}
            />
          </>
        )}
        {!userManager.currentUser && (
          <PromptAuth
            icon={
              <LoginIcon className="text-7xl md:text-9xl !transition-[font-size,fill]" />
            }
            redirectPath={paths.SETTINGS_PAGE}
            message="Masuk untuk merubah preferensi akun anda"
          />
        )}
      </ProtectedHiddenDevelopmentComponent>
    </>
  );
}
