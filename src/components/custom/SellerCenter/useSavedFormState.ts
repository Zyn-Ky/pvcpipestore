import { useState } from "react";

export default function useSavedFormState() {
  const [currentFormState, setCurrentFormState] = useState();

  return {
    currentState: {},
  };
}
