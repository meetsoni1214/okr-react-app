import {useContext, useEffect, useState} from "react";
import {KeyResultType, ObjectiveType} from "../types/OkrTypes";
import {addOkrDataToDb, updateOkrToDb} from "../db/Okr-store.ts";
import KeyResultInputs from "./KeyResultInputs.tsx";
import {OkrContext} from "../provider/OkrProvider.tsx";

type OkrFormProps = {
    objectiveToBeUpdated: ObjectiveType | null
};

export default function OkrForm({objectiveToBeUpdated}: OkrFormProps) {
    const {objectives, setObjectives} = useContext(OkrContext);
    const [newObjective, setNewObjective] = useState<string>("");
    const [keyResults, setKeyResults] =
        useState<KeyResultType[]>(initialKeyResults);

    const isUpdateObjectiveNotAvailable = (objectiveToBeUpdated === null);

    useEffect(() => {
        if (!isUpdateObjectiveNotAvailable) {
            console.log(objectiveToBeUpdated);
            setNewObjective(objectiveToBeUpdated.objective)
            setKeyResults(objectiveToBeUpdated.keyResults)
        }
    }, [objectiveToBeUpdated]);

    function addObjective() {
        const objectiveToBeAdded = {
            objective: newObjective,
            keyResults,
        };
        addOkrDataToDb(objectiveToBeAdded).then((result) => {
            setObjectives([...objectives, result]);
            setNewObjective("");
            setKeyResults([
                {
                    title: "",
                    initialValue: 0,
                    currentValue: 0,
                    targetValue: 0,
                    metric: "",
                },
            ]);
        });
    }

    function updateObjective() {
        if (!objectiveToBeUpdated) return
        const updatedObjective = {
            id: objectiveToBeUpdated?.id,
            objective: newObjective,
            keyResults,
        };
        updateOkrToDb(updatedObjective).then((result) => {
            const updatedObjectives = objectives.map((obj) => obj.id === result.id ? result : obj)
            setObjectives(updatedObjectives);
            setNewObjective("");
            setKeyResults([
                {
                    title: "",
                    initialValue: 0,
                    currentValue: 0,
                    targetValue: 0,
                    metric: "",
                },
            ]);
        })
    }


    function addKeyResult() {
        setKeyResults([
            ...keyResults,
            {
                title: "",
                initialValue: 0,
                targetValue: 0,
                currentValue: 0,
                metric: "",
            },
        ]);
    }

    function handleChange(name: string, index: number, value: string): void {
        const krToBeUpdated = keyResults[index];

        keyResults[index] = {...krToBeUpdated, [name]: value};
        setKeyResults([...keyResults]);
    }

    function deleteKeyResult(index: number) {
        const updatedKeyResults = keyResults.filter((_, idx) => idx !== index);
        setKeyResults(updatedKeyResults);
    }

    return (
        <div className="border mb-2 rounded-md border-gray-500 px-4 py-8 space-y-4">
            <div className="gap-4 flex flex-col">
                <p className="font-semibold text-2xl">Create Objective Form</p>
                <div className="shadow-md bg-gray-100 p-4 rounded-md">
                    <label htmlFor="objective" className="text-lg">
                        Objective Name
                    </label>
                    <input
                        type="text"
                        id="objective"
                        className="border border-gray-400 mt-2 px-2 py-1 w-full focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"
                        value={newObjective}
                        name="objective"
                        placeholder="Enter objective"
                        onChange={(e) => {
                            setNewObjective(e.target.value);
                        }}
                    />
                </div>

                <div>
                    <p className="text-xl">Key results</p>
                    {keyResults.map((keyResult, index) => (
                        <div key={index} className=" bg-gray-100 shadow-md p-4 rounded-md flex flex-col gap-2 mt-4"
                        >
                            <KeyResultInputs keyResult={keyResult} index={index} handleChange={handleChange}/>
                            <div className="flex justify-between">
                                <input
                                    type="text"
                                    placeholder="Metric Type"
                                    name="metric"
                                    value={keyResult.metric}
                                    onChange={(e) =>
                                        handleChange(e.target.name, index, e.target.value)
                                    }
                                    className="border border-gray-400 px-2 py-1 w-fit focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"
                                />
                                <button
                                    className="bg-red-500 p-2 self-center text-white rounded-md hover:bg-red-600"
                                    onClick={() => deleteKeyResult(index)}>Delete
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        className="bg-blue-500 mt-4 p-2 self-center text-white rounded-md hover:bg-blue-600"
                        onClick={addKeyResult}
                    >
                        Add Key Result
                    </button>
                </div>
                <button
                    className="bg-green-500 p-2 self-center text-white rounded-md hover:bg-green-600"
                    onClick={isUpdateObjectiveNotAvailable ? addObjective : updateObjective}
                >
                    {isUpdateObjectiveNotAvailable ? "Add objective" : "Update Objective"}
                </button>
            </div>
        </div>
    );
}

const initialKeyResults = [
    {
        title: "",
        initialValue: 0,
        currentValue: 0,
        targetValue: 0,
        metric: "",
    },
];
