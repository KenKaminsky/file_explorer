export interface IData {
  id: string;
}

export interface IBranches {
  [key: string]: IRoot;
}

export interface IRoot extends IData {
  display?: string;
  branches: IBranches;
}
