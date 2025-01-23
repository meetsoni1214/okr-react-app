type KeyResultType = {
  title: string;
  initialValue: number;
  currentValue: number;
  targetValue: number;
  metric: string;
};

type ObjectiveType = {
  id: string;
  objective: string;
  keyResults: KeyResultType[];
};

type InsertObjectiveType = Omit<ObjectiveType, "id">;

export type { KeyResultType, ObjectiveType, InsertObjectiveType };
