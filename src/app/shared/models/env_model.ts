  export class EnvModel {
  production!: boolean;
  env: Env[] = [];
}

export class Env {
  apiUrl!: string;
  authorityURL!: string;
  menuUrl!: string;
  getSubAxisByIdUrl!: string;
  is_production!: false;
}