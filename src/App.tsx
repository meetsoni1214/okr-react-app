import OkrForm from "./components/OkrForm";
import OkrDisplay from "./components/OkrDisplay";
import {Route, Routes} from "react-router-dom"
import NavBar from "./components/NavBar.tsx";

function App() {


    return (
        <div className="flex flex-col">
            <NavBar/>
            <div className="mx-40 mt-20 mb-10">
                <Routes>
                    <Route path="/" element={<>HEELLO INCUBEES!! :)</>}/>
                    <Route path="/okrForm" element={
                        <OkrForm />
                    }>
                    </Route>
                    <Route path="/okrForm/:id" element={
                        <OkrForm />
                    }>
                    </Route>
                    <Route path="/displayOkrs" element={<OkrDisplay />}>
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
