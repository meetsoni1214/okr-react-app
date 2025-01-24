import {KeyResultType} from "../types/OkrTypes.ts";

type KeyResultDisplayProps = {
    kr: KeyResultType;
    onClick: () => void;
}

function KeyResultDisplay(
    {
        kr,
        onClick,
    }
    : KeyResultDisplayProps) {
    return (
        <ul className="bg-white p-4 mb-2.5 rounded-md">
            <li>Title: {kr.title}</li>
            <li>InitialValue: {kr.initialValue}</li>
            <li>CurrentValue: {kr.currentValue}</li>
            <li>TargetValue: {kr.targetValue}</li>
            <li>Metric: {kr.metric}</li>
            <button
                onClick={onClick}
                className="bg-red-500 p-2 text-white rounded-md hover:bg-red-600"
            >
                Delete
            </button>
        </ul>
    );
}

export default KeyResultDisplay;