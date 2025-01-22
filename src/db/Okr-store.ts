import { ObjectiveType } from "../types/OkrTypes";

type initialObjective = ObjectiveType & {
  id: number;
};

let dbIndex = 0;
const db = new Map<number, ObjectiveType>();

const defaultObjectives = [
  {
    id: dbIndex++,
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

defaultObjectives.forEach((objective: initialObjective) => {
  db.set(objective.id, objective);
});

function getOkrsData(): Promise<ObjectiveType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from(db.values()));
    }, 3000);
  });
}

function addOkrDataToDb(objective: ObjectiveType): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      db.set(dbIndex++, objective);
      resolve();
    }, 3000);
  });
}

export { getOkrsData, addOkrDataToDb };
