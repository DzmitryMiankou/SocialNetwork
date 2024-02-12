import styled from "styled-components";

const Main = styled.div<{ $select: boolean }>`
  display: flex;
  position: relative;
  overflow: hidden;
  user-select: ${(prop) => (prop.$select === true ? "none" : "text")};
  height: var(--hight-blok-noHeader);
`;

const ColResize = styled.div<{ $mousUp: boolean }>`
  content: '" "';
  width: 1px;
  background-color: ${(prop) =>
    prop.$mousUp ? "var(--bg-colResize)" : "#e6c6b2"};
  padding: ${(prop) => (prop.$mousUp ? "0px 1px" : "0px 0px")};
  cursor: col-resize;
  position: absolute;
  z-index: 34;
  &:hover {
    padding: 0px 1px;
    background: var(--bg-colResize);
  }
`;

const Div = styled.section`
  position: absolute;
  background-color: var(--bg-messages);
  height: var(--hight-blok-noHeader);
  z-index: 24;
`;

const Div2 = styled(Div)`
  background-color: var(--bg-dialogue);
`;

const Div3 = styled.aside`
  width: 230px;
  padding: 20px 0px 0px 40px;
  background-color: var(--bg-contacts);
`;

const But = styled.button`
  position: absolute;
  top: 10px;
  left: 0;
  height: 90px;
  background-color: #986f4077;
  border: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 0 0 0 3px;
  z-index: 99;
  &:hover {
    background-color: #ad723a;
  }
`;

export const St = {
  But,
  Div3,
  ColResize,
  Div2,
  Div,
  Main,
};
