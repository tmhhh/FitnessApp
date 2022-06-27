import React from "react";
import { Image, Table, Button } from "react-bootstrap";

export default function ListTable({ list, updateModalShow }) {
  return (
    <>
      <Table striped bordered hover className="text-center align-middle">
        <thead>
          <tr>
            {Object.keys(list[0]).map((key) => (
              <th>{key}</th>
            ))}
            <th>Edit/Remove</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item._id}>
              {Object.entries(item).map((field) =>
                field[0] === "prodThumbnail" ? (
                  <td>
                    <Image
                      src={field[1]}
                      thumbnail
                      style={{ width: 100, height: 100 }}
                    />
                  </td>
                ) : (
                  <td>
                    {field[0] === "prodRating" ? field[1].star : field[1]}
                  </td>
                )
              )}
              {/*field[0] is field name && 1 is field value*/}
              <td>
                <button
                  className="common-button common-button-blue floatButton"
                  itemID={item.id}
                  onClick={updateModalShow}
                >
                  📝
                </button>
                <button className="common-button common-button-red floatButton ms-2">
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
