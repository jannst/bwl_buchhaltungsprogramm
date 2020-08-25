import http from "../http-common";

const getAll = (type) => {
    if(!type) {
        return http.get("api/accounts");
    } else {
        return http.get("api/accounts?typ="+type);
    }
};

const remove = id => {
    return http.delete(`api/accounts/${id}`);
};

const create = data => {
    return http.post("api/accounts", data);
};

const update = data => {
    return http.put("api/accounts/"+data.id, data);
};


export default {
    getAll,
    create,
    update,
    remove,
};