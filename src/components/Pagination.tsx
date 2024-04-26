import * as React from "react";
import { DataTable } from "react-native-paper";
import utils from "../utils/UtilsClass";

const Pagination = ({ setPage, setLimit, totalRecord, limit, page }: any) => {
  return (
    <DataTable.Pagination
      page={page}
      numberOfPages={utils.getTotalPage(totalRecord, limit) + 1}
      onPageChange={(page) => setPage(page)}
      label={`${page} of ${utils.getTotalPage(totalRecord, limit)}`}
    />
  );
};

export default Pagination;
