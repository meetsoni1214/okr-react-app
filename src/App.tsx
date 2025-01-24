import {useState} from "react";
import OkrForm from "./components/OkrForm";
import OkrDisplay from "./components/OkrDisplay";
import {ObjectiveType} from "./types/OkrTypes.ts";
import {Route, Routes} from "react-router-dom"
import NavBar from "./components/NavBar.tsx";

function App() {

    const [objectiveToBeUpdated, setObjectiveToBeUpdated] = useState<ObjectiveType | null>(null)

    return (
        <div className="flex flex-col">
            <NavBar/>
            <div className="mx-40 mt-20 mb-10">
                <Routes>
                    <Route path="/" element={<>HEELLO INCUBEES!! :)</>}/>
                    <Route path="/okrForm" element={
                        <OkrForm objectiveToBeUpdated={objectiveToBeUpdated}/>
                    }>
                    </Route>
                    <Route path="/okrForm/:id" element={
                        <OkrForm objectiveToBeUpdated={objectiveToBeUpdated}/>
                    }>
                    </Route>
                    <Route path="/displayOkrs" element={<OkrDisplay
                        setObjectiveToBeUpdated={setObjectiveToBeUpdated}
                    />}>
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
