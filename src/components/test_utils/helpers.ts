import { DEFAULT_ROOT, DEFAULT_SEPARATOR } from '../shared/constants';
import { IBranches } from '../shared/types';

export const source = [
  {
    id: 'urn:intuit:customersuccess:customer360:CSGoldCompany',
  },
  {
    id: 'urn:intuit:customersuccess:customer360:CSGoldPerson',
  },
];

export const buildLeaf = (
  urn: string,
  branches: IBranches = {},
  separator = DEFAULT_SEPARATOR,
) => {
  const segments = urn.split(separator);
  const display = segments[segments.length - 1];
  return {
    [display]: {
      id: urn,
      display,
      branches: { ...branches },
    },
  };
};

export const companyLeaf = buildLeaf(
  'root:urn:intuit:customersuccess:customer360:CSGoldCompany',
);
export const personLeaf = buildLeaf(
  'root:urn:intuit:customersuccess:customer360:CSGoldPerson',
);

export const mockBranch = (leafs: IBranches) => ({
  id: 'root:urn',
  display: 'urn',
  branches: {
    intuit: {
      id: 'root:urn:intuit',
      display: 'intuit',
      branches: {
        customersuccess: {
          id: 'root:urn:intuit:customersuccess',
          display: 'customersuccess',
          branches: {
            customer360: {
              id: 'root:urn:intuit:customersuccess:customer360',
              display: 'customer360',
              branches: {
                ...leafs,
              },
            },
          },
        },
      },
    },
  },
});

export const tree = {
  id: DEFAULT_ROOT,
  display: DEFAULT_ROOT,
  branches: { urn: { ...mockBranch({ ...companyLeaf, ...personLeaf }) } },
};
