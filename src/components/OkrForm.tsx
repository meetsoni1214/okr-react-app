import {useContext, useState} from "react";
import {addOkrDataToDb} from "../db/Okr-store.ts";
import {OkrContext} from "../provider/OkrProvider.tsx";
import {InsertObjectiveType, KeyResultType, ObjectiveType} from "../types/OkrTypes.ts";


export default function OkrForm() {
    const {objectives, setObjectives} = useContext(OkrContext);
    const [objectiveTitle, setObjectiveTitle] = useState<string>("");

    const addObjective = () => {
        if (objectiveTitle === "") return;
        const objectiveToBeAdded: InsertObjectiveType = {
            title: objectiveTitle
        };
        addOkrDataToDb(objectiveToBeAdded).then((result) => {
            const keyResults: KeyResultType[] = result.key_results.map((kr) => {
                const keyResult: KeyResultType = {
                    id: kr.id,
                    title: kr.title,
                    initialValue: kr.initial_value,
                    currentValue: kr.current_value,
                    targetValue: kr.target_value,
                    metric: kr.metric
                };
                return keyResult;
            })

            const objective: ObjectiveType = {
                id: result.id,
                objective: result.title,
                keyResults: keyResults
            }
            setObjectives([...objectives, objective]);
            setObjectiveTitle("");
        });
    }

    return (
        <div className="gap-4 flex flex-col">
            <p className="font-semibold text-2xl">Create Objective Form</p>
            <div className="shadow-md flex flex-col bg-gray-100 p-4 rounded-md">
                <label htmlFor="objective" className="text-lg">
                    Objective Name
                </label>
                <input
                    type="text"
                    id="objective"
                    className="border border-gray-400 mt-2 px-2 py-1 w-full focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"
                    value={objectiveTitle}
                    name="objective"
                    placeholder="Enter objective"
                    onChange={(e) => {
                        setObjectiveTitle(e.target.value);
                    }}
                />
                <button
                    className="bg-green-500 p-2 mt-2 self-center text-white rounded-md hover:bg-green-600"
                    onClick={addObjective}
                >
                    Add objective
                </button>
            </div>
        </div>
    );
}

