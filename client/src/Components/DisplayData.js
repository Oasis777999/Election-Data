import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import api from "../apis/api";

export const DisplayData = () => {
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = localStorage.getItem("user");
  const user = isLogin ? JSON.parse(isLogin) : null;

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

    const params = {};
    if (searchQuery?.trim()) {
      params.search = searchQuery.trim();
    }

    const response = await api.get("/user/export", {
      params,
      responseType: "blob",
      timeout: 60000, // ⏱️ important for large files
    });

    saveAs(response.data, "filtered-data.xlsx");
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else if (error.code === "ECONNABORTED") {
      console.error("Download timeout");
    } else {
      console.error("Excel download error:", error);
    }
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    getData();
  }, [page, searchQuery, limit]);

  // Disable Right Click
  useEffect(()=>{
    const disableRightClick = (e)=>e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    return ()=>{
        document.removeEventListener("contextmenu", disableRightClick);
    }
  })

  return (
    <div className="page-wrapper no-select">
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

          {user?.isSuperAdmin && (
            <button
              onClick={downloadExcel}
              className="btn btn-outline-success"
              disabled={loading}
            >
              {loading ? "Downloading..." : "Download"}
            </button>
          )}
        </div>
        <div className="d-flex justify-content-end align-items-center gap-2 my-3">
          <label className="fw-semibold mb-0">Show</label>

          <select
            className="form-select form-select-sm w-auto"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
          </select>

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
