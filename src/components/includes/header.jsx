import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { getServerImage, getData } from "../../helpers/api";
import {
    Link
} from "react-router-dom";
export default function Header(props) {
    const location = useLocation();
    const location_path = location.pathname;
    const current_page = location_path.split('/')[1];
    const [loading, setLoading] = useState(false);
    const [scroll, setScroll] = useState(false);
    const [menu, setMenu] = useState(false);
    const [service, setServiceMenu] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
        });
    }, []);
    function toggleMenu() {
        setMenu(!menu);
        setServiceMenu(false);
    }
    function handleHideMenu() {
        setMenu(false);
        setServiceMenu(false);
    }
    function handleServicesMenu() {
        setServiceMenu(!service);
    }
    function showContactPopup(e) {
        e.preventDefault();
        setMenu(false);
        setServiceMenu(false);
        props.showContactPopup();
    }
    const [state, setState] = useState({

    });
    const scrollToHashElement = () => {

        let offset = 0;
        const { hash } = window.location;
        const elementToScroll = document.getElementById(hash?.replace("#", ""));

        if (!elementToScroll) return;

        window.scrollTo({
            top: elementToScroll.offsetTop - offset,
            behavior: "smooth"
        });
    };

    useEffect(() => {

        getData("home-page").then((data) => {
            setState({
                ...state,
                site_settings: data.site_settings
            });
            setLoading(true);
            setTimeout(scrollToHashElement, 500);
        });

    }, []);
    if (loading === false) return '';
    return (

        <header className={scroll ? "ease fix" : "ease"}>
            <div className="contain">
                <div className="logo">
                    <Link to="/"><img src={getServerImage('uploads/images/', state.site_settings.site_logo)} alt={state.site_settings.site_name} /></Link>
                </div>
                <button type="button" id='toggleButton' className={(menu) ? "toggle active" : "toggle"} onClick={toggleMenu}></button>
                {
                    // (current_page === 'vendors') ?
                    <nav className="ease">
                        <div id="nav" className={(menu) ? 'active' : ''}>
                            <ul id="lst">
                                {/* <li className="" onClick={handleHideMenu}>
                                        <Link to="/">Advertisers</Link>
                                    </li>
                                    <li className="">
                                        <a href="#how_it_work" onClick={handleHideMenu}>How it works</a>
                                    </li>
                                    <li className="">
                                        <a href="#faq" onClick={handleHideMenu}>FAQ</a>
                                    </li> */}
                                <li className={(current_page === '' || current_page === 'vendors') ? 'drop _active' : 'drop'}>
                                    <a href="javascript:void(0)" onClick={handleServicesMenu}>Services</a>
                                    <ul className={service == true ? 'sub active' : 'sub'}>
                                        <li className={(current_page === '') ? '_active' : ''}>
                                            <Link to="/" onClick={handleHideMenu}>Advertisers</Link>
                                        </li>
                                        <li className={(current_page === 'vendors') ? '_active' : ''}>
                                            <Link to="/vendors" onClick={handleHideMenu}>Vendors</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className={(current_page === 'blogs' || current_page === 'blog') ? '_active' : ''} onClick={handleHideMenu}>
                                    <Link to="/blogs">Blog</Link>
                                </li>
                                <li className="">
                                    <a href="javascript:void(0)" onClick={showContactPopup}>Contact Us</a>
                                </li>



                            </ul>
                            {/* <ul id="cta">
                                    <li><a href="javascript:void(0)" className="site_btn long pop_btn" data-popup="contact" onClick={showContactPopup}>Contact us</a></li>
                                </ul> */}
                        </div>
                    </nav>
                    // :
                    // (current_page === 'blogs' || current_page === 'blog') ?

                    //     <nav className="ease">
                    //         <div id="nav" className={(menu) ? 'active' : ''}>
                    //             <ul id="lst">
                    //                 {/* <li className="" onClick={handleHideMenu}>
                    //                     <Link to="/">Advertisers</Link>
                    //                 </li>
                    //                 <li className="">
                    //                     <Link to="/vendors" onClick={handleHideMenu}>Vendors</Link>
                    //                 </li> */}
                    //                 <li className="drop">
                    //                     <a href="javascript:void(0)" onClick={handleServicesMenu}>Services</a>
                    //                     <ul className={service == true ? 'sub active' : 'sub'}>
                    //                         <li>
                    //                             <Link to="/" onClick={handleHideMenu}>Advertisers</Link>
                    //                         </li>
                    //                         <li>
                    //                             <Link to="/vendors" onClick={handleHideMenu}>Vendors</Link>
                    //                         </li>
                    //                     </ul>
                    //                 </li>

                    //                 <li className="">
                    //                     <Link to="/blogs" onClick={handleHideMenu}> Blog</Link>
                    //                 </li>

                    //                 <li className="">
                    //                     <a href="javascript:void(0)" onClick={showContactPopup}>Contact us</a>
                    //                 </li>


                    //             </ul>
                    //             {/* <ul id="cta">
                    //             <li><a href="javascript:void(0)" className="site_btn long pop_btn" data-popup="contact" onClick={showContactPopup}>Contact us</a></li>
                    //         </ul> */}
                    //         </div>
                    //     </nav>
                    //     :
                    //     <nav className="ease">
                    //         <div id="nav" className={(menu) ? 'active' : ''}>
                    //             <ul id="lst" className=''>
                    //                 <li className="drop">
                    //                     <a href="javascript:void(0)" onClick={handleServicesMenu}>Services</a>
                    //                     <ul className={service == true ? 'sub active' : 'sub'}>
                    //                         <li>
                    //                             <Link to="/" onClick={handleHideMenu}>Advertisers</Link>
                    //                         </li>
                    //                         <li>
                    //                             <Link to="/vendors" onClick={handleHideMenu}>Vendors</Link>
                    //                         </li>
                    //                     </ul>
                    //                 </li>

                    //                 <li className="">
                    //                     <Link to="/blogs" onClick={handleHideMenu}> Blog</Link>
                    //                 </li>

                    //                 <li className="">
                    //                     <a href="javascript:void(0)" onClick={showContactPopup}>Contact us</a>
                    //                 </li>


                    //             </ul>
                    //             {/* <ul id="cta">
                    //             <li><a href="javascript:void(0)" className="site_btn long pop_btn" data-popup="contact" onClick={showContactPopup}>Contact us</a></li>
                    //         </ul> */}
                    //         </div>
                    //     </nav>
                }
                <div className="clearfix"></div>
            </div>
        </header>


    )
}
