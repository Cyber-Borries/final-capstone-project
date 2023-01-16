//this component is to add stock, only admins can access this

import React, { useState, useEffect } from "react";
import "./AddStock.css";

export default function AddStock(props) {
  const [currentStock, setCurrentStock] = useState([]);
  const [addStockItem, setAddStockItem] = useState({});

  const authToken = sessionStorage.getItem("token");

  const changeHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetch("http://localhost:8080/stock/view", {
      headers: { Authorization: "Bearer " + authToken },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("typeof response", typeof response);
        setCurrentStock(response);
      });
  }, []);

  const removeItem = (e) => {
    const id = e.target.dataset.id;
    console.log("dataset id", id);
    console.log(e.target);
    fetch(`http://localhost:8080/stock/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-type": "application/json;",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        let old = [...currentStock];
        let deleteIndex = e.target.dataset.indexid;
        console.log("deleteindex", deleteIndex);
        currentStock.splice(deleteIndex, 1);
        setCurrentStock([...currentStock]);
        console.log("response in delte", response);
        alert(`Removed stock item`);
      });
  };

  const addStock = () => {
    fetch("http://localhost:8080/stock/add", {
      method: "PUT",
      headers: {
        Authorization: "Bearer ",
        "Content-type": "application/json",
      },
      body: JSON.stringify(addStockItem),
    })
      .then((res) => res.json())
      .then((response) => {
        setCurrentStock(response);
      });
  };

  console.log(typeof currentStock);

  return (
    <>
      <div className="AddStock-main-container">
        <h2>
          Welcome, <span className="name">{props.userName}</span>. Please add
          the stock needed
        </h2>
        <div className="AddStock-container">
          <form className="AddStock-form" onSubmit={addStock}>
            <label>Item ID</label>
            <input
              placeholder="Add item's ID"
              onChange={(e) =>
                setAddStockItem((prevItem) => ({
                  ...prevItem,
                  pId: e.target.value,
                }))
              }
            />
            <label>Item name</label>
            <input
              placeholder="Add item's name"
              onChange={(e) =>
                setAddStockItem((prevItem) => ({
                  ...prevItem,
                  pName: e.target.value,
                }))
              }
            />
            <label>Item Quantity</label>
            <input
              placeholder="Add quantity"
              type="number"
              onChange={(e) =>
                setAddStockItem((prevItem) => ({
                  ...prevItem,
                  pQuantity: e.target.value,
                }))
              }
            />
            <button className="AddStock-button buttons">Submit</button>
          </form>
        </div>
      </div>
      <div className="viewStock-container">
        <table>
          <tbody>
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Item Quantity</th>
              <th></th>
            </tr>
            {currentStock?.map((item, index) => (
              <>
                <tr>
                  <td>{item.productID}</td>
                  <td>{item.productName}</td>
                  <td>{item.productQuantity}</td>
                  <td>
                    <button
                      className="delete-btn btn"
                      data-id={item._id}
                      data-indexid={index}
                      onClick={(e) => removeItem(e)}
                    >
                      Delete Item
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
