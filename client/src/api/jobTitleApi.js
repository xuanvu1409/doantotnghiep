import axios from "../libs/axios";

export const getJobTitle = async () => {
    return await axios.get("/job/get-all");
}