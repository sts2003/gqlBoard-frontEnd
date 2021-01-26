import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import firstBoard from "../routers/board/firstBoard/";
import secBoard from "../routers/board/secBoard/";
import F_Board_D from "../routers/board-detail/F_Board_D";
import Board_W from "../routers/board/Board_W/Board_W";
const AppRouter = () => {
  return (
    <Router>
      <Route exact path="/" component={firstBoard} />
      <Route exact path="/mainDetail/:key" component={F_Board_D} />
      <Route exact path="/board-write" component={Board_W} />
    </Router>
  );
};

export default AppRouter;
