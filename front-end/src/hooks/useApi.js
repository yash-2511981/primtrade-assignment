const useApi = () => {
    const makeApiCall = async (method, url, data) => {
        try {
            const res = await fetch(url, {
                method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data ? JSON.stringify(data) : null,
            });

            const result = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    error: result.message || result.error || "Request failed",
                    status: res.status,
                };
            }

            return {
                success: true,
                data: result.data,
                status: res.status,
            };
        } catch (err) {
            return {
                success: false,
                error: err.message || "Network error",
            };
        }
    };

    return {
        get: (url) => makeApiCall("GET", url),
        post: (url, data) => makeApiCall("POST", url, data),
        patch: (url, data) => makeApiCall("PATCH", url, data),
        put: (url, data) => makeApiCall("PUT", url, data),
        delete: (url) => makeApiCall("DELETE", url),
    };
};

export default useApi;