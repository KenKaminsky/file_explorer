import React, { memo, MutableRefObject, useMemo, useState } from 'react';
import { TreeContainer } from '../shared/styles';
import { IRoot } from '../shared/types';
import { useAnimation, useMeasure, usePrevious } from './hooks';
import { Close, Minus, Plus } from './icons';
import { Content, BranchContainer, Header, Title, toggle } from './styles';

interface IFolderProps extends IRoot {
  defaultOpen?: boolean;
}

export const Tree: React.FC<IFolderProps> = memo(
  ({ id, display, branches: subFolders, defaultOpen = false }) => {
    const [isOpen, setOpen] = useState(defaultOpen);
    const previous = usePrevious(isOpen);

    const [bind, { height: viewHeight }] = useMeasure();
    const { height, opacity, transform } = useAnimation(isOpen, viewHeight);

    const children = useMemo(() => Object.values(subFolders), [subFolders]);
    const Icon = children.length ? (isOpen ? Minus : Plus) : Close;

    return (
      <BranchContainer data-testid={id}>
        <Header
          data-testid={`header-${id}`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <Icon style={{ ...toggle, opacity: children.length ? 1 : 0.3 }} />
          <Title>{display}</Title>
        </Header>
        <Content
          data-testid={`content-${id}`}
          style={{
            opacity: opacity as any, // type compatibility issue in react-spring
            height: isOpen && previous === isOpen ? 'auto' : height,
          }}
        >
          <TreeContainer
            style={{ transform, visibility: isOpen ? 'initial' : 'hidden' }}
            ref={bind.ref as MutableRefObject<HTMLUListElement>} // type compatibility issue in react-spring
          >
            {children.map((subFolder) => (
              <Tree key={subFolder.id} {...subFolder} />
            ))}
          </TreeContainer>
        </Content>
      </BranchContainer>
    );
  },
);
