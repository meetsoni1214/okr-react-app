import {CircleX} from "lucide-react";
import {InsertObjectiveType} from "../types/OkrTypes.ts";
import {updateOkrToDb} from "../db/Okr-store.ts";
import {useContext} from "react";
import {OkrContext} from "../provider/OkrProvider.tsx";

type UpdateObjectiveModalProps = {
    objectiveTitle: string,
    updateObjectiveId: number,
    setObjectiveTitle: (title: string) => void,
    setUpdateObjectiveId: (id: number) => void
}

function UpdateObjectiveModal(
    {
        objectiveTitle,
        updateObjectiveId,
        setObjectiveTitle,
        setUpdateObjectiveId
    }: UpdateObjectiveModalProps
) {

    const {objectives, setObjectives} = useContext(OkrContext);

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
    return (
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
    );
}

export default UpdateObjectiveModal;