import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Table = () => {
  const TABLE_HEAD = ["#", "Username", "Score", "Roll No"];
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);

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
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {/* Ranking System */}
                  {(page - 1) * itemsPerPage + index + 1}
                </Typography>
              </td>
              <td className="p-2 sm:p-2 md:p-2 lg:p-2 xl:p-4">
                <Typography variant="small" className="font-normal">
                  {Username}
                </Typography>
              </td>
              <td className="p-2 sm:p-2 md:p-2 lg:p-2 xl:p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {Score || ' '}
                </Typography>
              </td>
              <td className="p-2 sm:p-2 md:p-2 lg:p-2 xl:p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {RNo || ' '}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</Card>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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