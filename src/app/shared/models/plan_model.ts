import { PlanStepModel } from "./step_model";

export class PlanModel {
    id!: number;
    planNameAR!: string;
    planNameEN!: null | string;
    responsibleOfficer!: string;
    monitoringOfficer!: null | string;
    targetedCount!: number;
    budget!: number;
    completedCount!: number;
    mainGoalAR!: null | string;
    mainGoalEN!: null | string;
    startDate!: string;
    endDate!: string;
    planStatus!: number;
    planSteps!: PlanStepModel[];
    summary!: any[];
    daysLeft!: number;
    planTimelineInWeeks!: number;
    operationId!: number;
    subAxisNameAR!: string;
    subAxisId!: number;
    remainingAmount!: number;
    spentAmount!: number;
    nextPlans!: any[];
  }