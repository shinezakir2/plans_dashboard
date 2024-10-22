 
export class MenuDTO {
  id: number = 0;
  axisNameAR: string = '';
  subAxis!: SubAxi[]
  href:string = '';
}

export class SubAxi {
  id: number = 0;
  axisId: number = 0;
  subAxisNameAR: string = '';
}