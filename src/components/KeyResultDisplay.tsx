import {KeyResultType} from "../types/OkrTypes.ts";

type KeyResultDisplayProps = {
    kr: KeyResultType;
    onDeleteClick: () => void;
    onUpdateClick: () => void;
}

function KeyResultDisplay(
    {
        kr,
        onDeleteClick,
        onUpdateClick
    }
    : KeyResultDisplayProps) {
    return (
        <div className="bg-white p-4 mb-2.5 rounded-md">
            <ul>
                <li>Title: {kr.title}</li>
                <li>InitialValue: {kr.initialValue}</li>
                <li>CurrentValue: {kr.currentValue}</li>
                <li>TargetValue: {kr.targetValue}</li>
                <li>Metric: {kr.metric}</li>
            </ul>
            <div className="flex justify-between">
                <button
                    onClick={onUpdateClick}
                    className="bg-green-500 p-2 text-white rounded-md hover:bg-green-600"
                >
                    Update
                </button>
                <button
                    onClick={onDeleteClick}
                    className="bg-red-500 p-2 text-white rounded-md hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default KeyResultDisplay;