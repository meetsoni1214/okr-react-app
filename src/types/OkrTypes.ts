type KeyResultType = {
  id: number
  title: string;
  initialValue: number;
  currentValue: number;
  targetValue: number;
  metric: string;
};

type ObjectiveType = {
  id: number;
  objective: string;
  keyResults: KeyResultType[];
};

type ObjectiveResponseType = {
  id: number;
  title: string;
  key_results: KeyResultResponseType[];
}
type KeyResultResponseType = {
  id: number;
  title: string;
  initial_value: number;
  current_value: number;
  target_value: number;
  metric: string;
  objective: ObjectiveResponseType;
  objective_id: number
}
type InsertObjectiveType = Omit<ObjectiveResponseType, "id" | "key_results">;
type InsertKeyResultType = Omit<KeyResultResponseType, "id" | "objective">;
type UpdateKeyResultType = Omit<KeyResultResponseType, "id" | "objective" | "objective_id">;
export type { KeyResultType, ObjectiveType, InsertObjectiveType, ObjectiveResponseType, KeyResultResponseType, InsertKeyResultType, UpdateKeyResultType };
