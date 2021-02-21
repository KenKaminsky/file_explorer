import faker from 'faker';
import { parseURN, parseURNs } from './parser';

const source = [
  {
    id: 'urn:intuit:customersuccess:customer360:CSGoldCompany',
  },
  {
    id: 'urn:intuit:customersuccess:customer360:CSGoldPerson',
  },
];

const expocted = {
  urn: {
    id: 'urn',
    display: 'urn',
    subFolders: {
      intuit: {
        id: 'urn:intui',
        dispplay: 'intuit',
        subFolders: {
          customersuccess: {
            id: 'urn:intui:customersuccess',
            display: 'customersuccess',
            subFolders: {
              customer360: {
                id: 'urn:intuit:customersuccess:customer360',
                display: 'customer360',
                subFolders: {
                  CSGoldCompany: {
                    id: 'urn:intuit:customersuccess:customer360:CSGoldCompany',
                    display: 'CSGoldCompany',
                  },
                  CSGoldPerson: {
                    id: 'urn:intuit:customersuccess:customer360:CSGoldPerson',
                    display: 'CSGoldPerson',
                  },
                },
              },
            },
          },
        },
      },
      parseURNs,
    },
  },
};

describe('build folder tree', () => {
  it('should build correct folder tree', () => {
    expect(parseURNs(source)).toStrictEqual(expocted);
  });
});

describe('parse urn to corrent folder tree', () => {
  const urn = Array(faker.random.number(5))
    .fill(0)
    .map((_) => faker.system.directoryPath())
    .join('');

  const source = { id: urn };
  it('should build correct folder tree', () => {
    expect(parseURN(source)).toStrictEqual(expocted);
  });
});
