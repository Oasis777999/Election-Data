import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import api from "../apis/api";
import { Link } from "react-router-dom";

export const DisplayData = () => {
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 50;

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const result = await api.get("/user/list", {
        params: {
          page,
          limit,
          search: searchQuery,
        },
      });

      setTableData(result.data.data);
      setTotal(result.data.total);
    } catch (error) {
      console.error("Fetch error : ", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);

      const url = `/user/export?${params.toString()}`;

      const response = await api.get(url, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, "filtered-data.xlsx");
    } catch (error) {
      console.error("Error downloading Exel : ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page, searchQuery]);

  // Disable Right Click
    useEffect(()=>{
      const disableRightClick = (e)=>e.preventDefault();
      document.addEventListener("contextmenu", disableRightClick);

      return ()=>{
          document.removeEventListener("contextmenu", disableRightClick);
      }
    })

  return (
    <div className="page-wrapper">
      {/* HEADER */}
      <div className="data-header">
        <div className="header-grid">
          {/* Search */}
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search by name or mobile"
            value={searchQuery}
            onChange={(e) => {
              setPage(1);
              setSearchQuery(e.target.value);
            }}
          />

          <button onClick={downloadExcel} className="btn btn-outline-success">
            Download
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-primary text-center">
            <tr>
              <th>Sr</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Alt Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Pincode</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  <div className="spinner-border text-primary" />
                </td>
              </tr>
            ) : tableData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-3">
                  No records found
                </td>
              </tr>
            ) : (
              tableData.map((item, index) => (
                <tr key={item._id}>
                  <td className="text-center fw-bold">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.alternatePhone}</td>
                  <td className="break-text">{item.email}</td>
                  <td className="break-text address">{item.address}</td>
                  <td>{item.pincode}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="pagination-wrapper">
        <button
          className="btn btn-outline-primary"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span className="fw-semibold">
          Page {page} of {Math.ceil(total / limit)}
        </span>

        <button
          className="btn btn-outline-primary"
          disabled={page === Math.ceil(total / limit) || total === 0}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
