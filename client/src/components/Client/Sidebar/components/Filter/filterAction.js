import {filterFail, filterPending, filterSuccess} from "./filterSlice";
import {updateFilter} from "../../../../../api/memberApi";
import {getMember} from "../../memberSlice";

export const filterAction = (formData) => async (dispatch) => {
    try {
        dispatch(filterPending());
        await updateFilter(formData).then(res => {
            dispatch(getMember());
            dispatch(filterSuccess(res.data));
        })
    } catch (e) {
        dispatch(filterFail(e));
    }
}