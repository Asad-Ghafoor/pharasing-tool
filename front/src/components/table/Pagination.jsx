import { ArrowBackRounded, ArrowForwardRounded, ArrowBackIosNewRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import usePagination from "@mui/material/usePagination/usePagination";
import React from "react";

const Pagination = ({
  defaultPage,
  count,
  totalPages,
  page,
  size,
  onPageChange,
  itemsPerPage,
}) => {
  const { items } = usePagination({
    page: page,
    defaultPage: defaultPage,
    count: totalPages,
    onChange: onPageChange,
    boundaryCount: 1,
  });

  let prevButton = items[0];
  let nextButton = items[items.length - 1];

  return (
    <>
      {/* Navigation for XS SCREEN */}
      <Box sx={{ display: { sm: "none", xs: "flex" }, justifyContent: "space-between" }}>
        <Box>
          {prevButton.type == "previous" && (
            <Button
              onClick={(e) => onPageChange(e, Number(page - 1))}
              disabled={page <= 1 || count <= itemsPerPage}
              variant="outline-navigation"
            >
              <ArrowBackIosNewRounded />
            </Button>
          )}
        </Box>
        <Box>
          {nextButton.type == "next" && (
            <Button
              onClick={(e) => onPageChange(e, Number(page + 1))}
              variant="outline-navigation"
              disabled={page == totalPages || count <= itemsPerPage}
            >
              <ArrowForwardIosRounded />
            </Button>
          )}
        </Box>
      </Box>
      {/* Navigation for All Screens other than XS */}
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", sm: "end" },
        }}
      >
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {prevButton.type == "previous" && (
            <Button
              onClick={(e) => onPageChange(e, Number(page - 1))}
              disabled={page <= 1 || count <= itemsPerPage}
              variant="outline-navigation"
            >
              <ArrowBackIosNewRounded />
            </Button>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
          {items.map(({ page, type, selected, ...item }, index) => {
            let pages = null;
            if (type === "start-ellipsis" || type === "end-ellipsis") {
              pages = (
                <Typography key={index} variant="regular-text" color="primary">
                  …
                </Typography>
              );
            } else if (type === "page") {
              pages = (
                <Button
                  key={index}
                  type="button"
                  style={{
                    fontWeight: selected ? "bold" : undefined,
                    background: "none",
                    border: selected ? "0.5px solid #836FFC" : "0.5px solid #A7A7A7",
                    cursor: "pointer",
                    fontSize: "14px",
                    minHeight: "40px",
                    minWidth: "40px",
                    borderRadius: "3px",
                    backgroundColor: selected ? "#836FFC" : "transparent",
                    color: selected ? "#FFFFFF" : "#ACB2B9",
                  }}
                  {...item}
                >
                  <Typography variant="regular-text">{page}</Typography>
                </Button>
              );
            }

            return (
              <Box key={index}>
                {pages}
              </Box>
            );
          })}
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {nextButton.type == "next" && (
            <Button
              onClick={(e) => onPageChange(e, Number(page + 1))}
              variant="outline-navigation"
              disabled={page == totalPages || count <= itemsPerPage}
            >
              <ArrowForwardIosRounded />
            </Button>
          )}
        </Box>
      </Box >
    </>
  );
};

export default Pagination;
