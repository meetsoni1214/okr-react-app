import {createContext, ReactElement, useState} from "react";
import {ObjectiveType} from "../types/OkrTypes";

type OkrContextType = {
    objectives: ObjectiveType[];
    setObjectives: (objectives: ObjectiveType[]) => void;
};

const OkrContext = createContext<OkrContextType>({
    objectives: [],
    setObjectives: () => {
    },
});

const OkrProvider = ({children}: { children: ReactElement }) => {
    const [objectives, setObjectives] = useState<ObjectiveType[]>([]);
    const stateToExpose = {
        objectives,
        setObjectives,
    };

    return (
        <OkrContext.Provider value={stateToExpose}>{children}</OkrContext.Provider>
    );
};

export {OkrContext, OkrProvider};
