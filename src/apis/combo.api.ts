import { Combo } from "../types/combo.type";
import { SuccessResponse, SuccessResponsePagination } from "../types/utils.type";
import http from "../utils/http";
import { removeNullish } from "../utils/utils";
import { Params } from "./user.api";

const URL = 'unauth/product'

const queryConfig = {
  page: null,
  page_size: null,
  key_search: null
}

const comboApi = {
  getCombos(params?: Params) {
    return http.get<SuccessResponsePagination<Combo[]>>(`${URL}`, {
      params: removeNullish(params ?? queryConfig)
    })
  },
  createCombo(body: Combo) {
    return http.post(URL, body)
  },
  updateCombo(_id: string, body: Combo) {
    return http.post(`${URL}/${_id}/update`, body)
  },
  deleteCombo(_ids: string[]) {
    return http.post(`${URL}/delete`, _ids)
  }
}

export default comboApi
