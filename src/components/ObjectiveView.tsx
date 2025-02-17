import {
    InsertKeyResultType,
    KeyResultType,
    ObjectiveType,
    UpdateKeyResultType
} from "../types/OkrTypes";
import {useContext, useState} from "react";
import {
    addKeyResultsToDb,
    deleteKeyResultFromDb,
    deleteKeyResultsFromDb,
    deleteOkrFromDb,
    updateKeyResultToDb,
} from "../db/Okr-store.ts";
import {OkrContext} from "../provider/OkrProvider.tsx";
import KeyResultDisplay from "./KeyResultDisplay.tsx";
import AddUpdateKeyResultModal from "./AddUpdateKeyResultModal.tsx";
import UpdateObjectiveModal from "./UpdateObjectiveModal.tsx";
import {toast} from "react-toastify";

type ObjectiveProps = {
    obj: ObjectiveType,
    objectiveIndex: number
};

type IsAddKrModal = {
    objectiveId: number,
    show: boolean
}

type IsUpdateKrModal = {
    objectiveId: number,
    show: boolean
}
const emptyKeyResult = {
    id: -1,
    title: "",
    initialValue: 0,
    currentValue: 0,
    targetValue: 0,
    metric: "",
};

function ObjectiveView({
                           obj,
                           objectiveIndex,
                       }: ObjectiveProps) {

    const {objectives, setObjectives} = useContext(OkrContext);
    const [showAddKrModal, setShowAddKrModal] = useState<IsAddKrModal>({objectiveId: -1, show: false});
    const [showUpdateKrModal, setShowUpdateKrModal] = useState<IsUpdateKrModal>({objectiveId: -1, show: false});
    const [keyResult, setKeyResult] = useState<KeyResultType>(emptyKeyResult);
    const [updateObjectiveId, setUpdateObjectiveId] = useState<number>(-1);
    const [objectiveTitle, setObjectiveTitle] = useState<string>("");

    function handleUpdateObjectiveOnClick(obj: ObjectiveType) {
        setObjectiveTitle(obj.objective);
        setUpdateObjectiveId(obj.id);
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

    async function handleUpdateKeyResult(objectiveId: number) {
        if (keyResult.title === "") {
            toast.error("Key-Result title cannot be empty!", {
                position: "top-right",
                autoClose: 3000
            });
            return;
        }

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
        setShowUpdateKrModal({objectiveId: -1, show: false})
    }

    async function handleAddKeyResult(objId: number) {
        if (keyResult.title === "") {
            toast.error("Key-Result title cannot be empty!", {
                position: "top-right",
                autoClose: 3000
            });
            return;
        }

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
        setKeyResult(emptyKeyResult);
        setShowAddKrModal({objectiveId: -1, show: false});
    }

    return (
        <div className="bg-gray-100 p-4 mt-4 rounded-md" key={obj.id}>
            <div className="flex items-center justify-between mb-4">
                <p className="text-xl  font-semibold">{`${objectiveIndex + 1}. ${
                    obj.objective
                }`}</p>
                <div className="space-x-4">
                    <button onClick={() => handleUpdateObjectiveOnClick(obj)}
                            className="bg-green-500 p-2 text-white rounded-md hover:bg-green-600">
                        Update Objective
                    </button>
                    <button
                        onClick={() => setShowAddKrModal({objectiveId: obj.id, show: true})}
                        className="bg-blue-500 p-2 text-white rounded-md hover:bg-blue-600"
                    >
                        Add Key Result
                    </button>
                    <button className="bg-red-500 p-2 text-white rounded-md hover:bg-red-600"
                            onClick={() => handleDeleteObjective(obj.id)}
                    >
                        Delete Objective
                    </button>

                </div>
            </div>
            {obj.keyResults.map((kr) => {
                return (
                    <div key={kr.id}>
                        <KeyResultDisplay kr={kr}
                                          onUpdateClick={() => {
                                              setKeyResult(kr);
                                              setShowUpdateKrModal({objectiveId: obj.id, show: true})
                                          }}
                                          onDeleteClick={() => handleDeleteKeyResult(obj.id, kr.id)}/>
                        {(showUpdateKrModal.show) && (
                            <AddUpdateKeyResultModal
                                keyResult={keyResult}
                                setKeyResult={setKeyResult}
                                closeModal={() => {
                                    setKeyResult(emptyKeyResult);
                                    setShowUpdateKrModal({objectiveId: -1, show: false});
                                }}
                                onSubmitClick={() => handleUpdateKeyResult(showUpdateKrModal.objectiveId)}
                                btnText="Update" />
                        )}
                    </div>
                );
            })}
            {(updateObjectiveId === obj.id) && (
                <UpdateObjectiveModal
                    objectiveTitle={objectiveTitle}
                    updateObjectiveId={updateObjectiveId}
                    setUpdateObjectiveId={setUpdateObjectiveId}
                    setObjectiveTitle={setObjectiveTitle}
                />
            )}
            {(showAddKrModal.show) && (
                <AddUpdateKeyResultModal
                    btnText="Add"
                    onSubmitClick={() => handleAddKeyResult(showAddKrModal.objectiveId)}
                    closeModal={() => setShowAddKrModal({objectiveId: -1, show: false})}
                    keyResult={keyResult}
                    setKeyResult={setKeyResult}
                />
            )}
        </div>
    );
}

export default ObjectiveView;