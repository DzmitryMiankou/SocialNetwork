import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PosterBox = styled.div`
  padding: 20px 0px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - 105px);
`;

const ScrollBox = styled.div`
  min-width: 150px;
`;

const LinkFrend = styled(Link)<{ $mousUp: boolean }>`
  padding: 20px 20px;
  display: flex;
  white-space: nowrap;
  gap: 20px;
  transition: 0.1s;
  justify-content: space-between;
  &:hover {
    background-color: ${(prop) => (prop.$mousUp === false ? "#ffb977" : "")};
  }
`;

const H3 = styled.h3`
  padding: 0px 20px;
`;

const ddd = ["", "", "", "", "", "", "", "", "", "", "", "", ""];

const Dialogue: React.FC<{ mousUp: boolean }> = ({ mousUp }) => {
  return (
    <PosterBox>
      <H3>Dialogue</H3>
      <ScrollBox>
        <ul>
          {ddd.map((data, i) => (
            <li key={i}>
              <LinkFrend $mousUp={mousUp} to="id">
                <div>Nikiforov Mikle </div>
                <div style={{ color: "grey" }}>
                  Fr <span>11:43</span>
                </div>
              </LinkFrend>
            </li>
          ))}
        </ul>
      </ScrollBox>
    </PosterBox>
  );
};

export default Dialogue;
