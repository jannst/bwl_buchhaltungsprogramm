import http from "../http-common";

const getAll = () => {
    return http.get("/opening_balances");
};

const create = (data) => {
    return http.post("/opening_balances", data);
};

const update = (data) => {
    return http.post("/opening_balances/"+data.id, data);
};

export default {
    getAll,
    create,
    update
};