import React from "react";
import { Image, Table, Button } from "react-bootstrap";

// export const list = [
//   {
//     id: 1,
//     name: "huyle",
//     price: 1,
//     quantity: 1,
//     category: "",
//     description: "Hello my friend",
//     thumbnailFile: "",
//     imagesFile: [],
//   },
//   {
//     id: 2,
//     image:
//       "https://clothing-app-server.herokuapp.com/images/product/kaki-jacket.jpg",
//     name: "Mass",
//     weight: "5 lbs",
//     date: "cu",
//   },
// ];

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
                <Button
                  variant="warning"
                  className="myButton"
                  itemID={item.id}
                  onClick={updateModalShow}
                >
                  🛠
                </Button>
                <Button variant="danger" className="myButton ms-2">
                  🗑
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
