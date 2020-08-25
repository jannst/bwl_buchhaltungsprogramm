import http from "../http-common";

const getAll = (year) => {
    return http.get("api/opening_balances?year="+year);
};

const create = (data) => {
    return http.post("api/opening_balances", data);
};

const update = (data) => {
    return http.put("api/opening_balances/"+data.id, data);
};

export default {
    getAll,
    create,
    update
};