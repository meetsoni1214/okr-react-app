import { useState } from "react";
import { KeyResultType, ObjectiveType } from "../types/OkrTypes";
import { addOkrDataToDb } from "../db/Okr-store";

type OkrFormProps = {
  objectives: ObjectiveType[];
  setObjectives: (objectives: ObjectiveType[]) => void;
};

const initialKeyResults = [
  {
    title: "",
    initialValue: 0,
    currentValue: 0,
    targetValue: 0,
    metric: "",
  },
];

export default function OkrForm({ objectives, setObjectives }: OkrFormProps) {
  const [newObjective, setNewObjective] = useState<string>("");
  const [keyResults, setKeyResults] =
    useState<KeyResultType[]>(initialKeyResults);

  function addObjective() {
    const objectiveToBeAdded = { objective: newObjective, keyResults };
    addOkrDataToDb(objectiveToBeAdded).then(() => {
      setObjectives([...objectives, objectiveToBeAdded]);
      console.log(objectives);
      setNewObjective("");
      setKeyResults(initialKeyResults);
    });
  }

  function handleChange(name: string, index: number, value: string): void {
    console.log(keyResults);
    const krToBeUpdated = keyResults[index];

    keyResults[index] = { ...krToBeUpdated, [name]: value };
    setKeyResults([...keyResults]);
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
            <div
              key={index}
              className=" bg-gray-100 shadow-md p-4 rounded-md flex flex-col gap-2 mt-4"
            >
              <input
                type="text"
                placeholder="Key result title"
                value={keyResult.title}
                name="title"
                onChange={(e) =>
                  handleChange(e.target.name, index, e.target.value)
                }
                className="border border-gray-400 px-2 py-1 focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Intial Value"
                  name="initialValue"
                  value={keyResult.initialValue}
                  onChange={(e) =>
                    handleChange(e.target.name, index, e.target.value)
                  }
                  className="border border-gray-400 w-full px-2 py-1 focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"
                />
                <input
                  type="number"
                  placeholder="Current Value"
                  value={keyResult.currentValue}
                  name="currentValue"
                  onChange={(e) =>
                    handleChange(e.target.name, index, e.target.value)
                  }
                  className="border border-gray-400 px-2 py-1 w-full focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"
                />
                <input
                  type="number"
                  placeholder="Target Value"
                  value={keyResult.targetValue}
                  name="targetValue"
                  onChange={(e) =>
                    handleChange(e.target.name, index, e.target.value)
                  }
                  className="border border-gray-400 px-2 py-1 w-full focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"
                />
              </div>
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
                  onClick={() => deleteKeyResult(index)}
                >
                  Delete
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
          onClick={addObjective}
        >
          Add objective
        </button>
      </div>
    </div>
  );
}
