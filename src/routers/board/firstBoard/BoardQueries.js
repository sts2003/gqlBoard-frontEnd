import { gql } from "apollo-boost";

export const GET_MAINBOARD = gql`
  query getAllMainBoards(
    $searchValue: String!
    $limit: Int!
    $currentPage: Int!
  ) {
    getAllMainBoards(
      searchValue: $searchValue
      limit: $limit
      currentPage: $currentPage
    ) {
      _id
      title
      description
      imagePath
      createdAt
    }
  }
`;
export const GET_MAIN_TOTAL_PAGE = gql`
  query getMainBoardTotalPage($limit: Int!, $searchValue: String!) {
    getMainBoardTotalPage(limit: $limit, searchValue: $searchValue)
  }
`;
export const GET_MAINBOARD_TOTALPAGE = gql`
  query getMainBoardTotalPage($searchValue: String!, $limit: Int!) {
    getMainBoardTotalPage(searchValue: $searchValue, limit: $limit)
  }
`;

export const GET_MAINBOARD_TOTALPAGE_ONLY_CNT = gql`
  query getMainBoardTotalPageOnlyCnt($searchValue: String!, $limit: Int!) {
    getMainBoardTotalPageOnlyCnt(searchValue: $searchValue, limit: $limit)
  }
`;

export const GET_MAIN_DETAIL = gql`
  query getMainDetail($id: String!) {
    getMainDetail(id: $id) {
      _id
      title
      description
      imagePath
      createdAt
    }
  }
`;

export const CREATE_MAINBOARD = gql`
  mutation createMain(
    $title: String!
    $description: String!
    $imagePath: String!
  ) {
    createMain(title: $title, description: $description, imagePath: $imagePath)
  }
`;

export const UPDATE_MAINBOARD = gql`
  mutation updateMain(
    $id: String!
    $title: String!
    $description: String!
    $imagePath: String!
  ) {
    updateMain(
      id: $id
      title: $title
      description: $description
      imagePath: $imagePath
    )
  }
`;

export const DELETE_MAINBOARD = gql`
  mutation deleteMain($id: String!) {
    deleteMain(id: $id)
  }
`;
