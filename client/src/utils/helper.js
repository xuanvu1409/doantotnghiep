export const togglePassword = () => {
    const x = document.getElementsByClassName("js-toggle-password")[0];
    const changeIcon = document.getElementById("changePassIcon");
    changeIcon.className = "tio-hidden-outlined";
    if (x.type === "password") {
        x.type = "text";
        document.getElementById("changePassIcon").className = "tio-visible-outlined";
    } else {
        x.type = "password";
        document.getElementById("changePassIcon").className = "tio-hidden-outlined";
    }
}

export const toTimestamp = (year, month, day) => {
    const datum = new Date(Date.UTC(year, month - 1, day));
    return datum.getTime() / 1000;
}

export const toDate = (strTimestamp) => {
    const date = new Date(strTimestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    return hours + '/' + minutes.substr(-2) + '/' + seconds.substr(-2);
}

export const getImage = (urlImg) => {
    return process.env.REACT_APP_IMAGE_URL + urlImg;
}

export const titleCase = (str) => {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}

export const loadScript = (src) => {
    let tag = document.createElement('script');
    tag.async = false;
    tag.src = src;
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(tag);
}
