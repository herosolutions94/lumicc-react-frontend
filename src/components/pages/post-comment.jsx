import React, { useState } from "react";
import { checkPattern, postData, objToFormData } from "../../helpers/api";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PostComment(props) {
    const [comment, setComment] = useState({
        name: '',
        email: '',
        comments: ''
    });
    const { register, handleSubmit, formState: { errors } } = useForm();
    function onSubmit() {

        if (comment.name_error === true || comment.name === '') {
            setComment({ ...comment, name_error: true, name_msg: "Required" });
        }
        else if (comment.email_error === true || comment.email === '') {
            setComment({ ...comment, email_error: true, email_error_msg: "Enter a valid email address" });
        }
        else if (comment.comment_error === true || comment.comments === '') {
            setComment({ ...comment, comment_error: true, comment_msg: "Required" });
        }
        else {
            setComment({ ...comment, btn_loading: true });
            let comment_data = objToFormData(comment)
            postData("blog-reviews", comment_data, props.blog_id).then((data) => {
                if (data.status == 1) {
                    setComment({ ...comment, btn_loading: false, email: "", name: '', comments: '' });
                    document.getElementById("comments").value = "";
                    toast.success(`${data.msg}`, {
                        position: "bottom-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else {
                    setComment({ ...comment, btn_loading: false });
                    toast.error(`${data.msg}`, {
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            });
        }
    }
    function handleCommentChange(e) {
        if (e.target.name === 'name') {
            if (e.target.value === "") {
                setComment({ ...comment, [e.target.name]: e.target.value, name_error: true, name_msg: "Required" });
            }
            else {
                setComment({ ...comment, [e.target.name]: e.target.value, name_error: false, name_msg: "" });
            }
        }

        if (e.target.name === 'email') {

            let email_chk = checkPattern(e.target.value, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/);

            if (email_chk === false) {
                if (e.target.value === '') {
                    setComment({ ...comment, email_error: false });
                }
                else {
                    setComment({ ...comment, [e.target.name]: e.target.value, email_error: true, email_error_msg: "Invalid e-mail address" });
                }

            }
            else {
                setComment({ ...comment, [e.target.name]: e.target.value, email_error: false, email_error_msg: "" });
            }

        }
        if (e.target.name === 'comments') {
            if (e.target.value === "") {
                setComment({ ...comment, [e.target.name]: e.target.value, comment_error: true, comment_msg: "Required" });
            }
            else {
                setComment({ ...comment, [e.target.name]: e.target.value, comment_error: false, comment_msg: "" });
            }
        }
    }
    return (
        <div className="post_cmnt_form">
            <h2 className="heading">Post a reply</h2>
            <ToastContainer />
            <form method="post" id="frmReport" onSubmit={handleSubmit(onSubmit)}>
                <div className="form_row row">
                    <div className="col-xs-6">
                        <div className="form_blk">
                            <p>Your name</p>
                            <input type="text" name="name" id="name" value={comment.name} onChange={handleCommentChange} className={(comment.name_error === true) ? "input error" : 'input'} />
                            {
                                (comment.name_error === true) ?
                                    <p className="error">
                                        <i className="fi-warning"></i> {comment.name_msg}
                                    </p>
                                    :
                                    ""

                            }
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="form_blk">
                            <p>Email Address</p>
                            <input type="text" name="email" id="email" value={comment.email} onChange={handleCommentChange} className={(comment.email_error === true) ? "input error" : 'input'} />
                            {
                                (comment.email_error === true) ?
                                    <p className="error">
                                        <i className="fi-warning"></i> {comment.email_error_msg}
                                    </p>
                                    :
                                    ""

                            }
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div className="form_blk">
                            <p>Leave a comment here</p>
                            <textarea name="comments" id="comments" className={(comment.comment_error === true) ? "input error" : 'input'} onChange={handleCommentChange}>{comment.comments}</textarea>
                            {
                                (comment.comment_error === true) ?
                                    <p className="error">
                                        <i className="fi-warning"></i> {comment.comment_msg}
                                    </p>
                                    :
                                    ""

                            }
                        </div>
                    </div>
                </div>
                <div class="btn_blk blog_story_btn text-center">
                    <button class="site_btn border blank" disabled={(comment.btn_loading === true) ? 'disabled' : ''}>
                        Submit Comment  {(comment.btn_loading === true) ? <i className="spinner"></i> : ''}
                    </button>
                </div>
            </form>
        </div>
    )
}
export default PostComment;