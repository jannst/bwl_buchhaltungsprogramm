import http from "../http-common";

const create = (data) => {
    return http.post("/booking_operations", data);
};

const update = (data) => {
    return http.put("/booking_operations/"+data.id, data);
};

const getAll = (year) => {
    return http.get("/booking_operations?year="+year);
};

export default {
    create,
    getAll,
    update
};