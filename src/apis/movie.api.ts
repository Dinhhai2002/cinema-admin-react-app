import { Movie, MovieListConfig } from "../types/movie.type";
import { SuccessResponse, SuccessResponsePagination } from "../types/utils.type";
import http from "../utils/http";

const URL = "unauth/movie";

const movieApi = {
  getMovies(params: MovieListConfig) {
    return http.get<SuccessResponsePagination<Movie[]>>(URL, {
      params: params,
    });
  },
  getMovieDetail(id: string) {
    return http.get<SuccessResponse<Movie>>(`${URL}/${id}`);
  },
  updateMovie(_id: string, body: any) {
    return http.post(`${URL}/${_id}/update`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  deleteMovie(_ids: string[]) {
    return http.post(`${URL}/delete`, _ids)
  }
};

export default movieApi;
