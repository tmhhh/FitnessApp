import React from "react";
import { Image, Table, Button } from "react-bootstrap";
import Thumbnail from "../Common/Thumbnail";
import { PROD_IMAGE_BASE_URL } from "../../assets/constants";
import { formatCurrency } from "../../utils/formatCurrency";
export default function ListTable({
  productList,
  updateModalShow,
  deleteOnClick,
  handleShowProductDiscountModal,
}) {
  return (
    <>
      <Table
        responsive
        striped
        bordered
        hover
        className="text-center align-middle"
      >
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Rating</th>
            <th>Edit/Remove</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((item) => (
            <tr key={item._id}>
              <td>
                <Thumbnail
                  url={`${PROD_IMAGE_BASE_URL}${item.prodThumbnail}`}
                />
              </td>
              <td>{item.prodName}</td>
              <td>{item.prodCategory?.cateName.cateName}</td>
              <td>{formatCurrency(item.prodPrice)}</td>
              <td>{item.prodQuantity}</td>
              <td>{item.prodRating.star !== 0 && item.prodRating.star}</td>
              <td>
                <Button
                  variant="warning"
                  className="myButton"
                  itemID={item._id}
                  onClick={updateModalShow}
                >
                  🛠
                </Button>
                <Button
                  variant="danger"
                  className="myButton ms-2"
                  onClick={() => deleteOnClick(item._id)}
                >
                  🗑
                </Button>
                <Button
                  onClick={() => handleShowProductDiscountModal(item)}
                  variant="info"
                  className="myButton ms-2"
                >
                  <i className="fas fa-percentage"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
