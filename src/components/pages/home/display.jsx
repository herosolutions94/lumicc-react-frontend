import React, { Fragment, useState } from 'react'
import { getSiteImages, getServerImage, getData, short_text } from "../../../helpers/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const options = {
    margin: 0,
    responsiveClass: true,
    nav: true,
    dots: false,

    items: 4,
    loop: true,

    // touchDrag: false,
    // mouseDrag:true,
    responsive: {
        0: {
            items: 3,
            autoplay: true,
            smartSpeed: 1000,
            autoHeight: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
        },
        1030: {
            items: 4,
            autoplay: true,
            smartSpeed: 1000,
            autoHeight: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
        },
        992: {
            items: 4,
            autoplay: true,
            smartSpeed: 1000,
            autoHeight: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
        },
        580: {
            items: 2,
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
export default function Display(props) {
    const [state, setState] = useState({
        displayPopup: false,
    });
    const showPopup = (case_study) => {
        setState({ ...state, displayPopup: true, case_study: case_study });
    };
    const closePopup = () => {
        setState({ ...state, displayPopup: false, case_study: null });
    };
    return (
        <section id="display">
            <div className="wrapper">
                <div className="contain">
                    <div className="top_head">
                        <h2 className="heading">{props.heading}</h2>
                    </div>
                    <div id="slick-serve" className="slick-carousel desktop_services">
                        <OwlCarousel className="owl-theme" {...options}>
                            {
                                (props.casestudies != undefined && props.casestudies.length > 0) ?
                                    props.casestudies.map((case_study, c_index) => (
                                        <div className="item" key={c_index}>
                                            <div className="case_blk">
                                                <div className="lbl_case">
                                                    <h5>{case_study.price}<sub>{case_study.day}</sub></h5>
                                                </div>
                                                <button className="expand pop_btn" data-popup="display" onClick={() => showPopup(case_study)}><img src={getSiteImages("images/icon-expand.svg")} alt="Popup Shape" />
                                                </button>
                                                <div className="fig" style={{ backgroundImage: "url('" + getServerImage('uploads/casestudies/', case_study.image, 'thumb_') + "')" }} onClick={() => showPopup(case_study)}></div>
                                                <div className="txt">
                                                    <h5>{case_study.title}</h5>
                                                    <div dangerouslySetInnerHTML={{ __html: case_study.details }} />
                                                    <div className="text-center">
                                                        <a href="javascript:void(0)" className="site_btn purple" onClick={props.contactPopup}>{case_study.button_text}</a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    ""
                            }


                        </OwlCarousel>
                    </div>
                    <div id="slick-serve" className="slick-carousel mobile_services scrollbar">

                        {
                            (props.casestudies != undefined && props.casestudies.length > 0) ?
                                props.casestudies.map((case_study, c_index) => (
                                    <div className="item" key={c_index}>
                                        <div className="case_blk">
                                            <div className="lbl_case">
                                                <h5>{case_study.price}<sub>{case_study.day}</sub></h5>
                                            </div>
                                            <button className="expand pop_btn" data-popup="display" onClick={() => showPopup(case_study)}><img src={getSiteImages("images/icon-expand.svg")} alt="Popup Shape" />
                                            </button>
                                            <div className="fig" style={{ backgroundImage: "url('" + getServerImage('uploads/casestudies/', case_study.image, 'thumb_') + "')" }} onClick={() => showPopup(case_study)}></div>
                                            <div className="txt">
                                                <h5>{case_study.title}</h5>
                                                <div dangerouslySetInnerHTML={{ __html: short_text(case_study.details, 130) }} />
                                                <div className="text-center">
                                                    <a href="javascript:void(0)" className="site_btn purple" onClick={props.contactPopup}>{case_study.button_text}</a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))
                                :
                                ""
                        }
                    </div>

                </div>
            </div>


            {
                (state.displayPopup === true && state.case_study !== null) ?
                    <div className="popup lg" data-popup="display" style={{ display: "block" }}>
                        <div className="table_dv">
                            <div className="table_cell">
                                <div className="contain">
                                    <div className="_inner">
                                        <button type="button" className="x_btn" onClick={closePopup}></button>
                                        <div className="img_blk">
                                            <img src={getServerImage('uploads/casestudies/', state.case_study.image, 'large_')} alt={state.case_study.title} />
                                        </div>
                                        <div className="data">
                                            <h5>Campaign Types</h5>
                                            <span className="site_btn md simple round">{state.case_study.type}</span>

                                            <div className="br"></div>
                                            <h5>Campaign Management Services</h5>
                                            <div class="btn_blk">
                                                {
                                                    state.case_study.services.map((service, s_index) => (
                                                        <span class="site_btn md simple round" key={s_index}>{service.service}</span>
                                                    ))
                                                }
                                            </div>
                                            <div class="br"></div>
                                            <h5>Project Description</h5>
                                            <div dangerouslySetInnerHTML={{ __html: state.case_study.details }} />
                                            <hr></hr>
                                            <div className="btm_blk">
                                                <div className="txt">
                                                    <h5>Campaign Management</h5>
                                                    <p>{state.case_study.date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    ""

            }
        </section>
    )
}
