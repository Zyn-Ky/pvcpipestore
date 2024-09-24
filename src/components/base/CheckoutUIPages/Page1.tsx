import { useCheckOutUIContext } from "@/components/CheckoutUI";
import { useUserShippingAddress } from "@/components/hooks/userConfig";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  SubmitHandler,
  useController,
  UseControllerProps,
  useForm,
} from "react-hook-form";
interface CheckoutForm {
  ReceiverFirstName: string;
  ReceiverLastName: string;
  ReceiverEmail: string;
  ReceiverHomeAddress: string;
  ReceiverAddonHomeAddress: string;
  ReceiverCountry: string;
  ReceiverCity: string;
  ReceiverProvince: string;
  ReceiverTelephone: string;
  ReceiverNote: string;
}
function Input(props: UseControllerProps<CheckoutForm>) {
  const { field, fieldState } = useController(props);

  return <TextField {...field} />;
}
export default function CheckoutUIPage1() {
  const [useDifferentInfo, setUseDifferentInfo] = useState("same");
  const onSubmit: SubmitHandler<CheckoutForm> = (data) => console.log(data);
  const shippingAddressInfo = useUserShippingAddress();
  const { register, handleSubmit } = useForm<CheckoutForm>({
    defaultValues: {},
  });
  const { setLockNextStepBtnState, currentPage } = useCheckOutUIContext();
  useEffect(() => {
    if (currentPage === 1) setLockNextStepBtnState(false);
  }, [currentPage]);
  return (
    <>
      <Typography variant="h4" component="h1" fontWeight="bold">
        Pengiriman
      </Typography>
      <FormControl className={`w-full [&_.MuiFormGroup-root]:my-4`}>
        <FormGroup>
          <FormLabel>Pilih informasi pengiriman</FormLabel>
          <RadioGroup
            onChange={(e) => {
              setUseDifferentInfo(e.currentTarget.value);
            }}
            value={useDifferentInfo}
          >
            <FormControlLabel
              value={"same"}
              control={<Radio />}
              label="Pakai informasi default"
            />
            <FormControlLabel
              value={"different"}
              control={<Radio />}
              label="Pakai informasi lainnya"
            />
          </RadioGroup>
        </FormGroup>

        <FormGroup>
          <TextField
            type="text"
            label="Pesan kepada penjual"
            multiline
            minRows={3}
            maxRows={6}
            variant="filled"
          />
        </FormGroup>
      </FormControl>
    </>
  );
}
