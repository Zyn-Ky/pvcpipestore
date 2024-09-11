"use client";
import { useLogger } from "@/components/hooks/logger";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDropArea, useMouseWheel } from "react-use";
import AvatarEditor from "react-avatar-editor";
import { compress, compressAccurately, EImageType } from "image-conversion";

import { LoadingButton } from "@mui/lab";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  StorageReference,
  TaskState,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseApp } from "@/libs/firebase/config";
import SITE_BACKEND_CONFIG from "@/libs/config";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import { enqueueSnackbar } from "notistack";
import { useTranslations } from "next-intl";
interface UpdatePhotoModuleProps {
  onClose: () => void;
  open: boolean;
}
const DefaultZoom = 1;
const DefaultRotation = 0;
const MinZoom = 1;
const MinRotation = 0;
const MaxZoom = 10;
const MaxRotation = 360;
const ZoomSliderStepSize = 100;
const ImageResultSize = {
  width: 180,
  height: 180,
};
type ImageUploadProgress = {
  progress?: number;
  url?: string;
  bytesTransferred?: number;
  totalSize?: number;
  state?: TaskState;
};
export default function UpdatePhotoModule({
  onClose,
  open,
}: UpdatePhotoModuleProps) {
  const { Console } = useLogger();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [enableEdit, setEnableEdit] = useState(false);
  const [editedImageRotation, setEditedImageRotation] = useState(0);
  const [editedImageZoom, setEditedImageZoom] = useState(DefaultZoom);
  const t = useTranslations("ACCOUNT_MANAGER");
  const { userManager } = useGeneralFunction();
  const [uploadStatus, setUploadStatus] = useState<ImageUploadProgress | null>(
    null
  );
  const editor = useRef<AvatarEditor>(null);
  const [bond, state] = useDropArea({
    onFiles: (file) => {
      Console("info", "PfpChanger Logger : File changed!", file);
      setImageFile(file[0] ?? null);
    },
    onText: () => alert("Invalid Type"),
    onUri: () => alert("Invalid Type"),
  });
  const blobUrl = useMemo(
    () => imageFile && URL.createObjectURL(imageFile),
    [imageFile]
  );
  function onCloseHandler() {
    onClose();
    setImageFile(null);
    const el = document.querySelector<HTMLInputElement>(
      "input#avatar-fileinput"
    );
    el && (el.value = "");
  }
  function onComplete() {
    enqueueSnackbar("Photo profile changed!");
    onCloseHandler();
  }
  function GetImageToBlobPromise(): Promise<Blob | null> {
    return new Promise(function (resolve, reject) {
      editor.current &&
        editor.current.getImage().toBlob(async (blob) => {
          if (!blob) {
            reject(null);
            return;
          }
          resolve(blob);
        });
    });
  }
  async function RemoveAllPicture() {
    if (!userManager.currentUser) return;
    const storage = getStorage(firebaseApp);
    const listAllPicRef = ref(
      storage,
      `${SITE_BACKEND_CONFIG.FBSTORAGE_PHOTO_PROFILE_ROOT_PATH}${userManager.currentUser?.uid}`
    );
    const files = await listAll(listAllPicRef);
    Promise.all(files.items.map(async (item) => await deleteObject(item)));
  }
  async function GeneratePfpImage(blob?: boolean, isScaledDown?: boolean) {
    if (!editor.current) return;
    const blobFile = await GetImageToBlobPromise();
    if (!blobFile) return;
    const scaled = await compress(blobFile, {
      width: ImageResultSize.width,
      height: ImageResultSize.height,
      type: EImageType.PNG,
      quality: 1,
    });
    if (!scaled) return;
    if (blob) return isScaledDown ? scaled : blobFile;
    if (!blob) return URL.createObjectURL(isScaledDown ? scaled : blobFile);
  }
  function UploadToStoragePromise(
    imageSavePathRef: StorageReference,
    blobFile: Blob
  ) {
    const task = uploadBytesResumable(imageSavePathRef, blobFile);
    task.on(
      "state_changed",
      ({ bytesTransferred, totalBytes, state }) => {
        const progress = (bytesTransferred / totalBytes) * 100;
        setUploadStatus({
          bytesTransferred,
          progress,
          state,
          totalSize: totalBytes,
          url: "",
        });
        Console("log", "PfpChanger state :", uploadStatus);
      },
      (error) => {
        Console("error", "PfpChanger ERROR :", error);
        setUploadStatus(null);
        onClose();
      },
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        if (url) {
          Console(
            "log",
            "PfpChanger photoURL changed :",
            await userManager.method.UpdateInfo({
              photoURL: url,
            })
          );
          setUploadStatus((status) => {
            return { ...status, state: "success", url };
          });
          onComplete();
        }
        // resolve({finished: true, url: })
      }
    );
  }
  async function onClickSave() {
    if (!userManager.currentUser) return;
    await RemoveAllPicture();
    const storage = getStorage(firebaseApp);
    const imageSavePathRef = ref(
      storage,
      `${SITE_BACKEND_CONFIG.FBSTORAGE_PHOTO_PROFILE_ROOT_PATH}/${
        userManager.currentUser.uid
      }/${Math.floor(Date.now() / 1000)}.png`
    );
    const blobFile = (await GeneratePfpImage(true, true)) as Blob;
    UploadToStoragePromise(imageSavePathRef, blobFile);
    Console("log", "PfpChanger state :", uploadStatus);
  }
  useEffect(() => {
    setEnableEdit(Boolean(imageFile));
  }, [imageFile]);

  const Page1 = (
    <>
      <label
        className="flex flex-col justify-center items-center w-full h-64 border-[8px] rounded-xl border-dashed border-blue-500 cursor-pointer"
        {...bond}
        tabIndex={0}
        htmlFor="avatar-fileinput"
        onKeyDown={(e) =>
          e.key === "Enter" &&
          document
            .querySelector<HTMLInputElement>("input#avatar-fileinput")
            ?.click()
        }
      >
        {!state.over && <p>Klik / Drag foto</p>}
        {state.over && <p>Lepas disini</p>}
        <input
          type="file"
          id="avatar-fileinput"
          onChange={(e) => {
            Console(
              "info",
              "PfpChanger Logger : File changed!",
              e.currentTarget.files
            );
            setImageFile(e.currentTarget.files?.item(0) ?? null);
          }}
          accept="image/png, image/jpeg"
          className="hidden w-0 h-0"
        />
      </label>
    </>
  );
  const Page2 = blobUrl && (
    <div className="flex flex-col gap-4">
      <AvatarEditor
        ref={editor}
        image={blobUrl}
        width={128}
        className="w-full"
        style={{
          pointerEvents: uploadStatus?.state === "running" ? "none" : "initial",
        }}
        height={128}
        color={[255, 255, 255, 0.6]}
        border={100}
        borderRadius={100}
        scale={editedImageZoom}
        rotate={editedImageRotation}
      />
      <div className="flex-1">
        <p>{t("EDITOR_ZOOM_TEXT")}</p>
        <Slider
          defaultValue={DefaultZoom}
          aria-label="Default"
          valueLabelDisplay="auto"
          max={MaxZoom * ZoomSliderStepSize}
          min={MinZoom * ZoomSliderStepSize}
          disabled={uploadStatus?.state === "running"}
          valueLabelFormat={(val) =>
            Number((val / ZoomSliderStepSize).toFixed(1))
          }
          onChange={(e, val) =>
            setEditedImageZoom(
              Array.isArray(val)
                ? val[0] / ZoomSliderStepSize
                : val / ZoomSliderStepSize
            )
          }
        />
        <p>{t("EDITOR_ROTATION_TEXT")}</p>
        <Slider
          defaultValue={DefaultRotation}
          aria-label="Default"
          valueLabelDisplay="auto"
          max={MaxRotation}
          min={MinRotation}
          disabled={uploadStatus?.state === "running"}
          // valueLabelFormat={(val) => Number(val.toFixed(1))}
          onChange={(e, val) =>
            setEditedImageRotation(Array.isArray(val) ? val[0] : val)
          }
        />
      </div>
    </div>
  );

  return (
    <>
      <Dialog open={open} onClose={() => onCloseHandler()}>
        <DialogTitle>{t("EDIT_PHOTO_URL_TEXT")}</DialogTitle>
        <DialogContent className="min-w-80">
          {!Boolean(blobUrl) && Page1}
          {Boolean(blobUrl) && Page2}
          {uploadStatus?.state === "running" && (
            <>
              <div className="my-4 px-4">
                <Typography gutterBottom>
                  {t("EDITOR_UPLOADING")} |{" "}
                  {uploadStatus?.totalSize && uploadStatus.totalSize + " Bytes"}
                </Typography>
                <LinearProgress variant="determinate" value={100} />
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseHandler}>{t("EDITOR_CANCEL")}</Button>
          {blobUrl && (
            <LoadingButton
              onClick={onClickSave}
              loading={uploadStatus?.state === "running"}
            >
              {t("EDITOR_SAVE")}
            </LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
