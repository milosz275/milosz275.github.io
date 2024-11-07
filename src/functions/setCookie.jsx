export const setCookie = (name, value, options = {}) => {
    if (!name || /^(?:\s|%20)+$/.test(name)) {
        return;
    }

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.expires instanceof Date) {
        cookieString += `; expires=${options.expires.toUTCString()}`;
    }

    if (options.path) {
        cookieString += `; path=${options.path}`;
    }

    if (options.domain) {
        cookieString += `; domain=${options.domain}`;
    }

    if (options.secure) {
        cookieString += "; secure";
    }

    cookieString += `; SameSite=Strict`;

    document.cookie = cookieString;
};
