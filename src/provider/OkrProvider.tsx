import { createContext, ReactElement, useState } from "react";
import { ObjectiveType } from "../types/OkrTypes";

type OkrContextType = {
  objectives: ObjectiveType[] | undefined;
  setObjectives: (objectives: ObjectiveType[]) => void;
};

const OkrContext = createContext<OkrContextType>({
  objectives: undefined,
  setObjectives: () => {},
});

const OkrProvider = ({ children }: { children: ReactElement }) => {
  const [objectives, setObjectives] = useState<ObjectiveType[] | undefined>(
    undefined
  );
  const stateToExpose = {
    objectives,
    setObjectives,
  };

  return (
    <OkrContext.Provider value={stateToExpose}>{children}</OkrContext.Provider>
  );
};

export { OkrContext, OkrProvider };
