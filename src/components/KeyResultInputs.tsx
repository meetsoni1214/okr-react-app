import {KeyResultType} from "../types/OkrTypes.ts";

type KeyResultInputProps = {
    keyResult: KeyResultType;
    index: number;
    handleChange: (name: string, index: number, value: string) => void;
};

function KeyResultInputs(
    {
        keyResult,
        index,
        handleChange,
    }: KeyResultInputProps
) {
    return (
        <div className="flex flex-col gap-2">
            <input
                type="text"
                placeholder="Key result title"
                value={keyResult.title}
                name="title"
                onChange={(e) =>
                    handleChange(e.target.name, index, e.target.value)
                }
                className="border border-gray-400 px-2 py-1 focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"
            />
            <div className="flex gap-2">
                <input
                    type="number"
                    placeholder="Intial Value"
                    name="initialValue"
                    value={keyResult.initialValue}
                    onChange={(e) =>
                        handleChange(e.target.name, index, e.target.value)
                    }
                    className="border border-gray-400 w-full px-2 py-1 focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"
                />
                <input
                    type="number"
                    placeholder="Current Value"
                    name="currentValue"
                    value={keyResult.currentValue}
                    onChange={(e) =>
                        handleChange(e.target.name, index, e.target.value)
                    }
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"
                />
                <input
                    type="number"
                    placeholder="Target Value"
                    value={keyResult.targetValue}
                    name="targetValue"
                    onChange={(e) =>
                        handleChange(e.target.name, index, e.target.value)
                    }
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"
                />
            </div>
        </div>
    );
}

export default KeyResultInputs;