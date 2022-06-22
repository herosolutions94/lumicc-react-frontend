import React from 'react'
import { Link } from "react-router-dom";
import { getSiteImages } from '../../../helpers/api';
export default function Pagination(props) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="pagination_flex">
            {
                pageNumbers.length > 1 ?
                    <ul className="pagination">
                        {
                            pageNumbers.map(number => (
                                <li key={number} className={props.currentPage === number ? 'active' : ''}>
                                    <a href="javascript:void(0)" onClick={() => props.paginate(number)} className='page-link'>{number}</a>
                                </li>
                            ))
                        }

                        {
                            props.currentPage < pageNumbers.length ?

                                <li>
                                    <div class="btn_blk blog_story_btn">
                                        <a href="javascript:void(0)" onClick={() => props.paginate(parseInt(props.currentPage + 1))} className="site_btn border blank">
                                            <span>Next </span>
                                            <img src={getSiteImages("/images/icon-arrow-right.svg")} alt="Next" />
                                        </a>
                                    </div>
                                </li>
                                :
                                <li className='paginate-disable' disabled>
                                    <div class="btn_blk blog_story_btn">
                                        <a className="site_btn border blank" disabled>
                                            <span>Next </span>
                                            <img src={getSiteImages("/images/icon-arrow-right.svg")} alt="Next" />
                                        </a>
                                    </div>
                                </li>
                        }
                    </ul>
                    :
                    ""
            }
        </div>
    )
}
