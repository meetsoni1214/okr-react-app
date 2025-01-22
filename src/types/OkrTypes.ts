type KeyResultType = {
  title: string;
  initialValue: number;
  currentValue: number;
  targetValue: number;
  metric: string;
};

type ObjectiveType = {
  objective: string;
  keyResults: KeyResultType[];
};

export type { KeyResultType, ObjectiveType };
