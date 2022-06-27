import React from "react";
import { Button, Table } from "react-bootstrap";
export default function CateTable({
  listCate,
  updateModalShow,
  deleteOnClick,
}) {
  return (
    <>
      <Table striped bordered hover className="text-center align-middle">
        <thead>
          <tr>
            <th>No</th>
            <th>Type</th>
            <th>Filter</th>
            <th>Edit/Remove</th>
          </tr>
        </thead>
        <tbody>
          {listCate.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.cateName}</td>
              <td>
                {item.cateFilter.map((e, index) => {
                  if (index < item.cateFilter.length - 1) {
                    return e.filterName + ", ";
                  }
                  return e.filterName;
                })}
              </td>
              <td>
                <button
                  className="common-button common-button-blue floatButton"
                  itemID={item._id}
                  onClick={() => updateModalShow("update", item._id)}
                >
                  📝
                </button>
                <button
                  className="common-button common-button-red floatButton ms-2"
                  onClick={() => deleteOnClick(item._id)}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
