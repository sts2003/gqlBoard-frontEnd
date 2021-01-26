import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export default createGlobalStyle`
    ${reset}

    *{
        box-sizing: border-box;
        list-style: none;
    }

    a{
        text-decoration: none;
        color: ${(props) => props.theme.whiteColor}
    }
`;
