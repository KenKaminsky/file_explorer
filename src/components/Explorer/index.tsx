import React from 'react';
import data from '../data';
import { Folder } from '../Folder';
import { List } from '../shared/styles';
import { parseURNs } from './parser';

// |--urn
// |--|--intuit
// |--|--|--customersuccess
// |--|--|--|--customer360
// |--|--|--|--|--CSGoldCompany
// |--|--|--|--|--CSGoldPerson
// ...

const FileExplorer = () => {
  const root = parseURNs(data);

  return (
    <List>
      <Folder {...root} defaultOpen={true} />
    </List>
  );
};

export default FileExplorer;
