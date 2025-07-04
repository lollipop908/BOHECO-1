function Login({
  cleanedAccountNumber,
  accountNumber = cleanedAccountNumber,
  setAccount,
  isLoading,
  fetchData,
  handleKeyPress,
}) {
  return (
    <div className="login-container">
      <div className="login-title-container">
        <img
          src="/bohecologo.png"
          alt="Company Logo"
          className="login-logo-left"
        />
        <h3 className="login-title">BOHECO I</h3>
      </div>
      <input
        type="text"
        placeholder="Enter 10-digit Account Number"
        value={accountNumber}
        onChange={(e) => setAccount(e.target.value.replace(/\D/g, ""))}
        onKeyPress={handleKeyPress}
        maxLength={10}
        className={accountNumber.length === 10 ? "valid" : ""}
      />
      <button
        className="login-button"
        onClick={fetchData}
        disabled={isLoading || accountNumber.length !== 10}
      >
        {isLoading ? <span className="spinner"></span> : "Sign In"}
      </button>
    </div>
  );
}

export default Login;
