import styled from "styled-components";

const Header = styled.header<{ $allWind: boolean }>`
  padding: ${(prop) => (!prop.$allWind ? "10px 40px" : "10px 20px")};
  display: flex;
  justify-content: space-between;
  background-color: #c69f76;
`;

const DragButton = styled.button<{ $color: string; $hoverColor: string }>`
  background: none;
  user-select: none;
  border: none;
  color: ${(props) => props.$color};
  font-size: 12px;
  margin-left: 5px;
  &:hover {
    color: ${(props) => props.$hoverColor};
  }
`;
const DialoguesBox = styled.div`
  display: grid;
  grid-template-rows: 44px auto;
`;

const ScrollBox = styled.div`
  min-width: 150px;
`;

const Li = styled.li`
  position: relative;
`;

const Ul = styled.ul`
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(var(--hight-blok-noHeader) - 44px);
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
`;

export const St = {
  DialoguesBox,
  Li,
  ScrollBox,
  Ul,
  Header,
  DragButton,
};
