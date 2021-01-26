import styled, { keyframes } from "styled-components";

export const appearAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fullWidth = keyframes`
  0%{
    width : 0%;
  }100%{
    width : 100%;
  }
`;

export const rotate720 = keyframes`
  0%{
   transform:rotate(0);
  }100%{
    transform:rotate(720deg);
  }
`;

export const translate10 = keyframes`
0%{
  transform:translateY(0);
}
50%{
  transform:translateY(10px);
}
100%{
  transform:translateY(0px);
}
`;

export const translate = keyframes`
0%{
  transform:translateY(50px);
}
100%{
  transform:translateY(0px);
}
`;

export const translateX = keyframes`
0%{
  transform:translateX(-50px);
}
100%{
  transform:translateX(0px);
}
`;

export const header = keyframes`
  0%{
    height : 0;
  }100%{
    height : 110px;
  }
`;

export const header2 = keyframes`
  0%{
    height : 110px;
  }100%{
    height : 0px;
  }
`;
