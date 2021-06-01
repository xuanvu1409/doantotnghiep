import axios from "../libs/axios";

export const getLocation = async () => {
    return await axios.get("/location/get-all");
}
