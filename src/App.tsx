import { useState } from "react";

function App() {
  const [objectives, setObjectives] = useState<string[]>([]);
  const [newObjective, setNewObjective] = useState<string>("");

  function addObjective() {
    setObjectives([...objectives, newObjective]);
    setNewObjective("");
  }

  return (
    <>
      <div className="border px-4 py-8 space-y-4">
        <div className="space-x-4">
          <input
            type="text"
            className="border p-4"
            value={newObjective }
            placeholder="Enter objective"
            onChange={(e) => {
              setNewObjective(e.target.value);
            }}
          />

          <button
            className="bg-red-500 p-4 text-white rounded-md hover:bg-red-600"
            onClick={addObjective}
          >
            Add objective
          </button>
        </div>
        <div>
          {objectives.length > 0 ? (
            objectives.map((objective) => <p className="hover:text-xl">{objective}</p>)
          ) : (
            <span>Please add an objective</span>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
