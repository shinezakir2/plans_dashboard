import { PlanModel } from "./plan_model"

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

  