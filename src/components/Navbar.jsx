import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutapi } from "../Store/Auth/auth.actions";
import styles from "../pages/all.module.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isauth } = useSelector((state) => state.auth);
  const handleLoginClick = () => {
    dispatch(logoutapi());
  };
  return (
    <nav class="navbar bg-light">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">Home</Link>
        <Link class="navbar-brand" to={"/total"}>Total Todos</Link>
        <form class="d-flex" role="search">
          <button
            class="btn btn-outline-success"
            onClick={handleLoginClick}
            type="submit"
          >
            {isauth ? "Logout" : "Login"}
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
