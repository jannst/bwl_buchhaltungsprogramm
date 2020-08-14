import http from "../http-common";

const getAll = (type) => {
    if(!type) {
        return http.get("/accounts");
    } else {
        return http.get("/accounts?typ="+type);
    }
};

const remove = id => {
    return http.delete(`/accounts/${id}`);
};

const create = data => {
    return http.post("/accounts", data);
};

const update = data => {
    return http.put("/accounts/"+data.id, data);
};


export default {
    getAll,
    create,
    update,
    remove,
};