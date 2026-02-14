import { useCallback, useState } from "react";

// ! Again and again AI generated code is not good, no need to make type for return, after returning data
// ! it automatically generates the type for return, so no need to make it yourself.
// type UseToggleReturn = {
//   isOpen: boolean;
//   open: () => void;
//   close: () => void;
//   toggle: () => void;
// };

const useToggle = (initialState = false) => {
  const [value, setValue] = useState(initialState);

  const toggle = useCallback(
    (paramValue?: boolean) => setValue((prev) => paramValue ?? !prev),
    [],
  );

  return [value, toggle] as const;
};

export default useToggle;
