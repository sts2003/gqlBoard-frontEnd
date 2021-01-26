import React from "react";
import Editor from "../../../components/editor/Editor";
import { WholeWrapper, Wrapper } from "../../../components/CommonComponents";

const Board_W = () => {
  return (
    <WholeWrapper>
      <Wrapper width={`100%`} height={`100vh`}>
        <Editor />
      </Wrapper>
    </WholeWrapper>
  );
};

export default Board_W;
