import { useState } from "react";
import { Objective } from "./types/OkrTypes";
import OkrForm from "./OkrForm";
import OkrDisplay from "./OkrDisplay";

function App() {
  const [objectives, setObjectives] = useState<Objective[]>([]);

  return (
    <div className="mx-40 mt-10 mb-10">
      <OkrForm objectives={objectives} setObjectives={setObjectives} />
      <OkrDisplay objectives={objectives} />
    </div>
  );
}

export default App;
