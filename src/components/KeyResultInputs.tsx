import {KeyResultType} from "../types/OkrTypes.ts";

type KeyResultInputProps = {
    keyResult: KeyResultType;
    handleChange: (name: string, value: string) => void;
};

function KeyResultInputs(
    {
        keyResult,
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
                    handleChange(e.target.name,e.target.value)
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
                        handleChange(e.target.name, e.target.value)
                    }
                    className="border border-gray-400 w-full px-2 py-1 focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"
                />
                <input
                    type="number"
                    placeholder="Current Value"
                    name="currentValue"
                    value={keyResult.currentValue}
                    onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                    }
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"
                />
                <input
                    type="number"
                    placeholder="Target Value"
                    value={keyResult.targetValue}
                    name="targetValue"
                    onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                    }
                    className="border border-gray-400 px-2 py-1 w-full focus:outline-none rounded-md focus:ring-2 focus:ring-blue-200"
                />
            </div>
        </div>
    );
}

export default KeyResultInputs;