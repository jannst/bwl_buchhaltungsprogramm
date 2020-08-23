import http from "../http-common";

const get = (year) => {
    return http.get("/running_number/" + year);
};

export default {
    get,
};