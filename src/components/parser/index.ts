import { DEFAULT_ROOT, DEFAULT_SEPARATOR } from '../shared/constants';
import { IData, IRoot } from '../shared/types';

export const buildBranch = (
  root: IRoot,
  branchData: IData,
  separator = DEFAULT_SEPARATOR,
): IRoot => {
  const [currPath, ...nestedPaths] = branchData.id.split(separator);

  if (!currPath) return null;

  const nextRoot = (root.branches[currPath] = root.branches[currPath] || {
    id: `${root.id}${separator}${currPath}`,
    display: currPath,
    branches: {},
  });

  const nextBranchData = {
    id: nestedPaths.join(separator),
  };

  const branch = buildBranch(nextRoot, nextBranchData);

  if (branch) {
    nextRoot.branches = {
      ...nextRoot.branches,
      [branch.display]: branch,
    };
  }

  return nextRoot;
};

export const buildTree = (data: IData[], separator = DEFAULT_SEPARATOR) => {
  const root = { id: DEFAULT_ROOT, display: DEFAULT_ROOT, branches: {} };
  data.map((dataPoint) => buildBranch(root, dataPoint, separator));
  return root;
};
