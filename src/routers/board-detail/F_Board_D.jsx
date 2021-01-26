import React, { useEffect, useState } from "react";
import {
  UPDATE_MAINBOARD,
  DELETE_MAINBOARD,
  GET_MAIN_DETAIL,
} from "../board/firstBoard/BoardQueries";
import styled from "styled-components";
import { useQuery, useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  WholeWrapper,
  RsWrapper,
  CommonButton,
  Wrapper,
  TextInput,
} from "../../components/CommonComponents";
import useTitle from "@4leaf.ysh/use-title";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const Board_D_title = styled.h2`
  width: 100%;
  padding: 20px;
  font-size: 22px;
  font-weight: 700;
`;

const Board_D = styled.ul`
  width: 100%;
  height: ${(props) => (props.height ? props.height : `40px`)};
  display: flex;
  flex-direction: row;
  align-items: center;

  background: ${(props) => props.bgColor};

  @media (max-width: 700px) {
    flex-direction: column;
    height: auto;
  }
`;
const Image = styled.img`
  width: 400px;
  height: 400px;
  border: 1px solid #777;
  margin: 10px;
  object-fit: cover;
`;

const Board_D_List = styled.li`
  width: ${(props) => props.width};
  line-height: 40px;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  text-align: ${(props) => props.ta || `center`};
  padding: ${(props) => (props.padding ? props.padding : `0px 10px`)};
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);
  border-radius: ${(props) => props.radius};
`;

const Board_D_Desc = styled.div`
  width: 100%;
  min-height: 500px;
  padding: 15px;
  line-height: 1.4;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  width: 120px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => props.theme.checkColor};
  color: #fff;
  box-shadow: ${(props) => props.theme.boxShadow};
  margin: 5px;
  border-radius: ${(props) => props.theme.radius};
`;

export default ({ match, history, width }) => {
  ////////////// - USE CONTEXT- ///////////////

  ////////////// - USE STATE- ///////////////
  const [currentData, setCurrentData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [useImagePath, setUseImagePath] = useState(``);
  const [value, setValue] = useState({
    title: "",
    desc: "",
  });

  ///////////// - USE QUERY- ////////////////

  const {
    data: mainData,
    loading: mainLoading,
    refetch: mainRefetch,
  } = useQuery(GET_MAIN_DETAIL, {
    variables: {
      id: match.params.key,
    },
  });

  ///////////// - USE MUTATION - /////////////
  const [updateMainBoard] = useMutation(UPDATE_MAINBOARD);
  const [deleteMainBoard] = useMutation(DELETE_MAINBOARD);

  ///////////// - EVENT HANDLER- ////////////

  const updateMain = async () => {
    const { data } = await updateMainBoard({
      variables: {
        id: mainData && mainData.getMainDetail._id,
        title: value.title,
        description: value.desc,
        imagePath: useImagePath,
      },
    });

    if (data.updateMain) {
      toast.info("게시글이 수정되었습니다");
      history.push("/");
      setValue("");
      _isDialogOpenToggle();
    } else {
      toast.error("다시 시도해주세요");
    }
  };

  const _isDialogOpenToggle = () => {
    if (!isDialogOpen) {
      setValue({ title: currentData.title, desc: currentData.description });
    }
    setIsDialogOpen(!isDialogOpen);
  };

  const _valueChangeHandler = (event) => {
    const nextState = { ...value };

    nextState[event.target.name] = event.target.value;

    setValue(nextState);
  };

  const _moveListBoard = (link) => {
    history.push(link);
  };

  const boardDeleteHandler = (_id) => {
    confirmAlert({
      title: "DELETE MAIN",
      message: "삭제하시겠습니까?",
      buttons: [
        {
          label: "취소",
          onClick: () => {
            return false;
          },
        },
        {
          label: "확인",
          onClick: () => mainDeleteHandlerAfter(_id),
        },
      ],
    });
  };

  const mainDeleteHandlerAfter = async (_id) => {
    const { data } = await deleteMainBoard({
      variables: {
        id: currentData._id,
      },
    });

    if (data.deleteMain) {
      toast.info("삭제 되었습니다!");
      history.push("/");
    } else {
      toast.error("잠시 후 다시 시도해주세요.");
    }
  };

  const fileChangeHandler = async (e) => {
    console.log(e.target.files[0]);
    const originFile = e.target.files[0];
    const originFileName = e.target.files[0].name;

    console.log(originFile);
    console.log(originFileName);
    // event는 변하기 때문에 어딘가에 저장을 해줘야한다. -> 밑에서 사용해야하기 때문에 이벤트가 바뀌기 전에 따로 저장해준다
    const D = new Date();

    const year = D.getFullYear() + "";
    const month = D.getMonth() + 1 + "";
    const date = D.getDate() + "";
    //겟 데이트는 현재 날자
    // 겟 데이는 현재 요일
    const hour = D.getHours() + "";
    const min = D.getMinutes() + "";
    const sec = D.getSeconds() + "";

    const suffix = year + month + date + hour + min + sec;

    const uploadFileName = originFileName + suffix;
    // 이것이 들어가는 데이터 이름이다. 중복이 되지 않기 때문(suffix를 달아줬기 때문에)

    try {
      const storage = storageRef.child(`imageBoards/${uploadFileName}`);
      await storage.put(originFile);
      const url = await storage.getDownloadURL();

      await setUseImagePath(url);
      await toast.info("사진이 추가되었습니다.");
    } catch (e) {}
    // catch를 잡을 때 콘솔로그를 찍으면 사용자에게 에러가 보이기 때문에 사용 X
  };

  ///////////// - USE EFFECT- ///////////////

  useEffect(() => {
    if (mainData && mainData.getMainDetail) {
      let tempData = mainData.getMainDetail;

      console.log(tempData);
      const desc = document.getElementById("main_description-js");

      if (desc !== null) {
        desc.innerHTML = tempData.description;
        setCurrentData(tempData);
      }
    }
  }, [mainData]);

  useEffect(() => {
    mainRefetch();
  }, []);

  useTitle(`main Board`);

  return (
    <WholeWrapper margin={`150px 0 0 0`} width={`100%`} height={`100%`}>
      <RsWrapper padding={`100px 0`}>
        <Board_D_title>
          {currentData ? currentData.title : <div>로딩중...</div>}
        </Board_D_title>
        <Board_D dr={`row`}>
          <Board_D_List
            width={width < 700 ? `100%` : `150px`}
            bgColor={`#dcdcdc`}
          >
            작성자
          </Board_D_List>
          <Board_D_List width={width < 700 ? `100%` : `calc((100% - 150px))`}>
            {currentData ? currentData._id : <div>로딩중...</div>}
          </Board_D_List>
          <Board_D_List
            width={width < 700 ? `100%` : `250px`}
            bgColor={`#dcdcdc`}
          >
            작성일
          </Board_D_List>
          <Board_D_List width={width < 700 ? `100%` : `calc((100% - 150px))`}>
            {currentData ? currentData.createdAt : <div>로딩중...</div>}
          </Board_D_List>
        </Board_D>

        <Board_D_Desc>
          <Wrapper id={"main_description-js"} className={"ql-editor"}></Wrapper>
          <Image src={currentData ? currentData.imagePath : ""}></Image>
        </Board_D_Desc>

        <Wrapper margin={`30px 0px`} ju={`flex-end`} dr={`row`}>
          <CommonButton
            width={`80px`}
            margin={`0px 10px 0px 0px`}
            bgColor={`#55E6C1`}
            fontColor={`#55E6C1`}
            onClick={() => _isDialogOpenToggle()}
          >
            수정
          </CommonButton>

          <CommonButton
            width={`80px`}
            margin={`0px 10px 0px 0px`}
            onClick={() => boardDeleteHandler()}
            bgColor={`#FC427B`}
            fontColor={`#FC427B`}
          >
            삭제
          </CommonButton>

          <CommonButton
            width={`80px`}
            margin={`0px 10px 0px 0px`}
            bgColor={`#273c75`}
            fontColor={`#273c75`}
            onClick={() => _moveListBoard("/")}
          >
            목록
          </CommonButton>
        </Wrapper>

        {/* Dialog Area */}
        <Dialog
          onClose={_isDialogOpenToggle}
          aria-labelledby="customized-dialog-title"
          open={isDialogOpen}
          fullWidth={true}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={_isDialogOpenToggle}
            // class="dialog_title"
          >
            게시글 수정
          </DialogTitle>
          <DialogContent>
            <Wrapper dr={`row`}>
              제목
              <TextInput
                name="title"
                value={value.title}
                onChange={_valueChangeHandler}
              />
            </Wrapper>
            <Wrapper dr={`row`}>
              내용
              <TextInput
                name="desc"
                value={value.desc}
                onChange={_valueChangeHandler}
              />
            </Wrapper>
            <Wrapper dr={`row`}>
              사진
              <Wrapper dr={`row`}>
                <Image src={useImagePath}></Image>
                <FileInput
                  type="file"
                  id="file-js"
                  onChange={fileChangeHandler}
                />
                <FileLabel htmlFor="file-js">파일 선택</FileLabel>
              </Wrapper>
            </Wrapper>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={updateMain}>
              수정
            </Button>
            <Button color="secondary" onClick={_isDialogOpenToggle}>
              취소
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog Area */}
      </RsWrapper>
    </WholeWrapper>
  );
};
