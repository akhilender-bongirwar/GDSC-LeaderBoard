import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";

const Table = () => {
  const TABLE_HEAD = ["#", "Username", "Score", "Roll No", "Break_down"];
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const fetchData = async () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const response = await fetch(
      `https://sheetdb.io/api/v1/5u7hjxu35r5pk?limit=100&sort_by=Score&sort_order=desc&offset=${startIndex}&limit=${10}`
    );
    const jsonData = await response.json();
    setData(jsonData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const fetchTotalPages = async () => {
      const response = await fetch("https://sheetdb.io/api/v1/5u7hjxu35r5pk");
      const jsonData = await response.json();
      const totalRecords = jsonData.length;
      const calculatedTotalPages = Math.ceil(totalRecords / itemsPerPage);
      setTotalPages(calculatedTotalPages);
    };

    fetchTotalPages();
  }, []);

  return (
    <>
      <Card className="h-full w-full overflow-x-auto">
        <div className="min-w-full">
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 p-2 sm:p-2 md:p-2 lg:p-2 xl:p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map(({ Username, Score, RNo }, index) => (
                  <tr key={index}>
                    <td className="p-2 sm:p-2 md:p-2 lg:p-2 xl:p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {(page - 1) * itemsPerPage + index + 1}
                      </Typography>
                    </td>
                    <td className="p-2 sm:p-2 md:p-2 lg:p-2 xl:p-4">
                      <Typography variant="small" className="font-normal">
                        {Username}
                      </Typography>
                    </td>
                    <td className="p-2 sm:p-2 md:p-2 lg:p-2 xl:p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Score || " "}
                      </Typography>
                    </td>
                    <td className="p-2 sm:p-2 md:p-2 lg:p-2 xl:p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {RNo || " "}
                      </Typography>
                    </td>
                    <td className="p-2 sm:p-2 md:p-2 lg:p-2 xl:p-4">
                      <button
                        aria-describedby={id}
                        variant="contained"
                        onClick={handleClick}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold 
  py-2 px-4 sm:py-1 sm:px-3 md:py-2 md:px-4 rounded-lg shadow-md"
                      >
                        View Score
                      </button>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      >
                        <Typography sx={{ p: 2 }}>
                          <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 rounded-l-lg"
                                  >
                                    Adherence to Guidelines (10)
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                    Creativity (20)
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                    Timing (5)
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                    Elegant CSS (15)
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                    Code Quality (5)
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 rounded-r-lg"
                                  >
                                    Overall Impression (5)
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="text-center dark:bg-gray-800">
                                  <th
                                    scope="row"
                                    className="px-6 py-4 dark:text-white rounded-l-lg"
                                  >
                                    10
                                  </th>
                                  <td className="dark:text-white px-6 py-4">
                                    20
                                  </td>
                                  <td className="dark:text-white px-6 py-4">
                                    5
                                  </td>
                                  <td className=" dark:text-white  px-6 py-4">
                                    15
                                  </td>
                                  <td className="dark:text-white px-6 py-4">
                                    5
                                  </td>
                                  <td className="dark:text-white px-6 py-4 rounded-r-lg">
                                    5
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </Typography>
                      </Popover>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Stack>
      </div>
    </>
  );
};

export default Table;
