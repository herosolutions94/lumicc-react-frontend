import React from "react";
import { getSiteImages } from "../../helpers/api";

function Comment(props) {

    return (
        <div className="blog_cmnt">
            <h4>Comments</h4>
            <div className="cmnt_outer">
                {
                    props != undefined && props.reviews.length > 0 ?
                        props.reviews.map((review, index) => (
                            <div className="main_cmnt_blk" key={index}>
                                <div className="inner_cmnt_lst">
                                    <div className="flex">
                                        <div className="img_icon">
                                            <img src={review.thumb} alt={review.name} />
                                        </div>
                                        <div className="txt">
                                            <h4>{review.name}</h4>
                                            <p>{review.time_ago}</p>
                                        </div>
                                    </div>
                                    <p>{review.comment}</p>
                                </div>
                                {
                                    review.replies != undefined && review.replies.length > 0 ?
                                        review.replies.map((reply, r_index) => (

                                            <div className="inner_cmnt_lst" key={r_index}>
                                                <div className="flex">
                                                    <div className="img_icon site_logo_image">
                                                        <img src={reply.thumb} alt={reply.name} />
                                                    </div>
                                                    <div className="txt">
                                                        <h4>{reply.name}</h4>
                                                        <p>{reply.time_ago}</p>
                                                    </div>
                                                </div>
                                                <p>{reply.reply}</p>
                                            </div>
                                        ))
                                        :
                                        ""
                                }

                            </div>
                        ))
                        :
                        ""
                }

            </div>
        </div>
    )
}
export default Comment;