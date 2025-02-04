import {InsertKeyResultType, InsertObjectiveType, ObjectiveResponseType, UpdateKeyResultType} from "../types/OkrTypes";

const HTTP_STATUS = {
    not_found: 404
}

async function getOkrsData(): Promise<ObjectiveResponseType[]> {
    const response = await fetch("http://localhost:3001/objectives/", {
        method: "GET"
    });
    return await response.json();
}

async function addOkrDataToDb(
    objective: InsertObjectiveType
): Promise<ObjectiveResponseType> {
    const response = await fetch("http://localhost:3001/objectives/", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(objective)
    });
    return await response.json();
}

async function deleteOkrFromDb(_id: number): Promise<void>{
    const response = await fetch(`http://localhost:3001/objectives/${_id}`, {
        method: "DELETE",
    })
    if (response.status === HTTP_STATUS.not_found) {
        throw new Error("Objective Not Found!")
    }
    return await response.json();
}

async function updateOkrToDb(updatedOkr: InsertObjectiveType, id: number): Promise<void> {
    const response = await fetch(`http://localhost:3001/objectives/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(updatedOkr)
    })
    await response.json()
}

async function updateKeyResultToDb(updatedKeyResult: UpdateKeyResultType, id: number): Promise<void> {
    const response = await fetch(`http://localhost:3001/key-results/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(updatedKeyResult)
    });
    await response.json();
}

async function addKeyResultsToDb(keyResults: InsertKeyResultType[]): Promise<void> {
    const response = await fetch(`http://localhost:3001/key-results/`, {
        method: "POST",
        body: JSON.stringify(keyResults)
    })
    await response.json();
}

async function deleteKeyResultFromDb(id: number): Promise<void> {
    const response = await fetch(`http://localhost:3001/key-results/${id}`, {
        method: "DELETE",
    })
    if (response.status === HTTP_STATUS.not_found) {
        throw new Error("Key Result Not Found!")
    }
    await response.json();
}

async function deleteKeyResultsFromDb(objective_id: number): Promise<void> {
    const response = await fetch(`http://localhost:3001/key-results/delete-all/${objective_id}`, {
        method: "DELETE",
    })
    if (response.status === HTTP_STATUS.not_found) {
        throw new Error("Key Results Not Found!")
    }
    await response.json();
}

export {getOkrsData, addOkrDataToDb, updateOkrToDb, deleteOkrFromDb, addKeyResultsToDb, deleteKeyResultFromDb, deleteKeyResultsFromDb, updateKeyResultToDb};
