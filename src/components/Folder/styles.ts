import styled from 'styled-components';
import { animated } from 'react-spring';

export const FolderContainer = styled.li`
  position: relative;
  padding: 10px 0px 0px 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  vertical-align: middle;
  color: white;
  fill: white;
`;

export const Header = styled.div`
  cursor: pointer;
  &:hover {
    color: #64d2ff;
  }
`;

export const Title = styled('span')`
  font-size: 1.25rem;
  line-height: 1.5rem;
  vertical-align: bottom;
  overflow: hidden;
`;

export const Content = styled(animated.div)`
  will-change: transform, opacity, height;
  margin-left: 6px;
  border-left: 1px dashed rgba(255, 255, 255, 0.4);
  overflow: hidden;
`;

export const toggle = {
  width: '1em',
  height: '1em',
  marginRight: 10,
  cursor: 'pointer',
  verticalAlign: 'middle',
};
