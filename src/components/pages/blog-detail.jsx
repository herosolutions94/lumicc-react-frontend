import React, { useState, useEffect, Fragment } from "react";

import { getSiteImages, metaTags, getData, shareFacebook, shareTwitter, shareLinkedin } from "../../helpers/api";
import { Link, useLocation } from "react-router-dom";
import RelatedBlog from "./home/related-blog";
import Comment from './comment';
import PostComment from './post-comment';
function BlogDetail() {
    const location = useLocation()
    const pathname = location.pathname;
    const url_params = pathname.split("/");
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState();
    useEffect(() => {
        window.scrollTo(0, 3)
        getData("blog-details", url_params[2] + "/" + url_params[3]).then((data) => {
            setState({
                ...state,
                row: data.row,
                metatags: data.metatags,
                related: data.related,
                reviews: data.reviews,
                site_settings: data.site_settings
            });
            setLoading(true);
        });
    }, []);
    if (loading === false) return <div id="loading"> <img src={getSiteImages('/images/loading.gif')} alt="Loading" /></div>;
    return (
        <main className="blog_bg">
            {
                metaTags(state.metatags)
            }
            <section className="blog_detail_banner" style={{ backgroundImage: "url('" + state.row.thumb + "')" }}>
                <div className="contain">
                    <div className="cntnt">
                        <div class="lbl_page">
                            <Link to="/blogs">Blog</Link>
                            <img src={getSiteImages("/images/story/icon-caret-right.svg")} alt="Shape" />
                            <p>{state.row.title}</p>
                        </div>
                        <h1 className="heading">{state.row.title}</h1>
                        <div className="auther_blk">
                            <div className="img_ico">
                                <img src={state.row.author_dp} alt={state.row.author_name} />
                            </div>
                            <div className="auther_txt">
                                <h5>{state.row.author_name}</h5>
                                <p>{state.row.date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog_detail_blk">
                <div className="contain">
                    <div className="detail_editor ck_editor">
                        <div dangerouslySetInnerHTML={{ __html: state.row.detail }} />
                    </div>
                    <div className="share_article_blk">
                        <h4>Share this article:</h4>
                        <div className="social_media">
                            {/* <a href="javascript:void(0)">
                                <img src={getSiteImages("/images/story/instagram.svg")} alt="instagram" />
                            </a> */}
                            <a href="javascript:void(0)" onClick={() => shareFacebook(state.row.link, state.row.title)}>
                                <img src={getSiteImages("/images/story/facebook.svg")} alt="facebook" />
                            </a>
                            <a href="javascript:void(0)" onClick={() => shareTwitter(state.row.link, state.row.title)}>
                                <img src={getSiteImages("/images/story/twitter.svg")} alt="Twitter" />
                            </a>
                            <a href="javascript:void(0)" onClick={() => shareLinkedin(state.row.link, state.row.title, state.row.short_detail, state.site_settings.site_name)}>
                                <img src={getSiteImages("/images/story/linkedin.svg")} alt="Linkedin" />
                            </a>
                        </div>

                    </div>
                    {
                        (state.reviews != undefined && state.reviews.length > 0) ?
                            <Comment reviews={state.reviews} />
                            :
                            ""
                    }
                    <PostComment blog_id={state.row.id} />
                </div>
            </section>
            <RelatedBlog blogs={state.related} />

        </main>
    )
}
export default BlogDetail;