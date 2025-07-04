const e = React.createElement;

function SmartOptionsApp() {
  const [rows, setRows] = React.useState(Array(5).fill(blankRow()));

  function blankRow() {
    return {
      date: "",
      trade: "",
      contract: "",
      identifier: "",
      amount: "",
      premium: "",
      status: ""
    };
  }

  const inferPrefix = (trade) => {
    const t = trade.toLowerCase();
    if (/put|call/.test(t)) {
      const type = /put/.test(t) ? "Put" : "Call";
      const action = /sell/.test(t) ? "Sell" : "Sell";
      return `Option - ${type} - ${action}`;
    } else if (/buy/.test(t)) return "Stock - Buy";
    else if (/sell/.test(t)) return "Stock - Sell";
    else if (/dividend/.test(t)) return "Cash - Dividend";
    return "Other";
  };

  const normalize = (str) => str.replace(/[^A-Z0-9]/gi, "").toUpperCase();

  const generateIdentifiers = () => {
    const contractToId = {};
    const prefixCounts = {};
    const updated = [...rows];

    for (let i = updated.length - 1; i >= 0; i--) {
      const row = updated[i];
      const trade = row.trade || "";
      const contract = row.contract || "";

      if (["Canceled", "Voided"].includes(contract.trim())) {
        row.identifier = "Canceled";
        row.status = "Canceled";
        continue;
      }

      let found = "";
      const key = normalize(contract);
      if (contractToId[key]) {
        found = contractToId[key];
      }

      if (found) {
        row.identifier = found;
      } else {
        const prefix = inferPrefix(trade);
        if (!prefixCounts[prefix]) prefixCounts[prefix] = 0;
        prefixCounts[prefix]++;
        const newId = `${prefix} - ${prefixCounts[prefix].toString().padStart(4, "0")}`;
        row.identifier = newId;
        contractToId[key] = newId;
      }

      row.status = computeStatus(row);
    }

    setRows(updated);
  };

  const computeStatus = (row) => {
    const c = row.contract.toLowerCase();
    if (c.includes("assigned")) return "Assigned";
    if (c.includes("expired")) return "Expired";
    if (c.includes("canceled") || c.includes("voided")) return "Canceled";
    if (/\d+\s+(contract|contracts)/i.test(c)) return "Open";
    return "";
  };

  const computeAmount = (row) => {
    const j = parseFloat(row.premium);
    const k = parseFloat(row.amount);
    const match = /\d+\s+(contract|contracts)/i.test(row.contract);
    if (!isNaN(j) && !isNaN(k) && match) {
      return (j * k * 100).toFixed(2);
    }
    return "";
  };

  const updateRow = (index, field, value) => {
    const copy = [...rows];
    copy[index][field] = value;
    setRows(copy);
  };

  return e("div", { className: "container" },
    e("button", { onClick: generateIdentifiers }, "Generate Identifiers"),
    ...rows.map((row, i) =>
      e("div", { key: i, className: "card" },
        ["date", "trade", "contract", "amount", "premium"].map((field) =>
          e("input", {
            placeholder: field,
            value: row[field],
            onChange: (ev) => updateRow(i, field, ev.target.value)
          })
        ),
        e("div", {}, `Identifier: ${row.identifier}`),
        e("div", {}, `Status: ${row.status}`),
        e("div", {}, `Calc Amount: ${computeAmount(row)}`)
      )
    )
  );
}

const domNode = document.getElementById("root");
const root = ReactDOM.createRoot(domNode);
root.render(e(SmartOptionsApp));
