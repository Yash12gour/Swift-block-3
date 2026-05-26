export interface StandardBlockSize {
  id: string;
  l: number;
  h: number;
  w: number;
}

export interface TechnicalSpec {
  characteristic: string;
  unit: string;
  value: string;
}

export interface Differentiator {
  num: string;
  title: string;
  points: string[];
  description: string;
}

export interface InstallationStep {
  step: number;
  title: string;
  description: string;
}

export interface ToolItem {
  name: string;
  description: string;
  iconName: string;
  useCase: string;
}

export interface GroupCompany {
  name: string;
  sub: string;
  address: string;
  phone?: string;
  email?: string;
}
