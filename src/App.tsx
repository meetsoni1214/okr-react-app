import { useEffect, useState } from "react";
import { ObjectiveType } from "./types/OkrTypes";
import OkrForm from "./components/OkrForm";
import OkrDisplay from "./components/OkrDisplay";
import { getOkrsData } from "./db/Okr-store";

function App() {
  const [objectives, setObjectives] = useState<ObjectiveType[] | undefined>(
    undefined
  );
  const isLoading: boolean = objectives === undefined;

  useEffect(() => {
    (async () => {
      const objectivesResponse = await getOkrsData();
      setObjectives(objectivesResponse);
    })();
  }, []);

  return (
    <div className="mx-40 mt-10 mb-10">
      <OkrForm objectives={objectives ?? []} setObjectives={setObjectives} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <OkrDisplay
          objectives={objectives ?? []}
          setObjectives={setObjectives}
        />
      )}
    </div>
  );
}

export default App;
