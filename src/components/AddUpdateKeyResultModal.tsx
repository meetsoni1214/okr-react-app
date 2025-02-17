import {CircleX} from "lucide-react";
import KeyResultInputs from "./KeyResultInputs.tsx";
import {KeyResultType} from "../types/OkrTypes.ts";
import {ToastContainer} from "react-toastify";

type KeyResultModalProps = {
    closeModal: () => void,
    onSubmitClick: () => void,
    btnText: string,
    keyResult: KeyResultType,
    setKeyResult: (kr: KeyResultType) => void
}



function AddUpdateKeyResultModal({
                                     closeModal,
                                     onSubmitClick,
                                     btnText,
                                     keyResult,
                                     setKeyResult
                                 }: KeyResultModalProps) {

    function handleKrChange(name: string, value: string): void {
        const updatedKr = {...keyResult, [name]: value};
        setKeyResult(updatedKr);
    }
    return (
        <div
            className="inset-0 fixed flex bg-gray-500 bg-opacity-50 justify-center items-center">
            <div className="bg-white rounded-md p-4 ">
                <div className=" flex flex-col gap-2">
                    <button
                        onClick={closeModal}
                        className="self-end text-red-500"
                    >
                        <CircleX/>
                    </button>
                    <KeyResultInputs handleChange={handleKrChange}
                                     keyResult={keyResult}/>
                    <div className="flex justify-between">
                        <input
                            type="text"
                            placeholder="Metric Type"
                            name="metric"
                            value={keyResult.metric}
                            onChange={(e) =>
                                handleKrChange(e.target.name, e.target.value)
                            }
                            className="border border-gray-400 px-2 py-1 w-fit focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"
                        />
                        <button
                            onClick={onSubmitClick}
                            className="bg-blue-500 px-2 py-1 self-center text-white rounded-md hover:bg-blue-600"
                        >
                            <ToastContainer />
                            {btnText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddUpdateKeyResultModal;