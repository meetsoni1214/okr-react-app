import {useContext, useEffect} from "react";
import OkrForm from "./components/OkrForm";
import OkrDisplay from "./components/OkrDisplay";
import {getOkrsData} from "./db/Okr-store";
import {OkrContext} from "./provider/OkrProvider";

function App() {
    const {objectives, setObjectives} = useContext(OkrContext);
    const isLoading = objectives === undefined;

    useEffect(() => {
        (async () => {
            const objectivesResponse = await getOkrsData();
            setObjectives(objectivesResponse);
        })();
    }, [setObjectives]);

    console.log({objectives});

    return (
        <div className="mx-40 mt-10 mb-10">
            <OkrForm objectives={objectives ?? []} setObjectives={setObjectives}/>
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
