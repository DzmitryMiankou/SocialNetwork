import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import avatar from "../../../img/images.png";

const PosterBox = styled.div`
  padding: 20px 0px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: var(--hight-blok-noHeader);
`;

const ScrollBox = styled.div`
  min-width: 150px;
`;

const LinkFrend = styled(NavLink)<{ $mousUp: boolean }>`
  padding: 20px 20px;
  display: flex;
  white-space: nowrap;
  gap: 20px;
  transition: 0.1s;
  justify-content: space-between;
  &:hover {
    background-color: ${(prop) => (prop.$mousUp === false ? "#fffcf94f" : "")};
  }
  &.active {
    background-color: #ffb977;
    cursor: default;
  }
`;

const H3 = styled.h3`
  padding: 0px 20px;
`;

const Avatar = styled.img`
  max-width: 20px;
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
              <LinkFrend $mousUp={mousUp} to={`/:${i}`}>
                <Avatar src={avatar} alt="avatar" />
                <div style={{ marginRight: "auto" }}>Nikiforov Mikle</div>
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
