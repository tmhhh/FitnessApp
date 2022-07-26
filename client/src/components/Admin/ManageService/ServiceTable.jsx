import { Table } from "react-bootstrap";
import { fetchImage, fetchServiceImage } from "../../../assets/constants";
import { formatCurrency } from "../../../utils/formatCurrency";
import Thumbnail from "../../Common/Thumbnail";
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
              <td>
                <button
                  className="common-button common-button-blue floatButton"
                  itemID={item._id}
                  onClick={updateModalShow}
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
