import http from "../http-common";

const create = (data) => {
    return http.post("api/booking_operations", data);
};

const update = (data) => {
    return http.put("api/booking_operations/"+data.id, data);
};

const remove = (data) => {
    return http.delete("api/booking_operations/"+data.id);
};

const getAll = (year) => {
    return http.get("api/booking_operations?year="+year);
};

export default {
    create,
    remove,
    getAll,
    update
};