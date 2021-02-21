import React, { memo, MutableRefObject, useMemo, useState } from 'react';
import { useSpring } from 'react-spring';
import { List } from '../shared/styles';
import { IFolder } from '../shared/types';
import { useAnimation, useMeasure, usePrevious } from './helpers';
import { Close, Minus, Plus } from './icons';
import { Content, FolderContainer, Header, Title, toggle } from './styles';

interface IFolderProps extends IFolder {
  defaultOpen?: boolean;
}

export const Folder: React.FC<IFolderProps> = memo(
  ({ display, subFolders, defaultOpen = false }) => {
    const [isOpen, setOpen] = useState(defaultOpen);
    const previous = usePrevious(isOpen);
    const [bind, { height: viewHeight }] = useMeasure();
    const { height, opacity, transform } = useAnimation(isOpen, viewHeight);

    const children = useMemo(() => Object.values(subFolders), [subFolders]);
    const Icon = children.length ? (isOpen ? Minus : Plus) : Close;

    return (
      <FolderContainer>
        <Header onClick={() => setOpen((prev) => !prev)}>
          <Icon style={{ ...toggle, opacity: children.length ? 1 : 0.3 }} />
          <Title>{display}</Title>
        </Header>
        <Content
          style={{
            opacity: opacity as any, // type compatibility issue in react-spring
            height: isOpen && previous === isOpen ? 'auto' : height,
          }}
        >
          <List
            style={{ transform }}
            ref={bind.ref as MutableRefObject<HTMLUListElement>} // type compatibility issue in react-spring
          >
            {children.map((subFolder) => (
              <Folder key={subFolder.id} {...subFolder} />
            ))}
          </List>
        </Content>
      </FolderContainer>
    );
  },
);
