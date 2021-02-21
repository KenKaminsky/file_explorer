import { buildBranch, buildTree } from '.';
import { mockBranch, companyLeaf, tree } from '../test_utils/helpers';
import { DEFAULT_ROOT } from '../shared/constants';

describe('.buildTree', () => {
  const source = [
    {
      id: 'urn:intuit:customersuccess:customer360:CSGoldCompany',
    },
    {
      id: 'urn:intuit:customersuccess:customer360:CSGoldPerson',
    },
  ];
  const expected = tree;
  it('should build correct tree', () => {
    const tree = buildTree(source);
    expect(tree).toStrictEqual(expected);
  });
});

describe('.buildBranch', () => {
  const source = {
    id: 'urn:intuit:customersuccess:customer360:CSGoldCompany',
  };

  const expected = mockBranch({ ...companyLeaf });

  it('should build correct branch', () => {
    const root = { id: DEFAULT_ROOT, display: DEFAULT_ROOT, branches: {} };
    const tree = buildBranch(root, source);
    expect(tree).toStrictEqual(expected);
  });
});
