import {useContext, useState} from "react";
import {addOkrDataToDb} from "../db/Okr-store.ts";
import {OkrContext} from "../provider/OkrProvider.tsx";
import {InsertObjectiveType, KeyResultType, ObjectiveType} from "../types/OkrTypes.ts";

// type OkrFormProps = {
//     objectiveToBeUpdated: ObjectiveType | null
// };

export default function OkrForm() {
    const {objectives, setObjectives} = useContext(OkrContext);
    const [objectiveTitle, setObjectiveTitle] = useState<string>("");
    // const [keyResults, setKeyResults] =
    //     useState<KeyResultType[]>(initialKeyResults);

    // const isUpdateObjectiveNotAvailable = (objectiveToBeUpdated === null);

    // useEffect(() => {
    //     if (!isUpdateObjectiveNotAvailable) {
    //         console.log(objectiveToBeUpdated);
    //         setNewObjective(objectiveToBeUpdated.objective)
    //         setKeyResults(objectiveToBeUpdated.keyResults)
    //     }
    // }, [objectiveToBeUpdated]);

    function addObjective() {
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
            // setKeyResults([
            //     {
            //         title: "",
            //         initialValue: 0,
            //         currentValue: 0,
            //         targetValue: 0,
            //         metric: "",
            //     },
            // ]);
        });
    }

    // function updateObjective() {
    //     if (!objectiveToBeUpdated) return
    //     const updatedObjective = {
    //         id: objectiveToBeUpdated?.id,
    //         objective: objectiveTitle,
    //         keyResults,
    //     };
    //     updateOkrToDb(updatedObjective).then((result) => {
    //         const updatedObjectives = objectives.map((obj) => obj.id === result.id ? result : obj)
    //         setObjectives(updatedObjectives);
    //         setNewObjective("");
    //         setKeyResults([
    //             {
    //                 title: "",
    //                 initialValue: 0,
    //                 currentValue: 0,
    //                 targetValue: 0,
    //                 metric: "",
    //             },
    //         ]);
    //     })
    // }


    // function addKeyResult() {
    //     setKeyResults([
    //         ...keyResults,
    //         {
    //             title: "",
    //             initialValue: 0,
    //             targetValue: 0,
    //             currentValue: 0,
    //             metric: "",
    //         },
    //     ]);
    // }

    // function handleChange(name: string, index: number, value: string): void {
    //     const krToBeUpdated = keyResults[index];
    //
    //     keyResults[index] = {...krToBeUpdated, [name]: value};
    //     setKeyResults([...keyResults]);
    // }
    //
    // function deleteKeyResult(index: number) {
    //     const updatedKeyResults = keyResults.filter((_, idx) => idx !== index);
    //     setKeyResults(updatedKeyResults);
    // }

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

                {/*<div>*/}
                {/*    <p className="text-xl">Key results</p>*/}
                {/*    {keyResults.map((keyResult, index) => (*/}
                {/*        <div key={index} className=" bg-gray-100 shadow-md p-4 rounded-md flex flex-col gap-2 mt-4"*/}
                {/*        >*/}
                {/*            <KeyResultInputs keyResult={keyResult} index={index} handleChange={handleChange}/>*/}
                {/*            <div className="flex justify-between">*/}
                {/*                <input*/}
                {/*                    type="text"*/}
                {/*                    placeholder="Metric Type"*/}
                {/*                    name="metric"*/}
                {/*                    value={keyResult.metric}*/}
                {/*                    onChange={(e) =>*/}
                {/*                        handleChange(e.target.name, index, e.target.value)*/}
                {/*                    }*/}
                {/*                    className="border border-gray-400 px-2 py-1 w-fit focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"*/}
                {/*                />*/}
                {/*                <button*/}
                {/*                    className="bg-red-500 p-2 self-center text-white rounded-md hover:bg-red-600"*/}
                {/*                    onClick={() => deleteKeyResult(index)}>Delete*/}
                {/*                </button>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    ))}*/}

                {/*    <button*/}
                {/*        className="bg-blue-500 mt-4 p-2 self-center text-white rounded-md hover:bg-blue-600"*/}
                {/*        onClick={addKeyResult}*/}
                {/*    >*/}
                {/*        Add Key Result*/}
                {/*    </button>*/}
                {/*</div>*/}

            </div>
        </div>
    );
}

// const initialKeyResults = [
//     {
//         title: "",
//         initialValue: 0,
//         currentValue: 0,
//         targetValue: 0,
//         metric: "",
//     },
// ];
