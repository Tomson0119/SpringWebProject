class HttpRequestWrapper {
    readonly httpRequest: any;

    constructor(httpRequest: any) {
        this.httpRequest = httpRequest;
    }

    getRequest() {
        return this.httpRequest;
    }
}

export function isWpErrorResponse(response: Response): boolean {
    return response.status >= 400;
}

export function get(
    path: string,
    queryParams: Record<string, string> | null = null,
    additionalHeaders: Record<string, string> | null = null
): Promise<Response> {
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

export function post(path: string, request: any, additionalHeaders: Record<string, string> | null = null): Promise<Response> {
    return sendHttpRequest(path, "post", new HttpRequestWrapper(request), additionalHeaders);
}

function sendHttpRequest(
    path: string,
    method: string,
    httpRequestWrapper: HttpRequestWrapper | null,
    additionalHeaders: Record<string, string> | null
): Promise<Response> {
    var request = httpRequestWrapper?.getRequest() ?? null;

    var headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...additionalHeaders,
    };

    return fetch(path, {
        method: method,
        headers: headers,
        body: request != null ? JSON.stringify(request) : null,
    });
}
