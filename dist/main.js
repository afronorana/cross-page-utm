// Step 1: Capture UTM Parameters
function getUTMParameters() {
    const params = {};
    window.location.search.substring(1).split("&").forEach(function (item) {
        const couple = item.split("=");
        if (couple[0].startsWith("utm_")) {
            params[couple[0]] = decodeURIComponent(couple[1]);
        }
    });
    return params;
}

// Step 2: Store UTM Parameters
function storeUTMParameters(params) {
    for (const key in params) {
        sessionStorage.setItem(key, params[key]);
    }
}

const utmParams = getUTMParameters();

if (Object.keys(utmParams).length > 0) {
    storeUTMParameters(utmParams);
}

// Step 3: Append UTM Parameters to URLs
function appendUTMParametersToLinks() {
    const utmParams = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach(function (key) {
        const value = sessionStorage.getItem(key);
        if (value) {
            utmParams[key] = value;
        }
    });

    const utmQueryString = Object.keys(utmParams).map(key => `${key}=${encodeURIComponent(utmParams[key])}`).join('&');

    if (utmQueryString) {
        document.querySelectorAll('a').forEach(function (link) {
            if (link.href && new URL(link.href).hostname === window.location.hostname) { // Append only for internal links
                // Parse existing query parameters of the link
                const linkParams = new URLSearchParams(new URL(link.href).search);
                let shouldAppend = false;

                // Check each UTM parameter to see if it already exists in the link
                for (const [key, value] of Object.entries(utmParams)) {
                    if (!linkParams.has(key)) {
                        shouldAppend = true; // If at least one UTM param is missing, we should append the UTM string
                        break;
                    }
                }

                // Append the UTM query string if necessary
                if (shouldAppend) {
                    link.href += (link.href.indexOf('?') === -1 ? '?' : '&') + utmQueryString;
                }
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", appendUTMParametersToLinks);

