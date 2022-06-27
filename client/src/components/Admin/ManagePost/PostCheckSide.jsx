import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory, useParams} from "react-router";
import {editPost} from "../../../redux/slices/postSlice";
import ConfirmModal from "../../Common/ConfirmModal";
import Post from "../../Post/Post";

export default function PostCheckSide() {
    const history = useHistory();
    const dispatch = useDispatch();
    const postId = useParams().postId;
    const [approveConfirmShow, setApproveConfirmShow] = useState(false);
    const [rejectConfirmShow, setRejectConfirmShow] = useState(false);

    const handleCloseApproveConfirm = () => setApproveConfirmShow(false);
    const handleCloseRejectConfirm = () => setRejectConfirmShow(false);

    const handleAccept = async () => {
        await dispatch(editPost({postId, body: {status: "approved"}}));
        handleCloseApproveConfirm();
        history.push("/admin/post");
    };
    const handleReject = async () => {
        await dispatch(editPost({postId, body: {status: "rejected"}}));
        handleCloseRejectConfirm();
        history.push("/admin/post");
    };

    return (
        <div className="position-relative">
            <ConfirmModal
                show={approveConfirmShow}
                handleConfirm={handleAccept}
                handleClose={handleCloseApproveConfirm}
                heading={<h3 style={{color: "#55bb55", fontWeight: "bold"}}>Approve this post 📮</h3>}
            />
            <ConfirmModal
                show={rejectConfirmShow}
                handleConfirm={handleReject}
                handleClose={handleCloseRejectConfirm}
                heading={<h3 style={{color: "#ff5454", fontWeight: "bold"}}>Reject this post 📮</h3>}
            />
            <div className="approve-section common-float">
                <h2 style={{fontWeight: "bold"}}>Process this post stick <i className="fas fa-check-circle" style={{color: "#55bb55"}}></i> </h2>
                <div className="d-flex justify-content-end mt-4">
                    <button className="common-outline-button" onClick={() => setApproveConfirmShow(true)}>Approve</button>
                    <button className="ms-2 common-button common-button-red" onClick={() => setRejectConfirmShow(true)}>Reject</button>
                </div>
            </div>

            <Post/>
        </div>
    );
}
