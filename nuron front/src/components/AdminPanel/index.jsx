import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/UserProvider";

const successToast = () => toast.success("Successfully deleted!");
const errorToast = () => toast.error("Not deleted!");

const successToast2 = () => toast.success("User is updated!");
const errorToast2 = () => toast.error("User is not updated!");

function AdminPanel() {
  const { token } = useContext(UserContext);
  const [user, setUser] = useState([]);
  const [collection, setCollection] = useState([]);
  const [nft, setNft] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then((res) => res.json())
      .then((data) => setUser(data.slice(0, 4)));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/collection")
      .then((res) => res.json())
      .then((data) => setCollection(data.slice(0, 4)));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/nft")
      .then((res) => res.json())
      .then((data) => setNft(data.slice(0, 4)));
  }, []);

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
  async function deleteCollection(id) {
    try {
      const response = await fetch("http://localhost:3000/collection/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setCollection((prevCollection) =>
          prevCollection.filter((collection) => collection._id !== id)
        );
        successToast();
      } else {
        errorToast();
      }
    } catch (error) {
      errorToast();
    }
  }
  async function deleteNft(id) {
    try {
      const response = await fetch("http://localhost:3000/nft/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setNft((prevNft) => prevNft.filter((nft) => nft._id !== id));
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
  return (
    <section id="admin-panel">
      <div className="container">
        <div className="usersAll admin-info">
          <div className="title">
            <h2>Users</h2>
            <Link to={"/admin-panel/users"} className="link-icon">
              view all
              <i className="fa-light fa-arrow-right"></i>
            </Link>
          </div>
          <div className="cards users-admin">
            {user.length > 0 &&
              user.map((x) => (
                <div className="card" key={x._id}>
                  <div
                    className="img"
                    onClick={() => navigate("/user/" + x._id)}
                  >
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
        </div>
        <div className="collectionssAll admin-info">
          <div className="title">
            <h2>Collections</h2>
            <Link to={"/admin-panel/collections"} className="link-icon">
              view all
              <i className="fa-light fa-arrow-right"></i>
            </Link>
          </div>
          <div className="cards collections-admin">
            {collection.map((y) => (
              <div className="card" key={y._id}>
                <div
                  className="img"
                  onClick={() => navigate("/collection/" + y._id)}
                >
                  <img src={y.image} alt="collection image" />
                </div>
                <div className="text">
                  <Link to={"/collection/" + y._id}>{y.name}</Link>
                  <div className="icons-card-admin">
                    <div
                      className="delete"
                      onClick={() => deleteCollection(y._id)}
                    >
                      <i className="fa-light fa-trash"></i>
                      <span>Delete Collection</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="nftsAll admin-info">
          <div className="title">
            <h2>NFTs</h2>
            <Link to={"/admin-panel/nfts"} className="link-icon">
              view all
              <i className="fa-light fa-arrow-right"></i>
            </Link>
          </div>
          <div className="cards nfts-admin">
            {nft.map((z) => (
              <div className="card" key={z._id}>
                <div className="img" onClick={() => navigate("/nft/" + z._id)}>
                  <img src={z.image} alt="nft image" />
                </div>
                <div className="text">
                  <Link to={"/nft/" + z._id}>{z.name}</Link>
                  <div className="icons-card-admin">
                    <div className="delete" onClick={() => deleteNft(z._id)}>
                      <i className="fa-light fa-trash"></i>
                      <span>Delete NFT</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Toaster position="bottom-right" />
      </div>
    </section>
  );
}

export default AdminPanel;
