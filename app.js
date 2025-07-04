<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2113.65">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Times; color: #000000; -webkit-text-stroke: #000000}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Times; color: #000000; -webkit-text-stroke: #000000; min-height: 14.0px}
    span.s1 {font-kerning: none}
  </style>
</head>
<body>
<p class="p1"><span class="s1">const { useState } = React;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">function SmartOptionsApp() {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>const [rows, setRows] = useState(new Array(5).fill(null).map(blankRow));</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>function blankRow() {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>return {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>date: "",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>trade: "",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>contract: "",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>identifier: "",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>amount: "",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>premium: "",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>status: ""</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>};</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>const inferPrefix = (trade) =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const t = trade.toLowerCase();</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if (/put|call/.test(t)) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>const type = /put/.test(t) ? "Put" : "Call";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>const action = /sell/.test(t) ? "Sell" : "Sell";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>return `Option - ${type} - ${action}`;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>} else if (/buy/.test(t)) return "Stock - Buy";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>else if (/sell/.test(t)) return "Stock - Sell";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>else if (/dividend/.test(t)) return "Cash - Dividend";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>return "Other";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>};</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>const normalize = (str) =&gt; str.replace(/[^A-Z0-9]/gi, "").toUpperCase();</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>const generateIdentifiers = () =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const contractToId = {};</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const prefixCounts = {};</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const updated = [...rows];</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>for (let i = updated.length - 1; i &gt;= 0; i--) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>const row = updated[i];</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>const trade = row.trade || "";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>const contract = row.contract || "";</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>if (["Canceled", "Voided"].includes(contract.trim())) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>row.identifier = "Canceled";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>row.status = "Canceled";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>continue;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>let found = "";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>const key = normalize(contract);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>if (contractToId[key]) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>found = contractToId[key];</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>if (found) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>row.identifier = found;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>} else {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const prefix = inferPrefix(trade);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>if (!prefixCounts[prefix]) prefixCounts[prefix] = 0;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>prefixCounts[prefix]++;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const newId = `${prefix} - ${prefixCounts[prefix].toString().padStart(4, "0")}`;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>row.identifier = newId;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>contractToId[key] = newId;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>row.status = computeStatus(row);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>setRows(updated);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>};</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>const computeStatus = (row) =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const c = row.contract.toLowerCase();</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if (c.includes("assigned")) return "Assigned";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if (c.includes("expired")) return "Expired";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if (c.includes("canceled") || c.includes("voided")) return "Canceled";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if (/\d+\s+(contract|contracts)/i.test(c)) return "Open";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>return "";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>};</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>const addTopRows = () =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const newRows = Array.from({ length: 5 }, blankRow);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>setRows((prev) =&gt; [...newRows, ...prev]);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>};</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>const computeAmount = (row) =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const j = parseFloat(row.premium);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const k = parseFloat(row.amount);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const match = /\d+\s+(contract|contracts)/i.test(row.contract);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if (!isNaN(j) &amp;&amp; !isNaN(k) &amp;&amp; match) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>return (j * k * 100).toFixed(2);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>return "";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>};</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>function updateRow(index, field, value) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const copy = [...rows];</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>copy[index][field] = value;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>setRows(copy);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>return React.createElement(</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>"div",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>{ style: { padding: "1rem", fontFamily: "Arial, sans-serif" } },</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>React.createElement("div", { style: { marginBottom: "1rem" } },</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>React.createElement("button", { onClick: generateIdentifiers }, "Generate Identifiers"),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>React.createElement("button", { onClick: addTopRows, style: { marginLeft: "10px" } }, "Add 5 Rows at Top")</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>React.createElement("div", {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>style: {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>display: "grid",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>gridTemplateColumns: "repeat(7, 1fr)",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>fontWeight: "bold",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>marginBottom: "6px"</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}, ["Date", "Trade", "Contract", "Identifier", "Amount", "Premium", "Status"].map((h, i) =&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>React.createElement("div", { key: i }, h)</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>)),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>rows.map((row, i) =&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>React.createElement("div", {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>key: i,</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>style: {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>display: "grid",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>gridTemplateColumns: "repeat(7, 1fr)",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>gap: "4px",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>background: row.identifier === "Canceled" ? "#ffe5e5" :</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                      </span>row.identifier?.startsWith("Option -") ? "#fffbe5" : "#fff",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>opacity: row.identifier === "Canceled" ? 0.6 : 1,</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>padding: "6px",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>marginBottom: "4px",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>borderRadius: "6px"</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>},</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>React.createElement("input", { value: row.date, onChange: (e) =&gt; updateRow(i, "date", e.target.value) }),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>React.createElement("input", { value: row.trade, onChange: (e) =&gt; updateRow(i, "trade", e.target.value) }),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>React.createElement("input", { value: row.contract, onChange: (e) =&gt; updateRow(i, "contract", e.target.value) }),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>React.createElement("div", null, row.identifier),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>React.createElement("div", null, computeAmount(row)),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>React.createElement("input", { value: row.premium, onChange: (e) =&gt; updateRow(i, "premium", e.target.value) }),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>React.createElement("div", null, row.status)</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>)</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>)</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>);</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">ReactDOM.render(</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>React.createElement(SmartOptionsApp),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>document.getElementById("root")</span></p>
<p class="p1"><span class="s1">);</span></p>
</body>
</html>
