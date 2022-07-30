import React, {useEffect, useRef, useState} from "react";
import {Container} from "react-bootstrap";
import PostForm from "./PostForm";
import {useDispatch, useSelector} from "react-redux";
import {createPost, editPost} from "../../redux/slices/postSlice";
import {useHistory} from "react-router";
import {Button} from "antd";

const initialValues = {
    title: "",
    hashtag: [],
    thumbnail: "",
    thumbnailFile: "",
    content: {},
};
export default function PostCrud({postId}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const formRef = useRef(null);
    const [post, setPost] = useState(initialValues);
    const listPost = useSelector((state) => state.postReducer?.listPost);
    useEffect(() => {
        if (postId) {
            const post = listPost.find((post) => post._id === postId);
            setPost(post);
        }
    }, [listPost, postId]);
    const onSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    };
    const handleSubmit = async (body) => {
        if (postId) {
            await dispatch(editPost({postId, body}));
            history.push("/blog");
        } else {
            await dispatch(createPost(body));
            history.push("/blog");
        }
    };

    const back = () => {
        history.goBack();
    }
    return (
        <>
            <Container
                style={{marginTop: "100px", marginBottom: "100px", width: "900px"}}
            >
                <Button className='px-0 mb-4' style={{fontSize: 18}} type="link" onClick={back}><i
                    className="far fa-arrow-alt-circle-left me-2"></i> Back</Button>
                <div className="d-flex justify-content-between">
                    {postId ? (
                        <h1> 📝 Change for the new things</h1>
                    ) : (
                        <h1> ✍ Write your post </h1>
                    )}
                    <div className="approve-section common-float" style={{backgroundColor: 'black'}}>
                        <h2 style={{fontWeight: "bold", color: 'white'}}>Publish your post <i
                            className="fas fa-check-circle" style={{color: "#55bb55"}}></i></h2>
                        <div className="d-flex justify-content-end mt-4">
                            <button
                                className="common-button common-button-blue"
                                style={{borderRadius: "5px", height: '40px', width: '100px'}}
                                onClick={onSubmit}
                            >
                                <i className="far fa-paper-plane"></i> Publish
                            </button>
                        </div>
                    </div>
                </div>
                <hr/>
                <PostForm
                    innerRef={formRef}
                    handleSubmit={handleSubmit}
                    initialValues={post}
                />
            </Container>
        </>
    );
}
