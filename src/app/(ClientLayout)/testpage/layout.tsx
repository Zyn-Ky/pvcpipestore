import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import IsComingSoonSSR from "@/libs/firebase/comingSoonChecker";

export default async function DevGuardian(props: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedHiddenDevelopmentComponent>
      {props.children && props.children}
    </ProtectedHiddenDevelopmentComponent>
  );
}
