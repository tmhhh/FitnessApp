import React from "react";
import { Image, Table, Button } from "react-bootstrap";
import Thumbnail from "../../Common/Thumbnail";
import { formatCurrency } from "../../../utils/formatCurrency";
import { fetchImage, fetchServiceImage } from "../../../assets/constants";
import ConfirmModal from "Components/Common/ConfirmModal";
export default function ListTable({ list, updateModalShow, deleteOnClick }) {
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
            <th>vendor</th>
            <th>Price</th>
            <th>slot</th>
            {/* <th>Rating</th> */}
            <th>Edit/Remove</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item._id}>
              <td>
                <Thumbnail
                  url={fetchImage(item.thumbnail, fetchServiceImage)}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.vendor}</td>
              <td>{formatCurrency(item.price)}</td>
              <td>{item.slot}</td>
              {/* <td>{item.prodRating.star}</td> */}
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* <ConfirmModal
        show={deleteConfirmShow}
        handleConfirm={handleAccept}
        handleClose={handleCloseApproveConfirm}
        heading={"DELETE SERVICE"}
        body={"💪 Are you sure ?? "}
      /> */}
    </>
  );
}
