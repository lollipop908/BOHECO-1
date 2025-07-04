import { useState } from "react";
import "./styles/App.css";
import "./styles/Login.css";
import "./styles/Sidebar.css";
import "./styles/AccountInfo.css";
import "./styles/LedgerTable.css";
import "./styles/Responsive.css";

import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import AccountInfo from "./components/AccountInfo";
import LedgerTable from "./components/LedgerTable";
import { fetchAccountDetails, fetchBillingHistory } from "./api/bohecoApi";

function App() {
  const [accountNumber, setAccount] = useState("");
  const [userData, setUser] = useState(null);
  const [transactionData, setTransaction] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeView, setActiveView] = useState("account");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const cleanedAccountNumber = accountNumber.trim();
    const transactionUrl = `/.netlify/functions/proxy?endpoint=get-account-by-account-number&acctNo=${cleanedAccountNumber}`
    const accountUserUrl = `/.netlify/functions/proxy?endpoint=get-latest-bills&q=${cleanedAccountNumber}`
    try {
      const [transactionRes, userRes] = await Promise.all([
        fetch(transactionUrl),
        fetch(accountUserUrl),
      ]);

      if (!transactionRes.ok || !userRes.ok) {
        throw new Error("One of the requests failed");
      }

      const transactionData = await transactionRes.json();
      const userInfo = await userRes.json();

      if (userInfo.error || transactionData.error) {
        throw new Error(userInfo.error || transactionData.error);
      }

      setUserData(userInfo);
      setTransactionDataResult(transactionData);
      setUser(user);
      setTransaction(transactions);
      setShowDashboard(true);
    } catch (err) {
      alert("Account not found or an error occurred!");
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setAccount("");
    setUser(null);
    setTransaction([]);
    setShowDashboard(false);
    setActiveView("account");
    setSidebarOpen(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading && accountNumber.length === 10) {
      fetchData();
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuClick = (view) => {
    setActiveView(view);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="app">
      {!showDashboard ? (
        <Login
          accountNumber={accountNumber}
          setAccount={setAccount}
          isLoading={isLoading}
          fetchData={fetchData}
          handleKeyPress={handleKeyPress}
        />
      ) : (
        <div className="dashboard">
          <div className="topbar">
            <button
              className={`hamburger ${sidebarOpen ? "active" : ""}`}
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
            >
              <span className="hamburger-icon">☰</span>
            </button>
            <img
              src="bohecologo.png"
              alt="Company Logo"
              className="topbar-logo-left"
            />
            <h1 className="topbar-title">BOHECO I - Bills Inquiry</h1>
          </div>

          <Sidebar
            activeView={activeView}
            handleMenuClick={handleMenuClick}
            signOut={signOut}
            sidebarOpen={sidebarOpen}
          />

          <div className="content">
            {activeView === "account" && userData && (
              <AccountInfo userData={userData} />
            )}
            {activeView === "ledger" && (
              <LedgerTable transactionData={transactionData} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
