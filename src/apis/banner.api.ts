import { Banner } from "../types/banner.type";
import { SuccessResponse, SuccessResponsePagination } from "../types/utils.type";
import http from "../utils/http";

const URL = "unauth/banner";

const bannerApi = {
  getBanners() {
    return http.get<SuccessResponsePagination<Banner[]>>(URL);
  },
  deleteBanner(_ids: string[]) {
    return http.post(`${URL}/delete`, _ids)
  },
  updateBanner(_id: string, body: Banner) {
    return http.post(`${URL}/${_id}/update`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
};

export default bannerApi;
