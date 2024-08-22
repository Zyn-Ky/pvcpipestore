/* eslint-disable @next/next/no-img-element */
"use client";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import { AxiosFetchV1Api, AxiosPostToImageUploadServer } from "@/libs/axios";
import SITE_BACKEND_CONFIG, {
  ADMIN_API_VERSION,
  API_PATH,
  StoredProductCardInfo,
} from "@/libs/config";
// import useSavedFormState from "@/components/custom/SellerCenter/useSavedFormState";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  InputAdornment,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useEffectOnce } from "react-use";
import { FileUploader } from "react-drag-drop-files";
import {
  BtnBold,
  BtnItalic,
  BtnRedo,
  BtnUndo,
  createButton,
  Separator,
  Editor,
  EditorProvider,
  Toolbar,
  BtnUnderline,
  BtnStrikeThrough,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
  BtnClearFormatting,
  BtnStyles,
} from "react-simple-wysiwyg";
import GenerateSanitizedURLSlug from "@/libs/api/GenerateSanitizedURLSlug";
import { LoadingButton } from "@mui/lab";
import { CloudUpload } from "@mui/icons-material";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { firebaseApp } from "@/libs/firebase/config";
import { UploadedImageResult } from "@/libs/api/UploadToCloudinary";
import Link from "next/link";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ClientForm() {
  const [uploadServerOK, setUploadServerOK] = useState(false);
  const [productState, setProductState] = useState("UNPUBLISHED");
  const [htmlDescription, setHtmlDescription] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [catalogID, setCatalogID] = useState("");
  const [slugURL, setSlugURL] = useState("");
  const [imagesForm, setImagesForm] = useState<
    {
      id: number;
      binary: File;
    }[]
  >([]);
  const [isCreating, setIsCreating] = useState(false);
  const { apiManager, userManager } = useGeneralFunction();
  const CheckImgServer = useCallback(
    async function () {
      if (!userManager.currentUser) return;
      const { data } = await AxiosFetchV1Api(
        "POST",
        API_PATH.SELLER_ADD_NEW_PRODUCT,
        apiManager.xsrfToken,
        {
          authToken: await userManager.currentUser.getIdToken(),
          condition: "checkImageServerStatus",
        }
      );
      setUploadServerOK(data.nextAction === "CONTINUE_IMAGE_UPLOAD");
    },
    [userManager.currentUser]
  );
  async function UploadImages(productName: string, binary: File) {
    if (!userManager.currentUser) return;
    const uploadResult = await AxiosPostToImageUploadServer(
      apiManager.xsrfToken,
      await userManager.currentUser.getIdToken(true),
      productName,
      binary
    );
    console.log(uploadResult);
    return uploadResult;
  }
  async function PostToFirestore(
    form: {
      [k: string]: FormDataEntryValue;
    },
    images: (UploadedImageResult | undefined)[]
  ) {
    if (!userManager.currentUser) return;
    /**{name: 't57tyfgf6', available_stock: '99', category_id: '53,76767,7676', price: '244234', slug_url: 't57tyfgf6-hda1ozZTuQh0P', price_mode: 'FIXED_PRICE'} */
    const firestore = getFirestore(firebaseApp);
    try {
      await setDoc<StoredProductCardInfo, StoredProductCardInfo>(
        doc(
          firestore,
          SITE_BACKEND_CONFIG.FIRESTORE_PRODUCT_ROOT_PATH,
          form.slug_url as string
        ),
        {
          AvailableStock: parseInt((form.available_stock as string) ?? "0"),
          CatalogID: (form.category_id as string)
            .split(",")
            .map((id) => parseInt(id)),
          Description: htmlDescription,
          Images: images.map((img) => img?.url ?? ""),
          LinkedUser: userManager.currentUser.uid,
          Name: form.name as string,
          Price: parseInt((form.price as string) ?? 0),
          PriceMode: "FIXED_PRICE",
          SuggestedCurrency: (form.suggested_currency as string) ?? "IDR",
        }
      );
      setIsCreating(false);
      setProductState("PUBLISHED");
    } catch {
      setProductState("UNPUBLISHED");
    }
  }
  const CreateNewProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);
    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData);
    const { file_array, ...formPropsCleaned } = formProps;
    if (imagesForm.length > 0) {
      console.time("upload image");
    }
    const Images =
      imagesForm.length > 0
        ? await Promise.all(
            imagesForm.map(
              async (item) =>
                (
                  await UploadImages(
                    formPropsCleaned.slug_url as string,
                    item.binary
                  )
                )?.data.response
            )
          )
        : [];
    console.timeEnd("upload image");

    console.log(formPropsCleaned, Images);
    await PostToFirestore(formPropsCleaned, Images);
    e.currentTarget.reset();
  };
  useEffect(() => {
    CheckImgServer();
  }, [CheckImgServer]);
  return productState === "PUBLISHED" ? (
    <Box sx={{ maxWidth: 720, width: "100%", margin: "auto" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Selamat produk anda telah terbit!
      </Typography>
      <Button
        variant="contained"
        LinkComponent={Link}
        href={`/product/${slugURL}`}
      >
        Kunjungi
      </Button>
    </Box>
  ) : (
    <Box sx={{ maxWidth: 1080, width: "100%", margin: "auto" }}>
      <EditorProvider>
        <FormControl
          method="POST"
          component="form"
          onSubmit={CreateNewProduct}
          fullWidth
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Tambah produk
          </Typography>
          <FormGroup sx={{ mb: 1 }}>
            <TextField
              name="name"
              label="Judul"
              variant="filled"
              value={productTitle}
              onChange={(input) => {
                setProductTitle(input.currentTarget.value);
                setSlugURL(
                  GenerateSanitizedURLSlug(input.currentTarget.value, {
                    generateRandomID: true,
                  })
                );
              }}
              helperText={slugURL && `URL : ${slugURL}`}
              required
            />
          </FormGroup>
          <FormGroup sx={{ mb: 1 }}>
            <TextField
              label="Category ID (separate in commas)"
              variant="filled"
              name="category_id"
              onChange={(e) => {
                setCatalogID(e.target.value.replace(/[^\d,]/g, ""));
              }}
              value={catalogID}
              required
            />
          </FormGroup>
          {uploadServerOK && (
            <FormGroup sx={{ my: 2, px: 2, alignItems: "center" }}>
              <FileUploader
                label="Unggah foto dengan klik disini / menarik foto kesini"
                hoverTitle="Taruh disini"
                maxSize={3}
                multiple
                handleChange={(files: FileList) => {
                  if (!files) return;
                  const arrayFiles = Array.from(files);
                  setImagesForm((prev) => [
                    ...prev,
                    ...arrayFiles.map((binary, i) => ({ id: i, binary })),
                  ]);
                }}
                name="file_array"
                types={["PNG", "JPG"]}
              />

              {imagesForm && (
                <div>
                  {imagesForm.map((file, i) => {
                    return (
                      <a
                        key={`IMG_PRODUCT_${file.id}`}
                        title="Click to Delete Image"
                        onClick={(e) => {
                          e.preventDefault();
                          setImagesForm((prev) =>
                            prev.filter((item) => item.id !== file.id)
                          );
                        }}
                      >
                        <img
                          alt={`Product Image ${file.id}`}
                          src={URL.createObjectURL(file.binary)}
                          width={80}
                          height={80}
                        />
                      </a>
                    );
                  })}
                </div>
              )}
            </FormGroup>
          )}

          <FormGroup sx={{ mb: 1 }}>
            <Typography>Deskripsi</Typography>
            <Editor
              value={htmlDescription}
              onChange={(e) => setHtmlDescription(e.target.value)}
              style={{
                minHeight: "250px",
                maxWidth: "100%",
                overflow: "auto",
                maxHeight: "50vh",
              }}
              containerProps={{ style: { width: "100%" } }}
            >
              <Toolbar>
                <BtnUndo />
                <BtnRedo />
                <Separator />
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
                <BtnStrikeThrough />
                <Separator />
                <BtnNumberedList />
                <BtnBulletList />
                <Separator />
                <BtnLink />
                <BtnClearFormatting />
                <Separator />
                <BtnStyles />
              </Toolbar>
            </Editor>
          </FormGroup>
          <FormGroup sx={{ flexDirection: "row", gap: 1 }}>
            <TextField type="number" name="available_stock" label="Stok" />
            <TextField
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Select
                      value="IDR"
                      name="suggested_currency"
                      placeholder="Mata uang"
                      variant="outlined"
                      size="small"
                    >
                      <MenuItem value="IDR">IDR</MenuItem>
                    </Select>
                  </InputAdornment>
                ),
              }}
              label="Harga"
              name="price"
            />
          </FormGroup>
          <VisuallyHiddenInput type="text" value={slugURL} name="slug_url" />
          <VisuallyHiddenInput
            type="text"
            value="FIXED_PRICE"
            name="price_mode"
          />

          <LoadingButton
            type="submit"
            loading={isCreating}
            variant="contained"
            sx={{ m: 3 }}
          >
            Buat
          </LoadingButton>
        </FormControl>
      </EditorProvider>
    </Box>
  );
}
