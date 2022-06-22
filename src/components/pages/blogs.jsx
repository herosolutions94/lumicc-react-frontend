import React, { useState, useEffect, Fragment } from "react";
import { getSiteImages, metaTags, getData } from "../../helpers/api";
import { Link } from "react-router-dom";
import Story from "./blog/sroty";

function Blogs() {
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState();
    useEffect(() => {
        window.scrollTo(0, 3)
        getData("blog-page").then((data) => {
            setState({
                ...state,
                content: data.content,
                metatags: data.metatags,
                blogs: data.blogs,
                featured_row: data.featured_row,
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
            <section className="blog_banner">
                <div className="contain">
                    <div className="cntnt">
                        <h1>{state.content.page_title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: state.content.detail }} />
                    </div>
                    {
                        (state != undefined && state.featured_row != undefined && state.featured_row != '' && state.featured_row != null) ?
                            <div className="blog_banner_blk">
                                <div className="left_cntnt_ban blog_story">
                                    <h1 className="heading">{state.featured_row.title}</h1>
                                    <p>{state.featured_row.text}</p>
                                    <div class="btn_blk blog_story_btn">
                                        <Link to={state.featured_row.link} className="site_btn border blank">
                                            <span>Read Story </span>
                                            <img src={getSiteImages("images/icon-arrow-right.svg")} alt="Shape" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="right_image_ban">
                                    <img src={state.featured_row.thumb} alt={state.featured_row.title} />

                                    <div className="curl_divide_shape">
                                        <img src={getSiteImages("/images/curl-shape.svg")} alt="Shape" />
                                    </div>
                                    {
                                        state.featured_row.logo != '' ?

                                            <Link to={state.featured_row.link} className="img_lbl">
                                                <img src={state.featured_row.logo} alt={state.featured_row.title} />
                                            </Link>
                                            :
                                            ""
                                    }
                                </div>
                            </div>
                            :
                            ""
                    }
                    <div className="story_crud">
                        {
                            (state != undefined && state.blogs != undefined && state.blogs.length > 0) ?
                                <Story blogs={state.blogs} />
                                :
                                <div className="alert alert-danger">No blog post(s) found yet!</div>

                        }
                    </div>
                </div>
            </section>
        </main>
    )
}
export default Blogs;