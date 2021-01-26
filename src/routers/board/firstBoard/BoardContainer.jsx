import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import BoardPresenter from "./BoardPresenter";
import {
  GET_MAINBOARD,
  GET_MAINBOARD_TOTALPAGE_ONLY_CNT,
  GET_MAINBOARD_TOTALPAGE,
  GET_MAIN_TOTAL_PAGE,
} from "./BoardQueries";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useInput from "../../../hooks/useInput";

const BoardContainer = ({ history }) => {
  ///////////////////// - VARIABLE - ////////////////////////

  ///////////////////// - USE STATE - ////////////////////////
  const [pages, setPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [limit, setLimit] = useState(2);
  const inputSearch = useInput("");

  ///////////////////// - USE REF - ////////////////////////

  ///////////////////// - USE CONTEXT - ////////////////////////

  ///////////////////// - USE QUERY - ////////////////////////
  const {
    data: mainBoardDatum,
    loading: mainBoardLoading,
    refetch: mainBoardRefetch,
  } = useQuery(GET_MAINBOARD, {
    variables: {
      searchValue,
      limit,
      currentPage,
    },
  });

  const { data: mainPageData, refetch: mainPageRefetch } = useQuery(
    GET_MAIN_TOTAL_PAGE,
    {
      variables: {
        searchValue,
        limit,
      },
    }
  );
  const {
    data: totalPageData,
    loading: totalPageLoading,
    refetch: totalPageRefetch,
  } = useQuery(GET_MAINBOARD_TOTALPAGE, {
    variables: {
      searchValue,
      limit,
    },
  });

  const {
    data: totalPageOnlyCntData,
    loading: totalPageOnlyCntLoading,
    refetch: totalPageOnlyCntRefetch,
  } = useQuery(GET_MAINBOARD_TOTALPAGE_ONLY_CNT, {
    variables: {
      searchValue,
      limit,
    },
  });

  ///////////////////// - USE MUTATION - ////////////////////////

  ///////////////////// - USE EFFECT - ////////////////////////

  const createMainBoardHandler = () => {
    history.push("/board-write");
  };

  useEffect(() => {
    if (mainPageData && !pages) {
      const temp = [];

      for (let i = 0; i < mainPageData.getMainBoardTotalPage; i++) {
        temp.push(i);
      }
      setPages(temp);
    }
  }, [mainPageData]);

  useEffect(() => {
    mainPageRefetch();
    totalPageRefetch();
    totalPageOnlyCntRefetch();
  }, []);

  useEffect(() => {
    mainBoardRefetch();
  }, []);

  // useEffect(() => {
  //   if (!imagePath) {
  //     setImagePath(`-`);
  //   }
  // });

  const moveLinkHandler = (idx) => {
    history.push(`/mainDetail/${idx}`);
  };

  ///////////////////// - USE HANDLER - //////////////////////

  const changeFloorHandler = (floor) => {
    setCurrentFloor(floor);
    setDetailKey(null);
    inputSearch.setValue("");
    setSearchValue("");
  };

  const changeSearchValueHandler = () => {
    setPages(null);
    setSearchValue(inputSearch.value);
  };

  const changePageHandler = (page) => {
    setCurrentPage(page);
  };

  const prevAndNextPageChangeMainHandler = (page) => {
    if (page < 0) {
      toast.error("첫 페이지 입니다.");
      return;
    }

    if (page > mainPageData.getMainBoardTotalPage - 1) {
      toast.error("마지막 페이지 입니다.");
      return;
    }

    setCurrentPage(page);
  };

  const _valueChangeHandler = (event) => {
    const nextState = { ...value };

    nextState[event.target.name] = event.target.value;

    setValue(nextState);
  };

  return (
    <BoardPresenter
      currentPage={currentPage}
      mainBoardDatum={mainBoardDatum && mainBoardDatum.getAllMainBoards}
      moveLinkHandler={moveLinkHandler}
      _valueChangeHandler={_valueChangeHandler}
      pages={pages}
      limit={limit}
      setCurrentPage={setCurrentPage}
      totalPage={totalPageData && totalPageData.getMainBoardTotalPage}
      totalCnt={
        totalPageOnlyCntData &&
        totalPageOnlyCntData.getMainBoardTotalPageOnlyCnt
      }
      prevAndNextPageChangeMainHandler={prevAndNextPageChangeMainHandler}
      changePageHandler={changePageHandler}
      inputSearchValue={inputSearch}
      changeFloorHandler={changeFloorHandler}
      changeSearchValueHandler={changeSearchValueHandler}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      createMainBoardHandler={createMainBoardHandler}
    />
  );
};

export default BoardContainer;
