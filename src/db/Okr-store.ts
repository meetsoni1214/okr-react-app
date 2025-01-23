import { ObjectiveType, InsertObjectiveType } from "../types/OkrTypes";
import { v4 as uuidv4 } from "uuid";

const db = new Map<string, ObjectiveType>();

const defaultObjectives = [
  {
    id: uuidv4(),
    objective: "Hire frontend Developer",
    keyResults: [
      {
        title: "Complete React Course",
        initialValue: 0,
        currentValue: 0,
        targetValue: 100,
        metric: "%",
      },
    ],
  },
];

defaultObjectives.forEach((objective: ObjectiveType) => {
  db.set(objective.id, objective);
});

function getOkrsData(): Promise<ObjectiveType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from(db.values()));
    }, 3000);
  });
}

function addOkrDataToDb(
  objective: InsertObjectiveType
): Promise<ObjectiveType> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const addedObjective = { id: uuidv4(), ...objective };
      db.set(addedObjective.id, addedObjective);
      resolve(addedObjective);
    }, 3000);
  });
}

function updateOkrToDb(id: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const selectedOkr = db.get(id);
      if (selectedOkr === undefined) return;
      const OkrToBeUpdated = {
        id: selectedOkr.id,
        objective: "Hire frontend Developer",
        keyResults: [
          {
            title: "Complete React Course",
            initialValue: 0,
            currentValue: 0,
            targetValue: 100,
            metric: "%",
          },
        ],
      };

      db.set(selectedOkr.id, OkrToBeUpdated);
      resolve();
    }, 3000);
  });
}

export { getOkrsData, addOkrDataToDb, updateOkrToDb };
