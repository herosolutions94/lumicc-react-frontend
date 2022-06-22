import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { getSiteImages, projectUrl } from "../../../helpers/api";

const options = {
    margin: 0,
    responsiveClass: true,
    nav: true,
    navText: ['<div className="arrow-left"><img src="' + getSiteImages("/images/story/left.svg") + '" alt="" /></div>', '<div className="arrow-right"><img src="' + getSiteImages("/images/story/right.svg") + '" alt="" /></div>'],
    dots: false,
    margin: 20,
    items: 3,
    loop: true,

    // touchDrag: false,
    // mouseDrag:true,
    responsive: {
        0: {
            items: 2,
            autoplay: true,
            smartSpeed: 1000,
            autoHeight: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
        },
        1030: {
            items: 3,
            autoplay: true,
            smartSpeed: 1000,
            autoHeight: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
        },
        992: {
            items: 2,
            autoplay: true,
            smartSpeed: 1000,
            autoHeight: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
        },
        580: {
            items: 1,
            autoplay: false,
            autoWidth: true,
        },
        390: {
            items: 1,
            autoplay: false,
            autoWidth: true
        }
        ,
        375: {
            items: 1,
            autoplay: false,
            autoWidth: true
        }
    },
};

let settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 4000,
    variableWidth: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
        {
            breakpoint: 1030,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};
function RelatedBlog(props) {
    return (
        <section className="related_blog">
            <div className="wrapper">
                <div className="contain">
                    <div className="top_head">
                        <h4 className="heading">Other blog like this</h4>
                    </div>
                    <div id="slick-blog" className="blog_story slick-carousel other-blog">
                        <OwlCarousel className="owl-theme" {...options}>
                            {

                                props.blogs.map((blog, index) => (
                                    <div className="item" key={index}>
                                        <div className="inner">
                                            <a href={projectUrl(blog.link)} className="image">
                                                <img src={blog.thumb} alt={blog.title} />
                                                {
                                                    (blog.logo != '') ?
                                                        <div className="img_lbl">
                                                            <img src={blog.logo} alt={blog.title} />
                                                        </div>
                                                        :
                                                        ""
                                                }
                                            </a>
                                            <div className="txt blog_story">
                                                <h3>
                                                    <a href={projectUrl(blog.link)}>{blog.title}</a>
                                                </h3>
                                                <p>{blog.text}</p>
                                                <div class="btn_blk blog_story_btn">
                                                    <a href={projectUrl(blog.link)} className="site_btn border blank">
                                                        <span>Read Story </span>
                                                        <img src={getSiteImages("/images/icon-arrow-right.svg")} alt="Shape" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default RelatedBlog;