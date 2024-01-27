import styled from "styled-components";

export const PosterBox = styled.div`
  display: grid;
  height: var(--hight-blok-noHeader);
  grid-template-rows: 44px 1fr auto;
`;

export const Header = styled.header`
  padding: 0px 40px 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #c69f76;
`;

export const Butt = styled.button`
  background-color: transparent;
  border: none;
`;

export const SendBox = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr 40px;
  position: relative;
`;

export const ButtSend = styled(Butt)`
  background-color: transparent;
  border: none;
  display: flex;
  height: auto;
  padding: 6px;
  width: auto;
`;

export const ButtAttach = styled.label`
  cursor: pointer;
`;

export const TextA = styled.textarea`
  resize: none;
  max-height: 200px;
  width: 100%;
  outline: none;
  background: #ffe7d0;
  border: none;
  font-size: 15px;
  padding: 8px 3px 1px 3px;
`;

export const Div = styled.div`
  background: #ffe7d0;
  display: flex;
  align-items: flex-end;
`;

export const MessagesBox = styled.div`
  padding: 15px 40px 2px 20px;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Message = styled.div<{
  $sourceId: number;
  $myId: number;
  $mouse: number;
}>`
  background-color: ${(prop) =>
    prop.$sourceId === prop.$myId ? "#fff0dd" : "#e1c196"};
  padding: 5px 10px;
  width: fit-content;
  min-width: 100px;
  font-size: 14px;
  max-width: 500px;
  display: grid;
  margin-left: ${(prop) =>
    prop.$sourceId === prop.$myId && prop.$mouse > 42 ? "auto" : ""};
  grid-template-areas:
    "mess mess ."
    ". . time";
`;

export const H3 = styled.h3`
  font-size: 18px;
`;

export const P = styled.p`
  grid-area: mess;
`;

export const Time = styled.time`
  color: #997a5ed0;
  font-size: 12px;
  justify-self: flex-end;
  grid-area: time;
`;

export const ArrowScroll = styled.button`
  position: absolute;
  border: none;
  background: #ffffff93;
  right: 20px;
  top: -45px;
  border-radius: 50px;
  padding: 6px 6px 3px 6px;
  transition: 0.2s;
  &:hover {
    background: #ffffff;
  }
`;

export const Status = styled.p`
  font-size: 12px;
  color: #81644bd0;
`;

export const St = {
  PosterBox,
  Header,
  H3,
  ButtAttach,
  Butt,
  ButtSend,
  Message,
  P,
  MessagesBox,
  SendBox,
  Status,
  Div,
  TextA,
  Time,
  ArrowScroll,
};
