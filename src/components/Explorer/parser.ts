import { IData, IFolder, IFolders } from '../shared/types';

class Folder {
  id: string;
  display: string;
  subFolders: IFolders;

  constructor({ id, display }: { id: string; display: string }) {
    this.id = id;
    this.display = display;
    this.subFolders = {};
  }
}

export const parseURN = (
  parent: IFolder,
  folder: IData,
  separator = ':',
): IFolders => {
  const [currPath, ...nestedPaths] = folder.id.split(separator);

  if (!currPath) return {};

  parent.subFolders[currPath] =
    parent.subFolders[currPath] ||
    new Folder({
      id: `${parent.id}${separator}${currPath}`,
      display: currPath,
    });

  parent.subFolders[currPath].subFolders = {
    ...parent.subFolders[currPath].subFolders,
    ...parseURN(parent.subFolders[currPath], {
      id: nestedPaths.join(separator),
    }),
  };

  return parent.subFolders;
};

export const parseURNs = (data: IData[]) => {
  const root = { id: 'root', display: 'root', subFolders: {} };
  for (const folder of data) {
    parseURN(root, folder);
  }
  return root;
};
