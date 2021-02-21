import '@testing-library/jest-dom/extend-expect';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import React from 'react';
import { buildLeaf, source, tree } from '../test_utils/helpers';
import { DEFAULT_ROOT, DEFAULT_SEPARATOR } from '../shared/constants';
import { IRoot } from '../shared/types';
import { Tree } from '../Tree';

async function testInitialState(tree: IRoot, isDefaultOpen = false) {
  const urn = tree.id;

  expect(screen.getByTestId(urn)).toBeInTheDocument();

  const header = screen.getByTestId(`header-${urn}`);
  expect(header).toBeVisible();

  const content = screen.getByTestId(`content-${urn}`);
  expect(content).not.toBeVisible();

  if (isDefaultOpen) {
    await waitFor(
      () =>
        Object.values(tree.branches).map((branch) => {
          const branchElement = screen.getByTestId(branch.id);
          expect(branchElement).toBeInTheDocument();
          expect(branchElement).toBeVisible();

          const iconTestId =
            Object.values(branch.branches).length > 0
              ? 'plus-icon'
              : 'close-icon';

          const icon = within(branchElement).getByTestId(iconTestId);
          expect(icon).toBeVisible();
        }),
      {
        timeout: 1000,
      },
    );
  }
}

async function testInteractions(tree: IRoot) {
  const urn = tree.id;
  const header = screen.getByTestId(`header-${urn}`);
  const content = screen.getByTestId(`content-${urn}`);

  expect(content).not.toBeVisible();

  fireEvent.click(header);

  await waitFor(() => expect(content).toBeVisible(), {
    timeout: 1000,
  });

  await waitFor(
    () =>
      Object.values(tree.branches).map((branch) => {
        const branchElement = screen.getByTestId(branch.id);
        expect(branchElement).toBeInTheDocument();
        expect(branchElement).toBeVisible();
      }),
    {
      timeout: 1000,
    },
  );
}

describe.each([true, false])('<Tree />', (isDefaultOpen) => {
  it('should render tree correctly isDefaultOpen [%s]', () => {
    const root = tree;
    render(<Tree {...root} />);

    expect(screen.getByTestId(root.id)).toBeInTheDocument();
    const header = screen.getByTestId(`header-${root.id}`);
    expect(header).toBeVisible();

    testInitialState(root, isDefaultOpen);

    const treeUrns = source
      .map((s) => s.id)
      .map((urn) => {
        const segments = [DEFAULT_ROOT, ...urn.split(DEFAULT_SEPARATOR)];
        const folders = [];
        for (let i = 1; i < segments.length; i++) {
          const segment = segments.slice(0, i).join(DEFAULT_SEPARATOR);
          folders.push(segment);
        }
        return folders;
      })
      .reduce<Set<string>>(
        (set, folders) => new Set<string>([...set, ...folders]),
        new Set<string>(),
      );

    const regex = new RegExp(`^${DEFAULT_ROOT}${DEFAULT_SEPARATOR}\w*$`);
    new Set([...treeUrns].filter((urn) => !regex.test(urn))).forEach(
      async (urn) => {
        expect(screen.getByTestId(urn)).toBeInTheDocument();

        const header = screen.getByTestId(`header-${urn}`);

        const content = screen.getByTestId(`content-${urn}`);
        expect(content).toBeInTheDocument();
        expect(content).not.toBeVisible();

        fireEvent.click(header);
        await waitFor(() => expect(content).toBeVisible());
      },
    );
  });
});

describe('unit test', () => {
  let root = buildLeaf('root').root;

  beforeEach(() => {
    root = buildLeaf('root', {
      ...buildLeaf('root:branch1'),
      ...buildLeaf('root:branch2'),
    }).root;
  });

  it.each([true, false])(
    'should render tree initial state correctly for defaultOpen [%s]',
    async (isDefaultOpen) => {
      render(<Tree {...root} defaultOpen={isDefaultOpen} />);

      await testInitialState(root, isDefaultOpen);
    },
  );

  it('should render tree interactions correctly', async () => {
    render(<Tree {...root} />);

    await testInteractions(root);
  });
});
