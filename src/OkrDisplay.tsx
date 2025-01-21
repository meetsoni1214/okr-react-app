import { KeyResultType, Objective } from "./types/OkrTypes";
import { PackageOpen } from "lucide-react";

type OkrDisplayProps = {
  objectives: Objective[];
  setObjectives: (objectives: Objective[]) => void;
};

function OkrDisplay({ objectives, setObjectives }: OkrDisplayProps) {
  function handleDeleteKeyResult(objIndex: number, krIndex: number) {
    const krs: KeyResultType[] | undefined = objectives
      .find((_, index) => index === objIndex)
      ?.keyResults?.filter((_, index) => index !== krIndex);

    if (krs === undefined) return;

    const objective: Objective = { ...objectives[objIndex], keyResults: krs };
    const updatedObjs = objectives.map((obj, ind) => {
      return ind === objIndex ? objective : obj;
    });
    setObjectives(updatedObjs);
  }

  return (
    <div className="border rounded-md border-gray-500 p-4 mt-4">
      {objectives.length > 0 ? (
        objectives.map((obj, objectiveIndex) => (
          <div className="bg-gray-100 p-4 rounded-md" key={objectiveIndex}>
            <p className="text-xl mb-4 font-semibold">{`${
              objectiveIndex + 1
            }. ${obj.objective}`}</p>
            {obj.keyResults.map((keyResult, krIndex) => {
              return (
                <ul className="bg-white p-4 mb-2.5 rounded-md" key={krIndex}>
                  <li>Title: {keyResult.title}</li>
                  <li>InitialValue: {keyResult.initialValue}</li>
                  <li>CurrentValue: {keyResult.currentValue}</li>
                  <li>TargetValue: {keyResult.targetValue}</li>
                  <li>Metric: {keyResult.metric}</li>
                  <button
                    onClick={() =>
                      handleDeleteKeyResult(objectiveIndex, krIndex)
                    }
                    className="bg-red-400 p-2 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </ul>
              );
            })}
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center opacity-60 ">
          <PackageOpen size={80} />
          <span>Please add an Objective</span>
        </div>
      )}
    </div>
  );
}

export default OkrDisplay;
