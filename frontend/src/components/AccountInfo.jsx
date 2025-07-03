function AccountInfo({ userData }) {
  return (
    <div className="card">
      <div className="header">
        <h3>{userData.AccountNumber}</h3>
        <span className={`badge ${userData.AccountStatus?.toLowerCase()}`}>
          {userData.AccountStatus}
        </span>
      </div>
      <h2 className="consumer-name">{userData.ConsumerName}</h2>
      <p className="consumer-address">{userData.ConsumerAddress}</p>
      <div className="info-row">
        <span className="info-label">Meter Number</span>
        <span className="info-value">{userData.MeterNumber}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Route Code</span>
        <span className="info-value">{userData.Route}</span>
      </div>
    </div>
  );
}

export default AccountInfo;
