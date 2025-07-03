function LedgerTable({ transactionData }) {
  return (
    <div className="ledger-container">
      {transactionData.length > 0 ? (
        <div className="ledger-wrapper">
          <div className="ledger-header">
            <div className="header-cell">Bill Number</div>
            <div className="header-cell">kWh Used</div>
            <div className="header-cell">Amount Due</div>
            <div className="header-cell">Surcharges</div>
            <div className="header-cell">Total Amount Due</div>
            <div className="header-cell">Due Date</div>
          </div>
          <div className="ledger-body">
            {transactionData.map((item, i) => (
              <div key={i} className="ledger-row">
                <div className="ledger-cell" data-label="Bill Number">
                  {item.BillNumber}
                </div>
                <div className="ledger-cell" data-label="kWh Used">
                  {item.PowerKWH}
                </div>
                <div className="ledger-cell" data-label="Amount Due">
                  ₱{parseFloat(item.NetAmount).toFixed(2)}
                </div>
                <div className="ledger-cell" data-label="Surcharges">
                  ₱
                  {parseFloat(
                    item.NetAmountPaid != null ? "0.00" : item.Surcharges
                  ).toFixed(2)}
                </div>
                <div className="ledger-cell" data-label="Total Amount Due">
                  ₱
                  {(
                    parseFloat(item.NetAmount) +
                    (item.NetAmountPaid == null
                      ? parseFloat(item.Surcharges)
                      : 0)
                  ).toFixed(2)}
                </div>
                <div className="ledger-cell date-cell" data-label="Due Date">
                  <span className="date-text">
                    {new Date(item.DueDate)
                      .toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })
                      .toUpperCase()}
                  </span>
                  <span
                    className={`payment-status ${
                      item.NetAmountPaid != null ? "paid" : "unpaid"
                    }`}
                  >
                    {item.NetAmountPaid != null ? "✔" : "✖"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="no-data-message">
          No billing history available at this time.
        </p>
      )}
    </div>
  );
}

export default LedgerTable;