export class MenuDTO {
    data!: SubMenu[]
}
  
export class SubMenu {
    id!: number
    axisNameEN!: any
    axisNameAR!: string
    axisDescEN!: any
    axisDescAR!: string
    count!: number
    href!:string
    subAxis!: SubAxi[]
}
  
  export class SubAxi {
    id!: number
    subAxisNameEN: any
    subAxisNameAR!: string
    subAxisDescEN: any
    remainingAmount!: number
    spentAmount!: number
    budget!: number
    subAxisDescAR!: string
    plansCount!: number
    summary!: number
    planPhases?: any[]
  }
  