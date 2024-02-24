import styled from "styled-components";

const Friends = styled.div`
  margin-top: 5px;
  width: 100%;
`;

const Ul = styled.ul`
  height: calc(var(--hight-blok-noHeader) - 360px);
  overflow-y: scroll;
`;

const Li = styled.li`
  position: relative;
  overflow-x: hidden;
`;

const SearchBox = styled.div`
  width: fit-content;
`;

export const St = { Friends, Ul, Li, SearchBox };
