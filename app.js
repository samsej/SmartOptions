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
<p class="p1"><span class="s1">import React, { useState } from "https://esm.sh/react";</span></p>
<p class="p1"><span class="s1">import ReactDOM from "https://esm.sh/react-dom";</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">function SmartOptionsApp() {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>const [rows, setRows] = useState([blankRow(), blankRow(), blankRow(), blankRow(), blankRow()]);</span></p>
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
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>return (</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>&lt;div&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>&lt;div style={{ marginBottom: "10px" }}&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>&lt;button onClick={generateIdentifiers}&gt;Generate Identifiers&lt;/button&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>&lt;button onClick={addTopRows}&gt;Add 5 Rows at Top&lt;/button&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>&lt;/div&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>&lt;div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", fontWeight: "bold", marginBottom: "6px" }}&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>&lt;div&gt;Date&lt;/div&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>&lt;div&gt;Trade&lt;/div&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>&lt;div&gt;Contract&lt;/div&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>&lt;div&gt;Identifier&lt;/div&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>&lt;div&gt;Amount&lt;/div&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>&lt;div&gt;Premium&lt;/div&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>&lt;div&gt;Status&lt;/div&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>&lt;/div&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>{rows.map((row, i) =&gt; (</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>&lt;div</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>key={i}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>className={`card ${row.identifier === "Canceled" ? "canceled" : row.identifier?.startsWith("Option -") ? "option" : ""}`}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>&lt;div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>&lt;input value={row.date} onChange={(e) =&gt; updateRow(i, "date", e.target.value)} /&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>&lt;input value={row.trade} onChange={(e) =&gt; updateRow(i, "trade", e.target.value)} /&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>&lt;input value={row.contract} onChange={(e) =&gt; updateRow(i, "contract", e.target.value)} /&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>&lt;div&gt;{row.identifier}&lt;/div&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>&lt;div&gt;{computeAmount(row)}&lt;/div&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>&lt;input value={row.premium} onChange={(e) =&gt; updateRow(i, "premium", e.target.value)} /&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>&lt;div&gt;{row.status}&lt;/div&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>&lt;/div&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>&lt;/div&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>))}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>&lt;/div&gt;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>);</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">ReactDOM.render(&lt;SmartOptionsApp /&gt;, document.getElementById("root"));</span></p>
</body>
</html>
