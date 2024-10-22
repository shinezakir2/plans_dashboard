import { PlanModel } from "./plan_model";

export class OperationModel {
  id!: number;
  name!: string;
  plansCount!: number;
  startDate!: string;
  endDate!: string;
  completedPlans!: number;
  plans!:PlanModel
}




