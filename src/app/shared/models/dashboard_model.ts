export class DashboardModel {
    data: Daum[] = []
    summary: Summary2[] = []
  }

  export class Daum {
    id: number = 0
    axisNameEN: string = ''
    axisNameAR: string = ''
    axisDescEN: string = ''
    axisDescAR: string = ''
    domain: string = ''
    count: number = 0
    subAxis: SubAxi[] = []
  }
  
  export class SubAxi {
    id: number = 0
    subAxisNameEN: string = ''
    subAxisNameAR: string = ''
    subAxisDescEN: string = ''
    budget: number = 0
    remainingAmount: number = 0
    spentAmount: number = 0
    subAxisDescAR: string = ''
    indicators: string = ''
    planPhases: PlanPhase[]  = []
    plansCount: number = 0
    summary: Summary[]  = []
    mainAxisNameAR: string = ''
  }
  
  export class PlanPhase {
    id?: number = 0
    planNameAR: string = ''
    planNameEN: any
    responsibleOfficer?: string = ''
    monitoringOfficer: any
    targetedCount?: number = 0
    remainingAmount?: number = 0
    spentAmount?: number = 0
    budget?: number = 0
    completedCount?: number = 0
    mainGoalAR: any
    mainGoalEN: any
    startDate?: string = ''
    endDate?: string = ''
    planStatus: number = 0
    planSteps?: PlanStep[]
    summary?: any[]
    daysLeft?: number = 0
    planTimelineInWeeks?: number = 0
    value?: string = ''
  }
  
  export class PlanStep {
    id: number = 0
    stepName: string = ''
    stepDescription: any
    stepWeight: number = 0
    startDate: string = ''
    endDate: string = ''
    stepEvidence: any
    completedPercentage: number = 0
  }
  
  export class Summary {
    value: string = ''
  }
  
  export class Summary2 {
    name: string = ''
    targeted: number = 0
    completed: number = 0
    subAxisId: number = 0
    budget: number = 0
    remainingAmount: number = 0
    spentAmount: number = 0
  }
  