import React from "react";
import {
  WholeWrapper,
  CommonButton,
  Wrapper,
  TextInput,
  PagenationWrapper,
  Pagenation,
  PagenationBtn,
  SearchWrapper,
} from "../../../components/CommonComponents";
import styled from "styled-components";
import { Fade } from "react-reveal";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

const Main_Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: ${(props) => props.width || `100%`};
  height: ${(props) => props.height || `100%`};
`;

const MainTitle = styled.h1`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  font-size: 25px;
  margin-top: 100px;
`;

const MainList = styled.div`
  width: 90%;
  height: 300px;
  cursor: pointer;
  margin-left: 100px;
  margin-top: 80px;

  display: flex;
  flex-direction: row;

  border: ${(props) => props.theme.border};

  &:hover {
    box-shadow: ${(props) => props.theme.boxShadow};
  }
`;

const MainImage = styled.img`
  width: 400px;
  height: 300px;

  background-size: cover;
`;

const MainDataTitle = styled.div`
  width: 200px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 13px;
  margin-top: ${(props) => props.mgTop || `0px`};

  border-right: 1px solid #0b0b0b;
`;

const MainDataDesc = styled.div`
  width: 700px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const MainDataCreatedAt = styled.div`
  width: 150px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled(TextInput)`
  position: relative;
  border: 1px solid #dcdcdc;
  border-radius: 2px;
  margin-right: 4px;
  &:hover ${SearchWrapper2} {
    opacity: 1;
    box-shadow: 0px 3px 5px solid #eee;
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
`;

const SearchWrapper2 = styled(Wrapper)`
  position: relative;
  color: #fff;
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    border: 1px solid rgb(67, 66, 88);
    background: none;
    color: rgb(67, 66, 88);
  }
  & svg {
    position: absolute;
    top: 5px;
    font-size: 18px;
  }
  &:hover svg {
    animation: ${SearchWrapper2} 0.5s forwards;
  }
`;

const BoardPresenter = ({
  mainBoardDatum,
  moveLinkHandler,
  pages,
  inputSearchValue,
  changeSearchValueHandler,
  limit,
  setCurrentPage,
  changePageHandler,
  currentPage,
  totalPage,
  totalCnt,
  prevAndNextPageChangeMainHandler,
  createMainBoardHandler,
}) => {
  return (
    <WholeWrapper width={`100%`} height={`100vh`}>
      <MainTitle>Main Board</MainTitle>
      <Wrapper
        dr={`row`}
        al={`flex-start`}
        ju={`flex-start`}
        padding={`10px 0px`}
      >
        <SearchWrapper width={`auto`} dr={`row`}>
          <SearchInput
            type="text"
            width={`200px`}
            padding={`0px 5px 0px 5px`}
            placeholder="Search"
            onKeyDown={(e) => e.keyCode === 13 && changeSearchValueHandler()}
            {...inputSearchValue}
          />
        </SearchWrapper>
        <SearchWrapper2
          width={`30px`}
          height={`30px`}
          bgColor={`rgb(67, 66, 88)`}
          onClick={changeSearchValueHandler}
        >
          <FaSearch />
        </SearchWrapper2>
      </Wrapper>
      <Main_Wrapper>
        <Main_Wrapper>
          {mainBoardDatum ? (
            mainBoardDatum.length === 0 ? (
              <MainDataTitle>메인의 게시글이 없습니다.</MainDataTitle>
            ) : (
              mainBoardDatum.map((data, idx) => {
                return (
                  <Fade bottom delay={idx * 60} key={idx}>
                    <MainList
                      key={idx}
                      onClick={() => moveLinkHandler(data._id)}
                    >
                      <MainImage src={data.imagePath} />
                      <MainDataTitle>{data.title}</MainDataTitle>
                      <MainDataDesc>{data.description}</MainDataDesc>
                      <MainDataCreatedAt>{data.createdAt}</MainDataCreatedAt>
                    </MainList>
                  </Fade>
                );
              })
            )
          ) : (
            <MainDataTitle>메인을 조회하는 중 입니다.</MainDataTitle>
          )}
        </Main_Wrapper>
      </Main_Wrapper>
      <Wrapper margin={`30px 0px`} ju={`flex-end`} dr={`row`}>
        {pages && pages.length > 0 && (
          <PagenationWrapper width={`auto`}>
            <PagenationBtn
              onClick={() =>
                mainBoardDatum &&
                prevAndNextPageChangeMainHandler(currentPage - 1)
              }
            >
              <IoIosArrowBack />
            </PagenationBtn>
            {pages.map((data) => {
              return (
                <Pagenation
                  className={data === currentPage ? `active` : ``}
                  key={data}
                  onClick={() => changePageHandler(data)}
                >
                  {data + 1}
                </Pagenation>
              );
            })}
            <PagenationBtn
              onClick={() =>
                mainBoardDatum &&
                prevAndNextPageChangeMainHandler(currentPage + 1)
              }
            >
              <IoIosArrowForward />
            </PagenationBtn>
          </PagenationWrapper>
        )}
      </Wrapper>

      <CommonButton onClick={() => createMainBoardHandler()}>
        글 작성
      </CommonButton>
    </WholeWrapper>
  );
};

export default BoardPresenter;
