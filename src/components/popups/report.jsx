import React, { Fragment, useState } from "react";
import { checkPattern, postData, getSiteImages, objToFormData } from "../../helpers/api";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "rc-slider/assets/index.css";
import Slider, { createSliderWithTooltip } from "rc-slider";

export default function Report(props) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [toggle, setToggle] = useState(false);
    function toggleForm() {
        setToggle(!toggle);
        props.changeBanner();
    }
    const [report, setReport] = useState({
        name: '',
        email: '',
        phone: '',
        channel: [],
        website: '',
        location: '',
        goal: '',
        method: '',
        budget: 1
    });
    function onReportSubmit() {
        if (report.name_error === true || report.name === '') {
            setReport({ ...report, name_error: true, name_msg: "Required" });
        }
        else if (report.email_error === true || report.email === '') {
            setReport({ ...report, email_error: true, email_error_msg: "Enter a valid email address" });
        }
        else if (report.phone_error === true || report.phone === '') {
            setReport({ ...report, phone_error: true, phone_msg: "Enter a valid phone number" });
        }
        else if (report.website_error === true || report.website === '') {
            setReport({ ...report, website_error: true, website_error_msg: "Enter a valid website" });
        }

        else {
            setReport({ ...report, btn_loading: true });

            let report_data = objToFormData(report)
            postData("report-post", report_data).then((data) => {
                if (data.status == 1) {
                    document.getElementById("frmreport").reset();

                    setReport({ ...report, btn_loading: false });
                    setReport({ ...report, email: "", name: '', phone: '', website: '', location: '', goal: '', channel: [], method: '', budget: 1 });
                    toast.success(`${data.msg}`, {
                        position: "bottom-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    setTimeout(function () {
                        setToggle(false);
                        window.scrollTo(0, 3)
                    }, 2000);
                }
                else {
                    setReport({ ...report, btn_loading: false });
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
    function handleChannelChange(channel) {
        var newArr = report.channel;
        var index = newArr.indexOf(channel);
        if (index !== -1) {
            newArr.splice(index, 1);
            setReport({ ...report, channel: newArr, channel_error: false });
        }
        else {
            newArr.push(channel);
            setReport({ ...report, channel: newArr, channel_error: false });
        }

    }
    function onSliderChange(budget) {
        setReport({ ...report, budget: budget });
    }
    function handleReportChange(e) {
        if (e.target.name === 'name') {
            if (e.target.value === "") {
                setReport({ ...report, [e.target.name]: e.target.value, name_error: true, name_msg: "Required" });
            }
            else {
                setReport({ ...report, [e.target.name]: e.target.value, name_error: false, name_msg: "" });
            }
        }
        else if (e.target.name === 'phone') {
            if (e.target.value === "") {
                setReport({ ...report, [e.target.name]: e.target.value, phone_error: true, phone_msg: "Required" });
            }
            else {
                if (e.target.value != null || e.target.value != 'null') {
                    let mobile_chk = checkPattern(e.target.value, /^[0-9\b]+$/);
                    if (mobile_chk === false) {
                        setReport({ ...report, [e.target.name]: e.target.value, phone_error: true, phone_msg: "Invalid phone number" });
                    }
                    else {
                        setReport({ ...report, [e.target.name]: e.target.value, phone_error: false, phone_msg: "" });
                    }
                }

            }
        }
        else if (e.target.name === 'email') {

            let email_chk = checkPattern(e.target.value, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/);

            if (email_chk === false) {
                if (e.target.value === '') {
                    setReport({ ...report, [e.target.name]: e.target.value, email_error: false });
                }
                else {
                    setReport({ ...report, [e.target.name]: e.target.value, email_error: true, email_error_msg: "Invalid e-mail address" });
                }

            }
            else {
                setReport({ ...report, [e.target.name]: e.target.value, email_error: false, email_error_msg: "" });
            }

        }

        else if (e.target.name === 'website') {
            let web_chk = checkPattern(e.target.value, /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z\A-Z0-9]+([\-\.]{1}[a-z\A-Z0-9]+)*\.[a-z\A-Z]{2,6}(:[0-9]{2,5})?(\/.*)?$/);

            if (web_chk === false) {
                if (e.target.value === '') {
                    setReport({ ...report, website_error: true, [e.target.name]: e.target.value, website_error_msg: "Required" });
                }
                else {
                    setReport({ ...report, [e.target.name]: e.target.value, website_error: true, website_error_msg: "Enter a valid website address" });
                }
            }
            else {
                setReport({ ...report, [e.target.name]: e.target.value, website_error: false });
            }
        }
        else {
            setReport({ ...report, [e.target.name]: e.target.value });
        }





    }

    return (


        <form method="post" id="frmreport" onSubmit={handleSubmit(onReportSubmit)} className="homeForm">
            <ToastContainer />
            <div className="form_row row">
                <div className="col-xs-12">
                    <div className="form_blk">
                        <input type="text" name="name" id="name" value={report.name} onChange={handleReportChange} className={(report.name_error === true) ? "input error" : 'input'} placeholder="Name" />
                        {
                            (report.name_error === true) ?
                                <p className="error">
                                    <i className="fi-warning"></i> {report.name_msg}
                                </p>
                                :
                                ""

                        }
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className="form_blk">
                        <input type="text" name="phone" id="phone" value={report.phone} onChange={handleReportChange} className={(report.phone_error === true) ? "input error" : 'input'} placeholder="Phone Number" />
                        {
                            (report.phone_error === true) ?
                                <p className="error">
                                    <i className="fi-warning"></i> {report.phone_msg}
                                </p>
                                :
                                ""

                        }
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className="form_blk">
                        <input type="text" name="email" id="email" value={report.email} onChange={handleReportChange} className={(report.email_error === true) ? "input error" : 'input'} placeholder="Email" />
                        {
                            (report.email_error === true) ?
                                <p className="error">
                                    <i className="fi-warning"></i> {report.email_error_msg}
                                </p>
                                :
                                ""

                        }
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className="form_blk">

                        <input type="text" name="website" id="website" value={report.website} onChange={handleReportChange} className={(report.website_error === true) ? "input error" : 'input'} placeholder="Company Website" />
                        {
                            (report.website_error === true) ?
                                <p className="error">
                                    <i className="fi-warning"></i> {report.website_error_msg}
                                </p>
                                :
                                ""

                        }
                    </div>
                </div>
                {
                    (toggle === true) ?
                        <Fragment>
                            <div className="col-xs-12">
                                <div className="form_blk addition_details">
                                    <h3>Additional details (optional) </h3>
                                    <p>Additional details may help us find more information on your business</p>
                                </div>
                            </div>


                            <div className="col-xs-12">
                                <div className="form_blk">
                                    <h6 className="form_check_lbl">Campaign Budget <span class="badge green">{"$ " + report.budget}</span></h6>
                                    <div className="form_blk">
                                        <div className="slider_values flex">
                                            <span>$1</span>
                                            <span>$10,000 +</span>
                                        </div>
                                        <Slider
                                            min={0}
                                            max={10000}
                                            value={report.budget}
                                            onChange={onSliderChange}
                                            tipFormatter={value => `${value}`}
                                            railStyle={{
                                                height: 4,
                                                background: "rgba(6, 3, 62, 0.15)"
                                            }}
                                            handleStyle={{
                                                height: 28,
                                                width: 28,
                                                // marginLeft: -14,
                                                marginTop: -14,
                                                backgroundColor: "#00A87B",
                                                border: 0
                                            }}
                                            trackStyle={{
                                                background: "none"
                                            }}
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className="col-xs-12">
                                <div className="form_blk">
                                    <select name="goal" id="goal" className="input" onChange={handleReportChange}>
                                        <option value="">What is your goal for this campaign?</option>
                                        <option value="Increase brand awareness.">Increase brand awareness.</option>
                                        <option value="Generate high-quality leads.">Generate high-quality leads.</option>
                                        <option value="Acquire new customers.">Acquire new customers.</option>
                                        <option value="Increase website traffic.">Increase website traffic.</option>
                                        <option value="Establish industry authority.">Establish industry authority.</option>
                                        <option value="Increase customer value.">Increase customer value.</option>
                                        <option value="Boost brand engagement.">Boost brand engagement.</option>
                                        <option value="Increase revenue.">Increase revenue.</option>
                                        <option value="Improve internal brand.">Improve internal brand.</option>
                                    </select>

                                </div>
                            </div>

                            <div className="col-xs-12">
                                <div className="form_blk">
                                    <input type="text" name="location" id="location" value={report.location} onChange={handleReportChange} className="input" placeholder="Location" />
                                    <div className="location_img">
                                        <img src={getSiteImages("/images/marker.svg")} alt="location" />
                                    </div>
                                </div>

                            </div>

                            <div className="col-xs-12">
                                <div className="form_blk">
                                    <h6 className="form_check_lbl">Preferred method of communication</h6>
                                    <div className="flex lbl_flex">
                                        <div className="lbl_btn">
                                            <input type="radio" name="method" value="call" onChange={handleReportChange} id="method_call" />
                                            <label htmlFor="method_call">Call</label>
                                        </div>
                                        <div className="lbl_btn">
                                            <input type="radio" name="method" value="sms" onChange={handleReportChange} id="method_sms" />
                                            <label htmlFor="method_sms">SMS</label>
                                        </div>
                                        <div className="lbl_btn">
                                            <input type="radio" name="method" value="email" onChange={handleReportChange} id="method_email" />
                                            <label htmlFor="method_email">Email</label>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="col-xs-12 channelCol">
                                <div className="form_blk">
                                    <h6 className="form_check_lbl">Which channel(s) are you most interested in?</h6>
                                    <div className="flex lbl_flex">
                                        <div className="lbl_btn">
                                            <input type="checkbox" name="channel[]" value="display" onChange={() => handleChannelChange('display')} id="channel_display" />
                                            <label htmlFor="channel_display">Display</label>
                                        </div>
                                        <div className="lbl_btn">
                                            <input type="checkbox" name="channel[]" value="ooh" onChange={() => handleChannelChange('ooh')} id="channel_ooh" />
                                            <label htmlFor="channel_ooh">OOH</label>
                                        </div>
                                        <div className="lbl_btn">
                                            <input type="checkbox" name="channel[]" value="dooh" onChange={() => handleChannelChange('dooh')} id="channel_dooh" />
                                            <label htmlFor="channel_dooh">DOOH</label>
                                        </div>
                                        <div className="lbl_btn">
                                            <input type="checkbox" name="channel[]" value="all" onChange={() => handleChannelChange('all')} id="channel_all" />
                                            <label htmlFor="channel_all">All</label>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </Fragment>
                        :
                        ""
                }



            </div>
            <div className="btn_blk form_btn text-center">
                {
                    toggle === false ?
                        <a className="site_btn lg long purple" href="javascript:void(0)" onClick={() => toggleForm()}>Create my free report</a>
                        :
                        <button className="site_btn lg long purple" disabled={(report.btn_loading === true) ? 'disabled' : ''}>Create my free report {(report.btn_loading === true) ? <i className="spinner"></i> : ''}</button>
                }
            </div>
        </form>

    )
}
