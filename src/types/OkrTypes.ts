type KeyResultType = {
  title: string;
  initialValue: number;
  currentValue: number;
  targetValue: number;
  metric: string;
};

type Objective = {
  objective: string;
  keyResults: KeyResultType[];
};

export { KeyResultType, Objective };
