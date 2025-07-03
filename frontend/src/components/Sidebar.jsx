function Sidebar({ activeView, handleMenuClick, signOut, sidebarOpen }) {
  return (
    <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <div
        className={`menu-item ${activeView === "account" ? "active" : ""}`}
        onClick={() => handleMenuClick("account")}
        tabIndex={0}
        onKeyPress={(e) => e.key === "Enter" && handleMenuClick("account")}
      >
        <span>Account Info</span>
      </div>
      <div
        className={`menu-item ${activeView === "ledger" ? "active" : ""}`}
        onClick={() => handleMenuClick("ledger")}
        tabIndex={0}
        onKeyPress={(e) => e.key === "Enter" && handleMenuClick("ledger")}
      >
        <span>Ledger</span>
      </div>
      <div
        className="menu-item sign-out"
        onClick={signOut}
        tabIndex={0}
        onKeyPress={(e) => e.key === "Enter" && signOut()}
      >
        <span>Sign Out</span>
      </div>
    </div>
  );
}

export default Sidebar;
