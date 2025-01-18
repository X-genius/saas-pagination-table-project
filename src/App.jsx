import "./table.css";
import axios from "axios";
import { useEffect, useState } from "react";

export const fetchUsers = async (BASE_URL) => {
  return (await axios.get(`${BASE_URL}`))?.data;
};

function App() {
  const TOTAL_DATA_PER_PAGE = 5;
  const URL =
    "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";
  const [paginationData, setPaginationData] = useState([]);
  const [saasUsers, setSaasUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const goOnFirstPage = () => {
    setCurrentPage(1);
  };

  const goOnPrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  };
  const goOnNextPage = () => {
    if (currentPage === paginationData.length / TOTAL_DATA_PER_PAGE) return;
    setCurrentPage((prev) => prev + 1);
  };

  const goOnLastPage = () => {
    setCurrentPage(Math.round(paginationData.length / TOTAL_DATA_PER_PAGE) + 1);
  };

  const getSaaSUsers = async () => {
    setIsLoading(true);
    const res = await fetchUsers(URL);
    setIsLoading(false);
    setPaginationData(res);
    setSaasUsers(res?.slice(0, TOTAL_DATA_PER_PAGE));
  };

  useEffect(() => {
    const start = (currentPage - 1) * TOTAL_DATA_PER_PAGE;
    const end = currentPage * TOTAL_DATA_PER_PAGE;
    setSaasUsers(paginationData.slice(start, end));
  }, [currentPage]);

  useEffect(() => {
    getSaaSUsers();
  }, []);

  return (
    <>
      <h1 id="header-message">SaaS Table Pagination Assignment</h1>
      <div id="container">
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Percentage funded</th>
              <th>Amount pledged</th>
            </tr>
          </thead>
          <tbody>
            {saasUsers.map((user) => (
              <tr key={user["s.no"]}>
                <td>{user["s.no"]}</td>
                <td>{user["percentage.funded"]}</td>
                <td>{user["amt.pledged"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <section>
          <button
            onClick={goOnFirstPage}
            disabled={isLoading || currentPage === 1}
          >
            {"<<"}
          </button>
          <button
            onClick={goOnPrevPage}
            disabled={isLoading || currentPage === 1}
          >
            {"<"}
          </button>
          <>
            {currentPage} of {""}
            {Math.round(paginationData.length / TOTAL_DATA_PER_PAGE) + 1}
          </>
          <button
            onClick={goOnNextPage}
            disabled={isLoading || saasUsers.length < TOTAL_DATA_PER_PAGE}
          >
            {">"}
          </button>
          <button
            onClick={goOnLastPage}
            disabled={isLoading || saasUsers.length < TOTAL_DATA_PER_PAGE}
          >
            {">>"}
          </button>
        </section>
      </div>
    </>
  );
}

export default App;
