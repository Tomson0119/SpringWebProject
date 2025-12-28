class HttpRequestWrapper {
    httpRequest;
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    getRequest() {
        return this.httpRequest;
    }
}
export function isWpErrorResponse(response) {
    return response.status >= 400;
}
export function get(path, queryParams = null, additionalHeaders = null) {
    let finalPath = path;
    if (queryParams != null) {
        finalPath += "?";
        Object.keys(queryParams).forEach((key) => {
            const value = queryParams[key];
            finalPath += `${key}=${value}&`;
        });
        finalPath = finalPath.slice(0, -1);
    }
    return sendHttpRequest(finalPath, "get", null, additionalHeaders);
}
export function post(path, request, additionalHeaders = null) {
    return sendHttpRequest(path, "post", new HttpRequestWrapper(request), additionalHeaders);
}
function sendHttpRequest(path, method, httpRequestWrapper, additionalHeaders) {
    var request = httpRequestWrapper?.getRequest() ?? null;
    var headers = {
        "Content-Type": "application/json",
        ...additionalHeaders,
    };
    return fetch(path, {
        method: method,
        headers: headers,
        body: request != null ? JSON.stringify(request) : null,
    });
}
