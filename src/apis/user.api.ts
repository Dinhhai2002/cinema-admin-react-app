import { ConfirmPaymentRes } from "../types/payment.type";
import { User } from "../types/user.type";
import { SuccessResponse, SuccessResponsePagination } from "../types/utils.type";
import http from "../utils/http";
import { removeNullish } from "../utils/utils";

export const USER_URL = "auth/user";

export interface Params {
  page?: number
  page_size?: number
  key_search?: string
  [key: string]: any
}

const queryConfig = {
  page: null,
  page_size: null,
  key_search: null
}
const userApi = {
  getUsers(params?: Params) {
    return http.get<SuccessResponsePagination<User[]>>(`${USER_URL}`, { params: removeNullish(params ?? queryConfig) })
  },
  getProfile(id: string) {
    return http.get<SuccessResponse<User>>(`${USER_URL}/${id}`);
  },
  deleteUser(_id: string[]) {
    return http.post(`${USER_URL}/${_id}/delete`)
  },
  updateUser(_id: string, body: Omit<User, "_id">) {
    return http.post(`${USER_URL}/${_id}/update`, body);
  },
  getHistoryBooking(id: string) {
    return http.get<SuccessResponse<ConfirmPaymentRes[]>>(
      `auth/booking/${id}/user`
    );
  },
  changePassword(body: {
    password: string;
    new_password: string;
    confirm_password: string;
  }) {
    return http.post(`auth/user/change-password`, body);
  },
};

export default userApi;
