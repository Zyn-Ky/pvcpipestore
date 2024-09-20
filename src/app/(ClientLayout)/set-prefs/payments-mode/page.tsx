import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";

export default function PaymentProcessorSelector() {
  return (
    <ProtectedHiddenDevelopmentComponent
      fallback={
        <>
          <p className="text-left font-bold text-3xl">
            Halaman ini sedang dalam rekonstruksi besar-besaran
          </p>
        </>
      }
    >
      <h1>Pilih Metode Pembayaran</h1>
    </ProtectedHiddenDevelopmentComponent>
  );
}
