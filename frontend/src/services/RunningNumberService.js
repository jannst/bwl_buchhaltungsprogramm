import http from "../http-common";

const get = (year) => {
    return http.get("api/running_number/" + year);
};

export default {
    get,
};