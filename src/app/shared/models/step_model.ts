export class PlanStepModel {
    id!: number;
    stepName!: string;
    stepDescription!: null | string;
    stepWeight!: number;
    startDate!: string;
    endDate!: string;
    stepEvidence!: null | string;
    completedPercentage!: number;
    parentId!: number;
    nextSteps!: number[];
  }