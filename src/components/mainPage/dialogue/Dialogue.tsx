import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import avatar from "../../../img/images.png";
import Modal from "../../alert/Alert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Avatar from "../../avatar/Avatar";
import { DialoguesType } from "../../../redux/reducers/http/socketReducer";

const PosterBox = styled.div`
  display: grid;
  grid-template-rows: 44px auto;
`;

const ScrollBox = styled.div`
  min-width: 150px;
`;

const LinkFrend = styled(NavLink)<{ $mousUp: boolean; $allWind: boolean }>`
  padding: ${(prop) => (!prop.$allWind ? "10px 40px" : "10px 20px")};
  display: flex;
  align-items: center;
  font-size: 15px;
  white-space: nowrap;
  gap: 20px;
  justify-content: space-between;
  &:hover {
    background: ${(prop) =>
      prop.$mousUp === false
        ? "linear-gradient(90deg, rgba(63, 94, 251, 0) 1%,  rgba(255, 255, 255, 0.3) 30%)"
        : ""};
  }
  &.active {
    background-color: #ffffff88;
    cursor: default;
  }
`;

const H3 = styled.h3<{ $allWind: boolean }>`
  padding: ${(prop) => (!prop.$allWind ? "10px 40px" : "10px 20px")};
  font-size: 18px;
  background-color: #c69f76;
`;

const AvatarImg = styled.img`
  max-width: 20px;
`;

const Li = styled.li`
  position: relative;
`;

const ModCom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 100%;
`;

const Butt = styled.button`
  background-color: transparent;
  border: none;
`;

const Ul = styled.ul`
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(var(--hight-blok-noHeader) - 44px);
`;

const Dialogue: React.FC<{
  mousUp: boolean;
  allWind: boolean;
  dialogues: DialoguesType[] | undefined;
}> = ({ mousUp, allWind, dialogues }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [id, setId] = React.useState<number>();

  const contextHandler = (
    e: React.MouseEvent<HTMLElement>,
    id: number
  ): void => {
    e.preventDefault();
    setOpen(true);
    setId(id);
  };

  const clouseHandler = (): void => setOpen(false);

  return (
    <PosterBox>
      <header>
        <H3 $allWind={allWind}>Dialogue</H3>
      </header>
      <ScrollBox>
        <Ul>
          {dialogues &&
            dialogues.map(({ targetId, target, sourceId, sources }) => (
              <Li
                key={targetId === 1 ? sourceId + "t" : targetId}
                onContextMenu={(e) =>
                  contextHandler(e, targetId === 1 ? sourceId : targetId)
                }
              >
                <LinkFrend
                  $allWind={allWind}
                  $mousUp={mousUp}
                  to={
                    targetId === 1
                      ? `/:${sourceId}_${sources.firstName}_${sources.lastName}`
                      : `/:${targetId}_${target.firstName}_${target.lastName}`
                  }
                >
                  <>
                    {(
                      <Avatar
                        size={30}
                        letter={
                          targetId === 1
                            ? sources.firstName[0]
                            : target.firstName[0]
                        }
                        fontSize={20}
                      />
                    ) ?? <AvatarImg src={avatar} alt="avatar" />}
                  </>
                  <div style={{ marginRight: "auto", fontSize: "14px" }}>
                    {`${
                      targetId === 1 ? sources.firstName : target.firstName
                    } ${targetId === 1 ? sources.lastName : target.lastName}`}
                  </div>
                  <div style={{ color: "grey", fontSize: "14px" }}>
                    Fr <span>11:43</span>
                  </div>
                </LinkFrend>
                <Modal
                  open={open}
                  num={id}
                  n={targetId}
                  clouseHandler={clouseHandler}
                  component={
                    <ModCom>
                      <Butt>
                        <HighlightOffIcon sx={{ fontSize: "20px" }} />
                      </Butt>
                      <Butt>
                        <DeleteOutlineIcon sx={{ fontSize: "20px" }} />
                      </Butt>
                    </ModCom>
                  }
                />
              </Li>
            ))}
        </Ul>
      </ScrollBox>
    </PosterBox>
  );
};

export default Dialogue;
