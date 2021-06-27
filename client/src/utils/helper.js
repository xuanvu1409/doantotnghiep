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

export const getImage = (urlImg) => {
    return process.env.REACT_APP_IMAGE_URL + urlImg;
}

export const titleCase = (str) => {
    if (str) {
        let splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }
    return "Unknown";
}

export const loadScript = (src) => {
    let tag = document.createElement('script');
    tag.async = false;
    tag.src = src;
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(tag);
}
