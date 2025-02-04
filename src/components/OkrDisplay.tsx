import {useContext, useEffect, useState} from "react";
import {
    InsertKeyResultType,
    InsertObjectiveType,
    KeyResultType,
    ObjectiveType,
    UpdateKeyResultType
} from "../types/OkrTypes";
import {CircleX, PackageOpen} from "lucide-react";
import KeyResultInputs from "./KeyResultInputs.tsx";
import KeyResultDisplay from "./KeyResultDisplay.tsx";
import {
    addKeyResultsToDb,
    deleteKeyResultFromDb,
    deleteKeyResultsFromDb,
    deleteOkrFromDb,
    getOkrsData, updateKeyResultToDb,
    updateOkrToDb
} from "../db/Okr-store.ts"
import {OkrContext} from "../provider/OkrProvider.tsx";

const emptyKeyResult = {
    id: -1,
    title: "",
    initialValue: 0,
    currentValue: 0,
    targetValue: 0,
    metric: "",
};


function OkrDisplay() {


    const {objectives, setObjectives} = useContext(OkrContext);
    const [selectedObjectiveId, setSelectedObjectiveId] = useState<number>(-1);
    const [updateObjectiveId, setUpdateObjectiveId] = useState<number>(-1);
    const [keyResult, setKeyResult] = useState<KeyResultType>(emptyKeyResult);
    const [objectiveTitle, setObjectiveTitle] = useState<string>("");

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

    async function handleDeleteKeyResult(objId: number, krId: number) {
        await deleteKeyResultFromDb(krId);
        const objectiveToBeUpdated: ObjectiveType | undefined = objectives.find(
            (objective) => objective.id === objId
        );
        if (objectiveToBeUpdated === undefined) return;

        const krs: KeyResultType[] = objectiveToBeUpdated.keyResults.filter((kr) => kr.id !== krId);

        const objective: ObjectiveType = {
            ...objectiveToBeUpdated,
            keyResults: krs,
        };
        const updatedObjs = objectives.map((obj) => {
            return obj.id === objId ? objective : obj;
        });
        setObjectives(updatedObjs);
    }

    async function handleUpdateObjective(id: number) {
        const updatedObjective: InsertObjectiveType = {
            title: objectiveTitle
        };
        await updateOkrToDb(updatedObjective, id);
        const objectiveToBeUpdated = objectives.find((obj) => obj.id === id);
        if (objectiveToBeUpdated === undefined) return;
        const objectiveToBeAdded = {
            ...objectiveToBeUpdated,
            objective: objectiveTitle
        };
        const newObjs = objectives.map((obj) => {
            return (obj.id === id) ? objectiveToBeAdded : obj;
        })
        setObjectives(newObjs);
        setUpdateObjectiveId(-1);
        setObjectiveTitle("");
    }

    function handleKrChange(name: string, value: string): void {
        const updatedKr = {...keyResult, [name]: value};
        setKeyResult(updatedKr);
    }

    async function handleAddKeyResult(objId: number) {
        const keyResultToBeAdded: InsertKeyResultType = {
            title: keyResult.title,
            initial_value: Number(keyResult.initialValue),
            current_value: Number(keyResult.currentValue),
            target_value: Number(keyResult.targetValue),
            metric: keyResult.metric,
            objective_id: objId
        }
        await addKeyResultsToDb([keyResultToBeAdded]);
        const objectiveToBeUpdated: ObjectiveType | undefined = objectives.find(
            (objective) => objective.id === objId
        );

        if (objectiveToBeUpdated === undefined) return;

        const krs: KeyResultType[] = objectiveToBeUpdated.keyResults;
        krs.push(keyResult);
        const updatedObjective: ObjectiveType = {
            ...objectiveToBeUpdated,
            keyResults: krs,
        };
        const updatedObjs = objectives.map((obj) => {
            return obj.id === objId ? updatedObjective : obj;
        });
        setObjectives(updatedObjs);
        setSelectedObjectiveId(-1);
        setKeyResult(emptyKeyResult);
    }

    const handleDeleteObjective = async (id: number) => {
        try {
            await deleteKeyResultsFromDb(id);
            await deleteOkrFromDb(id);
            setObjectives(objectives.filter((obj) => id !== obj.id))
        } catch (error) {
            alert(error);
        }
    }

    function handleUpdateObjectiveOnClick(obj: ObjectiveType) {
        setObjectiveTitle(obj.objective);
        setUpdateObjectiveId(obj.id);
    }

    async function handleUpdateKeyResult(objectiveId: number) {
        const kr: UpdateKeyResultType = {
            title: keyResult.title,
            current_value: Number(keyResult.currentValue),
            target_value: Number(keyResult.targetValue),
            initial_value: Number(keyResult.initialValue),
            metric: keyResult.metric
        };
        await updateKeyResultToDb(kr, keyResult.id);

        const objectiveToBeUpdated = objectives.find((obj) => obj.id === objectiveId);

        if (objectiveToBeUpdated === undefined) return;

        const updatedKrs = objectiveToBeUpdated.keyResults.map((kr) => {
            return kr.id === keyResult.id ? keyResult : kr;
        });
        const updatedObjective: ObjectiveType = {...objectiveToBeUpdated, keyResults: updatedKrs};

        const updatedObjectives = objectives.map((obj) => {
            return obj.id === objectiveId ? updatedObjective : obj;
        });
        setObjectives(updatedObjectives);
        setKeyResult(emptyKeyResult);
    }

    return (
        <div className="border rounded-md border-gray-500 p-4 mt-4">
            {objectives.length > 0 ? (
                objectives.map((obj, objectiveIndex) => (
                    <div className="bg-gray-100 p-4 mt-4 rounded-md" key={obj.id}>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-xl  font-semibold">{`${objectiveIndex + 1}. ${
                                obj.objective
                            }`}</p>
                            <div className="space-x-4">
                                <button onClick={() => handleUpdateObjectiveOnClick(obj)}
                                        className="bg-gray-500 p-2 text-white rounded-md hover:bg-gray-600">
                                    Update Objective
                                </button>
                                <button className="bg-red-500 p-2 text-white rounded-md hover:bg-red-600"
                                        onClick={() => handleDeleteObjective(obj.id)}
                                >
                                    Delete Objective
                                </button>
                                <button
                                    onClick={() => setSelectedObjectiveId(obj.id)}
                                    className="bg-blue-500 p-2 text-white rounded-md hover:bg-blue-600"
                                >
                                    Add Key Result
                                </button>
                            </div>
                        </div>
                        {obj.keyResults.map((kr) => {
                            return (
                                <div key={kr.id}>
                                    <KeyResultDisplay kr={kr}
                                                      onUpdateClick={() => setKeyResult(kr)}
                                                      onDeleteClick={() => handleDeleteKeyResult(obj.id, kr.id)}/>
                                    {(keyResult.id === kr.id) && (
                                        <div
                                            className="inset-0 fixed flex bg-gray-500 bg-opacity-50 justify-center items-center">
                                            <div className="bg-white rounded-md p-4 ">
                                                <div className=" flex flex-col gap-2">
                                                    <button
                                                        onClick={() => setKeyResult(emptyKeyResult)}
                                                        className="self-end text-red-500"
                                                    >
                                                        <CircleX/>
                                                    </button>
                                                    <KeyResultInputs handleChange={handleKrChange}
                                                                     keyResult={keyResult}/>
                                                    <div className="flex justify-between">
                                                        <input
                                                            type="text"
                                                            placeholder="Metric Type"
                                                            name="metric"
                                                            value={keyResult.metric}
                                                            onChange={(e) =>
                                                                handleKrChange(e.target.name, e.target.value)
                                                            }
                                                            className="border border-gray-400 px-2 py-1 w-fit focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"
                                                        />
                                                        <button
                                                            onClick={() => handleUpdateKeyResult(obj.id)}
                                                            className="bg-blue-500 px-2 py-1 self-center text-white rounded-md hover:bg-blue-600"
                                                        >
                                                            Add
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        {(updateObjectiveId === obj.id) && (
                            <div
                                className="inset-0 fixed flex bg-gray-500 bg-opacity-50 justify-center items-center">
                                <div className="bg-white rounded-md p-4 ">
                                    <div className=" flex flex-col gap-2">
                                        <button
                                            onClick={() => setUpdateObjectiveId(-1)}
                                            className="self-end text-red-500"
                                        >
                                            <CircleX/>
                                        </button>
                                        <input
                                            type="text"
                                            placeholder="Objective title"
                                            name="metric"
                                            value={objectiveTitle}
                                            onChange={(e) => setObjectiveTitle(e.target.value)}
                                            className="border border-gray-400 px-2 py-1 w-fit focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"
                                        />
                                        <button
                                            onClick={() => handleUpdateObjective(updateObjectiveId)}
                                            className="bg-blue-500 px-2 py-1 self-center text-white rounded-md hover:bg-blue-600"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                        }
                        {(selectedObjectiveId === obj.id) && (
                            <div
                                className="inset-0 fixed flex bg-gray-500 bg-opacity-50 justify-center items-center">
                                <div className="bg-white rounded-md p-4 ">
                                    <div className=" flex flex-col gap-2">
                                        <button
                                            onClick={() => setSelectedObjectiveId(-1)}
                                            className="self-end text-red-500"
                                        >
                                            <CircleX/>
                                        </button>
                                        <KeyResultInputs handleChange={handleKrChange}
                                                         keyResult={keyResult}/>
                                        <div className="flex justify-between">
                                            <input
                                                type="text"
                                                placeholder="Metric Type"
                                                name="metric"
                                                value={keyResult.metric}
                                                onChange={(e) =>
                                                    handleKrChange(e.target.name, e.target.value)
                                                }
                                                className="border border-gray-400 px-2 py-1 w-fit focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"
                                            />
                                            <button
                                                onClick={() => handleAddKeyResult(selectedObjectiveId)}
                                                className="bg-blue-500 px-2 py-1 self-center text-white rounded-md hover:bg-blue-600"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
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
