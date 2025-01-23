import { useContext, useEffect, useState } from "react";
import OkrForm from "./components/OkrForm";
import OkrDisplay from "./components/OkrDisplay";
import { getOkrsData } from "./db/Okr-store";
import { OkrContext } from "./provider/OkrProvider";

function App() {
  // const [objectives, setObjectives] = useState<ObjectiveType[] | undefined>(
  //   undefined
  // );
  const { objectives, setObjectives } = useContext(OkrContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const objectivesResponse = await getOkrsData();
      setIsLoading(false);
      setObjectives(objectivesResponse);
    })();
  }, []);

  console.log({ objectives });

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
