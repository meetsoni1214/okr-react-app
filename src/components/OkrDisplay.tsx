import {useContext, useEffect} from "react";
import {
    KeyResultType,
    ObjectiveType,
} from "../types/OkrTypes";
import { PackageOpen} from "lucide-react";
import {
    getOkrsData,
} from "../db/Okr-store.ts"
import {OkrContext} from "../provider/OkrProvider.tsx";
import ObjectiveView from "./ObjectiveView.tsx";


function OkrDisplay() {

    const {objectives, setObjectives} = useContext(OkrContext);

    useEffect(() => {
        (async () => {
            const objectivesResponse = await getOkrsData();
            const objectives = objectivesResponse.map((obj) => {
                const keyResults: KeyResultType[] = obj.key_results.map((kr) => {
                    const keyResult: KeyResultType = {
                        id: kr.id,
                        title: kr.title,
                        initialValue: kr.initial_value,
                        currentValue: kr.current_value,
                        targetValue: kr.target_value,
                        metric: kr.metric
                    }
                    return keyResult;
                });
                const objective: ObjectiveType = {
                    id: obj.id,
                    objective: obj.title,
                    keyResults: keyResults
                };
                return objective;
            })
            setObjectives(objectives);
        })();
    }, [setObjectives]);

    return (
            <div>
            {objectives.length > 0 ? (
                objectives.map((obj, objectiveIndex) => (
                    <ObjectiveView key={obj.id} obj={obj} objectiveIndex={objectiveIndex} />
                ))
            ) : (
                <div className="flex flex-col items-center justify-center opacity-60 ">
                    <PackageOpen size={80}/>
                    <span>Please add an Objective</span>
                </div>
            )}
            </div>
    );
}

export default OkrDisplay;
