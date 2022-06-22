import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import { getSiteImages } from '../../../helpers/api';
import Pagination from './pagination';
function Story(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);

    //get Current posts
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = props.blogs.slice(indexOfFirstPost, indexOfLastPost);
    // const paginate = (pageNumber) => setCurrentPage(pageNumber);
    function paginate(pageNumber) {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 3)
    }
    return (
        <Fragment>
            <div className="story_flex">
                {
                    (props != undefined && props.blogs != undefined && currentPosts.length > 0) ?
                        currentPosts.map((blog, index) => (
                            <div className="col" key={index}>
                                <div className="inner">
                                    <Link to={blog.link} className="image">
                                        <img src={blog.thumb} alt={blog.title} />
                                        {
                                            blog.logo != '' ?

                                                <div className="img_lbl">
                                                    <img src={blog.logo} alt={blog.titlt} />
                                                </div>
                                                :
                                                ""
                                        }
                                    </Link>
                                    <div className="txt blog_story">
                                        <h3>
                                            <Link to={blog.link}>{blog.title}</Link>
                                        </h3>
                                        <p>{blog.text}</p>
                                        <div class="btn_blk blog_story_btn">
                                            <Link to={blog.link} className="site_btn border blank">
                                                <span>Read Story </span>
                                                <img src={getSiteImages("/images/icon-arrow-right.svg")} alt="Link Shape" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        ))
                        :
                        <div className='alert alert-danger'>No Blog Post(s) found!</div>
                }
            </div>
            <Pagination postsPerPage={postPerPage} totalPosts={props.blogs.length} paginate={paginate} currentPage={currentPage} />
        </Fragment>
    );
}
export default Story;