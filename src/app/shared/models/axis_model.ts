export class AxisModel {
    id: number = 0
    subAxisNameEN: number = 0
    subAxisNameAR: string = ''
    mainAxisAR:string=''
    subAxisDescEN: number = 0
    remainingAmount: number = 0
    spentAmount: number = 0
    budget: number = 0
    subAxisDescAR: string = ''
    plans: PlanModel[] = []
  }
  
  export class PlanModel {
    id: number = 0
    operationId: number = 0
    subAxisName: string = ''
    subAxisId:number = 0
    planNameAR: string = ''
    planNameEN: any
    responsibleOfficer: string = ''
    monitoringOfficer: any
    targetedCount: number = 0
    remainingAmount: number = 0
    spentAmount: number = 0
    budget: number = 0
    completedCount: number = 0
    mainGoalAR: any
    mainGoalEN: any
    startDate: string = ''
    endDate: string = ''
    planStatus: number = 0
    daysLeft: number = 0
    planTimelineInWeeks: number = 0
    steps?: StepModel[]
    summary?: any[]
    planSteps?: any[]
  }
  
  export class StepModel {
    id: number = 0
    parentId: number = 0
    planId: number = 0
    nextSteps: number[] =[]
    stepName: string = ''
    stepDescription: number = 0
    stepWeight: number = 0
    startDate: string = ''
    endDate: string = ''
    stepEvidence: number = 0
    completedPercentage: number = 0
  }
  