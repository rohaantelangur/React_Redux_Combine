import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ADDTODO, REMOVETODO, TOOGLETODO } from "../Store/Feed/fedd.actions";
import { Link } from "react-router-dom";
// import styles from "./all.module.css";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { todos } = useSelector((state) => state.todos);

  const dispatch = useDispatch();
  const ref = useRef();
  const [refresh, setrefresh] = useState("");

  const addtodof = () => {
    setrefresh(Date.now());
    fetch("http://localhost:8080/todosdb", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        value: ref.current.value,
        isCompleted: false,
      }),
    });

    fetch("http://localhost:8080/todosdb")
      .then((r) => r.json())
      .then((r) => dispatch(ADDTODO(r)));
  };

  const toggleinput = (id, value) => {
    setrefresh(Date.now());
    fetch(`http://localhost:8080/todosdb/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        isCompleted: value,
      }),
    });

    fetch("http://localhost:8080/todosdb")
      .then((r) => r.json())
      .then((e) => dispatch(TOOGLETODO(e)));
  };

  const handleremove = (index) => {
    setrefresh(Date.now());
    fetch(`http://localhost:8080/todosdb/${index}`, {
      method: "DELETE",
    });

    fetch("http://localhost:8080/todosdb")
      .then((r) => r.json())
      .then((e) => dispatch(REMOVETODO(e)));
  };

  useEffect(() => {
    fetch("http://localhost:8080/todosdb")
      .then((r) => r.json())
      .then((e) => dispatch(ADDTODO(e)));
  }, [refresh]);

  if (isAuthenticated) {
    navigate("/login");
  }

  return (
    <>
      <div className="todos">
        <input
          type="text"
          ref={ref}
          placeholder="enter your todo"
          className="inputbox"
        />
        <button onClick={() => addtodof()} className="inputbtn">
          Add
        </button>
        <br />
        <div className="todosbox">
          {todos.map((el) => (
            <div key={el.id} className="todoitembox">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <input
                  checked={el.isCompleted === true ? true : false}
                  onChange={(e) => toggleinput(el.id, e.target.checked)}
                  type="checkbox"
                />

                <p
                  className={
                    el.isCompleted === true ? 'strike' : 'nostrike'
                  }
                >
                  {el.value}
                </p>
                <Link to={`/todo/${el.id}`}>
                  <button className="editbtn">Edit</button>
                </Link>
                <button className="delbtn" onClick={() => handleremove(el.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
