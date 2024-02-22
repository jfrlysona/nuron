import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import PaginationRounded from "../Pagination";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/UserProvider";

const successToast = () => toast.success("Successfully deleted!");
const errorToast = () => toast.error("Not deleted!");
const successToast2 = () => toast.success("User is updated!");
const errorToast2 = () => toast.error("User is not updated!");

function AdminUsers() {
  const [user, setUser] = useState([]);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const [usersPerPage, setUsersPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  useEffect(() => {
    const paginatedData = user.slice(
      (currentPage - 1) * usersPerPage,
      currentPage * usersPerPage
    );
    setPaginatedUsers(paginatedData);
  }, [currentPage, usersPerPage, user]);

  async function deleteUser(id) {
    try {
      const response = await fetch("http://localhost:3000/user/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setUser((prevUsers) => prevUsers.filter((user) => user._id !== id));
        successToast();
      } else {
        errorToast();
      }
    } catch (error) {
      errorToast();
    }
  }

  async function makeUserAdmin(id) {
    try {
      const response = await fetch("http://localhost:3000/user/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          role: "Admin",
        }),
      });
      if (response.ok) {
        setUser((prevUsers) =>
          prevUsers.map((user) => {
            if (user._id === id) {
              return { ...user, role: "Admin" };
            }
            return user;
          })
        );
        successToast2();
      } else {
        errorToast2();
      }
    } catch (error) {
      errorToast2();
    }
  }
  async function makeRoleUser(id) {
    try {
      const response = await fetch("http://localhost:3000/user/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          role: "User",
        }),
      });
      if (response.ok) {
        setUser((prevUsers) =>
          prevUsers.map((user) => {
            if (user._id === id) {
              return { ...user, role: "User" };
            }
            return user;
          })
        );
        successToast2();
      } else {
        errorToast2();
      }
    } catch (error) {
      errorToast2();
    }
  }

  let totalPages = Math.ceil(user.length / usersPerPage);

  return (
    <section id="adminUsers">
      <div className="container">
        <h1>All Users</h1>
        <div className="cards">
          {paginatedUsers.map((x) => (
            <div className="card" key={x._id}>
              <div className="img" onClick={() => navigate("/user/" + x._id)}>
                {x.profileImage ? (
                  <img src={x.profileImage} alt="avatar" />
                ) : (
                  <div className="user-prof-i">
                    <i className="fa-solid fa-user"></i>
                  </div>
                )}
              </div>
              <div className="text">
                <Link to={"/user/" + x._id}>
                  {x.firstName} {x.lastName}
                </Link>
                <div className="icons-card-admin">
                  <div className="delete" onClick={() => deleteUser(x._id)}>
                    <i className="fa-light fa-user-slash"></i>
                    <span>Delete User</span>
                  </div>
                  {x.role === "User" ? (
                    <div
                      className="makeAdmin"
                      onClick={() => makeUserAdmin(x._id)}
                    >
                      <i className="fa-light fa-user-gear"></i>
                      <span>Make Admin</span>
                    </div>
                  ) : (
                    <div
                      className="makeAdmin"
                      onClick={() => makeRoleUser(x._id)}
                    >
                      <i className="fa-light fa-user"></i>
                      <span>Make User</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <PaginationRounded
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
        <Toaster position="bottom-right" />
      </div>
    </section>
  );
}

export default AdminUsers;
