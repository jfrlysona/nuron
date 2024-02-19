import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./index.scss"
export default function PaginationRounded({
  setCurrentPage,
  currentPage,
  totalPages,
}) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        variant="outlined"
        shape="rounded"
        className="pagination"
        size="large"
        defaultPage={1}
        siblingCount={2}
        boundaryCount={0}
        page={currentPage}
        onChange={(e, newPage) => setCurrentPage(newPage)}
      />
    </Stack>
  );
}
