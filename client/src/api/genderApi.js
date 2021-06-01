import axios from "../libs/axios";

export const getGender = async () => {
    return await axios.get("/gender/get-all");
}
