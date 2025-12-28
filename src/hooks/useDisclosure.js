import { useState, useMemo } from "react";

const useDisclosure = (initialState = false) => {
  const [isOpen, setOpen] = useState(initialState);

  const actions = useMemo(
    () => ({
      close: () => setOpen(false),
      open: () => setOpen(true),
      toggle: () => setOpen((isOpen) => !isOpen),
    }),
    []
  );

  return { isOpen, ...actions };
};

export default useDisclosure;
