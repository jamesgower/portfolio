import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.SFC = (): JSX.Element => (
  <div>
    404 - <Link to="/">Go home</Link>
  </div>
);

export default NotFoundPage;
