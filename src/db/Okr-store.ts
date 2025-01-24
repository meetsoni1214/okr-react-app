import {InsertObjectiveType, ObjectiveType} from "../types/OkrTypes";

const HTTP_STATUS = {
    not_found: 404
}

async function getOkrsData(): Promise<ObjectiveType[]> {
    const response = await fetch("http://localhost:3000/objectives", {
        method: "GET"
    })
    return await response.json();
}

async function addOkrDataToDb(
    objective: InsertObjectiveType
): Promise<ObjectiveType> {
    const response = await fetch("http://localhost:3000/objectives", {
        method: "POST",
        body: JSON.stringify(objective)
    })
    return await response.json()
}

async function deleteOkrFromDb(_id: string): Promise<ObjectiveType[]> {
    const response = await fetch(`http://localhost:3000/objectives/${_id}`, {
        method: "DELETE",
    })
    if (response.status === HTTP_STATUS.not_found) {
        throw new Error("Objective Not Found!")
    }
    return await response.json();
}

async function updateOkrToDb(updatedOkr: ObjectiveType): Promise<ObjectiveType> {
    const response = await fetch("http://localhost:3000/objectives", {
        method: "PUT",
        body: JSON.stringify(updatedOkr)
    })
    return await response.json()
}


export {getOkrsData, addOkrDataToDb, updateOkrToDb, deleteOkrFromDb};
