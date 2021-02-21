import React, { useMemo } from 'react';
import { Tree } from '../Tree';
import { TreeContainer } from '../shared/styles';
import { buildTree } from '../parser';
import { IData } from '../shared/types';

interface IFileExplorer {
  data: IData[];
}

const FileExplorer: React.FC<IFileExplorer> = ({ data }) => {
  const root = useMemo(() => buildTree(data), [data]);

  return (
    <TreeContainer>
      <Tree {...root} defaultOpen={true} />
    </TreeContainer>
  );
};

export default FileExplorer;
