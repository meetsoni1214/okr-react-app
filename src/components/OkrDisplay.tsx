import {useContext, useEffect, useState} from "react";
import {KeyResultType, ObjectiveType} from "../types/OkrTypes";
import {CircleX, PackageOpen} from "lucide-react";
import KeyResultInputs from "./KeyResultInputs.tsx";
import KeyResultDisplay from "./KeyResultDisplay.tsx";
import {deleteOkrFromDb, getOkrsData} from "../db/Okr-store.ts"
import {Link} from "react-router-dom";
import {OkrContext} from "../provider/OkrProvider.tsx";

type OkrDisplayProps = {
    setObjectiveToBeUpdated: (objective: ObjectiveType) => void
};

const emptyKeyResult = {
    title: "",
    initialValue: 0,
    currentValue: 0,
    targetValue: 0,
    metric: "",
};


function OkrDisplay({setObjectiveToBeUpdated}: OkrDisplayProps) {

    const {objectives, setObjectives} = useContext(OkrContext);
    useEffect(() => {
        (async () => {
            const objectivesResponse = await getOkrsData();
            setObjectives(objectivesResponse);
        })();
    }, [setObjectives]);

    function handleUpdateObjective(objectiveToBeUpdated: ObjectiveType) {
        setObjectiveToBeUpdated(objectiveToBeUpdated)
    }

    function handleDeleteKeyResult(objIndex: number, krIndex: number) {
        const krs: KeyResultType[] | undefined = objectives
            .find((_, index) => index === objIndex)
            ?.keyResults?.filter((_, index) => index !== krIndex);

        if (krs === undefined) return;

        const objective: ObjectiveType = {
            ...objectives[objIndex],
            keyResults: krs,
        };
        const updatedObjs = objectives.map((obj, ind) => {
            return ind === objIndex ? objective : obj;
        });
        setObjectives(updatedObjs);
    }

    const [isKrModalOpen, setIsKrModalOpen] = useState<boolean>(false);
    const [keyResult, setKeyResult] = useState<KeyResultType>(emptyKeyResult);

    function handleKrChange(name: string, index: number, value: string): void {
        const updatedKr = {...keyResult, [name]: value};
        console.log(index);

        setKeyResult(updatedKr);
    }

    function handleAddKeyResult(objIndex: number) {
        const krs: KeyResultType[] | undefined = objectives.find(
            (_, index) => index === objIndex
        )?.keyResults;

        if (krs === undefined) return;

        krs.push(keyResult);

        const updatedObjective: ObjectiveType = {
            ...objectives[objIndex],
            keyResults: krs,
        };
        const updatedObjs = objectives.map((obj, ind) => {
            return ind === objIndex ? updatedObjective : obj;
        });
        setObjectives(updatedObjs);
        setIsKrModalOpen(false);
        setKeyResult(emptyKeyResult);
    }

    const handleDeleteObjective = async (id: string) => {
        try {
            await deleteOkrFromDb(id);
            setObjectives(objectives.filter((obj) => id !== obj.id))
        } catch (error) {
            alert(error);
        }
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
                                <Link to={`/okrForm/${obj.id}`}>
                                    <button onClick={() => handleUpdateObjective(obj)}
                                            className="bg-gray-500 p-2 text-white rounded-md hover:bg-gray-600">
                                        Update Objective
                                    </button>
                                </Link>

                                <button className="bg-red-500 p-2 text-white rounded-md hover:bg-red-600"
                                        onClick={() => handleDeleteObjective(obj.id)}
                                >
                                    Delete Objective
                                </button>
                                <button
                                    onClick={() => setIsKrModalOpen(true)}
                                    className="bg-blue-500 p-2 text-white rounded-md hover:bg-blue-600"
                                >
                                    Add Key Result
                                </button>
                            </div>
                        </div>
                        {obj.keyResults.map((kr, krIndex) => {
                            return (
                                <div key={krIndex}>
                                    <KeyResultDisplay kr={kr} onClick={() =>
                                        handleDeleteKeyResult(objectiveIndex, krIndex)}/>
                                    {isKrModalOpen && (
                                        <div
                                            className="inset-0 fixed flex bg-gray-500 bg-opacity-50 justify-center items-center">
                                            <div className="bg-white rounded-md p-4 ">
                                                <div className=" flex flex-col gap-2">
                                                    <button
                                                        onClick={() => setIsKrModalOpen(false)}
                                                        className="self-end text-red-500"
                                                    >
                                                        <CircleX/>
                                                    </button>
                                                    <KeyResultInputs index={krIndex} handleChange={handleKrChange}
                                                                     keyResult={keyResult}/>
                                                    <div className="flex justify-between">
                                                        <input
                                                            type="text"
                                                            placeholder="Metric Type"
                                                            name="metric"
                                                            value={keyResult.metric}
                                                            onChange={(e) =>
                                                                handleKrChange(e.target.name, krIndex, e.target.value)
                                                            }
                                                            className="border border-gray-400 px-2 py-1 w-fit focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"
                                                        />
                                                        <button
                                                            onClick={() => handleAddKeyResult(objectiveIndex)}
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
