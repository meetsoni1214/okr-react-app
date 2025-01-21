import { Objective } from "./types/OkrTypes";
import { PackageOpen } from "lucide-react";

function OkrDisplay({ objectives }: { objectives: Objective[] }) {
  return (
    <div className="border rounded-md border-gray-500 px-4 py-2 mt-4">
      {objectives.length > 0 ? (
        objectives.map((obj, index) => (
          <div key={index}>
            <p className="text-xl font-semibold">{`${index + 1}. ${
              obj.objective
            }`}</p>
            {obj.keyResults.map((keyResult, index) => {
              return (
                <ul key={index}>
                  <li>Title: {keyResult.title}</li>
                  <li>InitialValue: {keyResult.initialValue}</li>
                  <li>CurrentValue: {keyResult.currentValue}</li>
                  <li>TargetValue: {keyResult.targetValue}</li>
                  <li>Metric: {keyResult.metric}</li>
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
