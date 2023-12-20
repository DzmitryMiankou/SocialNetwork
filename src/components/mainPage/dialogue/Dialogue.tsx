import React from "react";
import styled from "styled-components";

const PosterBox = styled.div`
  padding: 20px 40px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - 125px);
`;

const P = styled.p`
  min-width: 150px;
`;

const Dialogue: React.FC = () => {
  return (
    <PosterBox>
      <h3>Dialogue</h3>
      <P>
        Nest (NestJS) is a framework for building efficient, scalable Node.js
        server-side applications. It uses progressive JavaScript, is built with
        and fully supports TypeScript (yet still enables developers to code in
        pure JavaScript) and combines elements of OOP (Object Oriented
        Programming), FP (Functional Programming), and FRP (Functional Reactive
        Programming). Under the hood, Nest makes use of robust HTTP Server
        frameworks like Express (the default) and optionally can be configured
        to use Fastify as well! Nest provides a level of abstraction above these
        common Node.js frameworks (Express/Fastify), but also exposes their APIs
        directly to the developer. This gives developers the freedom to use the
        myriad of third-party modules which are available for the underlying
        platform.
      </P>
    </PosterBox>
  );
};

export default Dialogue;
