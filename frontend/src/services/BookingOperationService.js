import http from "../http-common";

const create = (data) => {
    return http.post("/booking_operations", data);
};

const update = (data) => {
    return http.put("/booking_operations/"+data.id, data);
};

const remove = (data) => {
    return http.delete("/booking_operations/"+data.id);
};

const getAll = (year) => {
    return http.get("/booking_operations?year="+year);
};

export default {
    create,
    remove,
    getAll,
    update
};