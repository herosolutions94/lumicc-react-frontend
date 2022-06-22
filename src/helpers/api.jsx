
import { Helmet } from "react-helmet";
import axios from "axios";
let project_url = '';
let project_ap_url = '';
let hostname = window.location.hostname;
if (hostname === 'localhost') {
    project_url = 'http://localhost:3000/';
    // project_ap_url = process.env.REACT_APP_SITE_API_DOMAIN;
    project_ap_url = "http://beta.lumicc.com/lumicApi/";
}
else if (hostname === 'lumicc.herosolutions.com.pk') {
    project_url = "http://lumicc.herosolutions.com.pk/";
    project_ap_url = "http://beta.lumicc.com/lumicApi/";
}
else if (hostname === 'lumicc.com' || hostname === 'www.lumicc.com') {
    project_url = "https://lumicc.com/";
    project_ap_url = "https://lumicc.com/lumicApi/";
}
else if (hostname === 'beta.lumicc.com' || hostname === 'www.beta.lumicc.com') {
    project_url = "http://beta.lumicc.com/";
    project_ap_url = "http://beta.lumicc.com/lumicApi/";
}
else {
    project_url = "https://lumicc.herosolutions.com.pk/";
    project_ap_url = "https://lumicc.com/lumicApi/";
}
const headers = {
    "Content-Type": "application/json",
    // Authorization: token,
};
export function objToFormData(obj) {
    var form_data = new FormData();
    for (var key in obj) {
        if (Array.isArray(obj[key])) {
            for (let [keyv, value] of Object.entries(obj[key])) {
                form_data.append(key + "[]", JSON.stringify(value));
            }

            //form_data.append(key + "[]", obj[key]);
        } else {
            if (typeof obj[key] == "object") {
                form_data.append(key, JSON.stringify(obj[key]));
            } else {
                form_data.append(key, obj[key]);
            }
        }

    }
    return form_data;
}
export function projectUrl(path) {
    return project_url + path;
}
export function shareFacebook(url, title) {
    window.open('https://www.facebook.com/share.php?u=' + url + '&title=' + title, 'sharer', 'toolbar=0,status=0,width=548,height=325,top=170,left=400');
}
export function shareLinkedin(url, title, text, site_name) {
    window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title + '&summary=' + text + '&source=' + site_name);
}
export function shareTwitter(url, title) {
    window.open('https://twitter.com/intent/tweet?text=' + title + '&url=' + url);
}
export function shareGoogle(url, title) {
    window.open('https://plus.google.com/share?url=' + url + '&title=' + title, 'sharer', 'toolbar=0,status=0,width=548,height=325,top=170,left=400');
}
export function sharePinterest(url, image, title) {
    window.open('https://pinterest.com/pin/create/button/?url=' + url + '&media=' + image + '&description=' + title, 'sharer', 'toolbar=0,status=0,width=548,height=325,top=170,left=400');
}
export function shareWhatsapp(title) {
    document.location = 'whatsapp://send?text=' + title;
}
export function metaTags(page) {
    return (
        <Helmet>
            <title>{page.page_name}</title>
            <meta name="title" content={page.meta_title} />
            <meta name="description" content={page.meta_description} />
            <link rel="canonical" href={project_url + page.page_url} />
            <meta property="og:url" content={project_url + page.page_url} />
            <meta property="og:title" content={page.meta_title} />
            <meta property="og:description" content={page.meta_description} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={page.site_name} />
            <meta property="og:image" content={page.site_thumbnail} />

        </Helmet>
    )
}
export function getSiteImages(path) {
    return project_url + path;
}
export function checkPattern(string, pattern) {
    // Allow A-Z, a-z, 0-9 and underscore. Min 1 char.
    var re = /^[a-zA-Z0-9_]+$/;

    return pattern.test(string);
}
export async function postData(method, data, parameters = null) {
    let u;
    parameters === null
        ? (u = project_ap_url + method)
        : (u = project_ap_url + method + "/" + parameters);

    return axios
        .post(u, data, {
            headers: headers,
        })
        .then((res) => {
            return res.data;
        });
}
export function getYoutubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
}
export function short_text(text, length = 25) {
    if (text.length > length) {
        let str = text.substring(0, length);
        return str + "...";
    }
    else {
        return text
    }

}
export function checkUrl(url) {
    if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
    }
    return url;
}
export function getServerImage(path, image = null, type = null) {

    if (image === null || image === '') {
        return project_ap_url + "assets/images/no-image.svg";
    }
    else {
        if (type == null || type === '') {
            return project_ap_url + path + image;
        }
        else {
            if (fileExtension(image) === 'svg') {
                return project_ap_url + path + image;
            }
            else {
                return project_ap_url + path + type + image;
            }

        }

    }

}
export function getServerVideo(path, image = null, type = null) {

    if (image === null || image === '') {
        return project_url + "videos/404.mp4";
    }
    else {
        if (type == null || type === '') {
            return project_ap_url + path + image;
        }
        else {
            if (fileExtension(image) === 'svg') {
                return project_ap_url + path + image;
            }
            else {
                return project_ap_url + path + type + image;
            }

        }

    }

}
export function fileExtension(filename) {
    return filename.split('.').pop();
}
export async function getData(method, parameters = null) {
    let u;
    parameters === null
        ? (u = project_ap_url + method)
        : (u = project_ap_url + method + "/" + parameters);

    const token = localStorage.getItem("token");
    let result;

    const response = await fetch(u, {
        method: "get", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });

    const data = await response.json();
    return data;
}
