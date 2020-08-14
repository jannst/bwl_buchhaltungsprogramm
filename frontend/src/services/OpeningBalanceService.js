import http from "../http-common";

const getAll = (year) => {
    return http.get("/opening_balances?year="+year);
};

const create = (data) => {
    return http.post("/opening_balances", data);
};

const update = (data) => {
    return http.put("/opening_balances/"+data.id, data);
};

export default {
    getAll,
    create,
    update
};