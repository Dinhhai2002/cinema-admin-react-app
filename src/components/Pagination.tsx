import * as React from "react";
import { DataTable } from "react-native-paper";
import utils from "../utils/UtilsClass";

const Pagination = ({ setPage, setLimit, totalRecord, limit, page }: any) => {
  const handleChange = (page: any) => {
    setPage(Number(page));
  };

  return (
    <DataTable.Pagination
      page={page}
      numberOfPages={3}
      onPageChange={(page: any) => {
        handleChange(page);
      }}
      label={`${page} of ${utils.getTotalPage(totalRecord, limit)}`}
    />
  );
};

export default Pagination;
