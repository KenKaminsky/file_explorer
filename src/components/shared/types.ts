export interface IData {
  id: string;
}

export interface IFolders {
  [key: string]: IFolder;
}

export interface IFolder extends IData {
  display?: string;
  subFolders: IFolders;
}
