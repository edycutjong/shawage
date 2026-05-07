"use client";

import { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Upload, 
  Eye, 
  EyeOff,
  FileText,
  Lock,
  Unlock,
  CheckCircle2,
  Terminal,
  Activity
} from "lucide-react";
import { generateStealthTransfer, simulateAuditorDecryption } from "@/lib/umbra";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"employer" | "employee" | "audit" | "proof">("employer");
  const [viewingKey, setViewingKey] = useState("");
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stealthTransfers, setStealthTransfers] = useState<any[]>([]);
  const [decryptedRecords, setDecryptedRecords] = useState<any[]>([]);

  // We keep mockPayroll as the base data to iterate from
  const mockPayroll = [
    { id: 1, name: "Alice Dev", amount: "5,000 USDC", date: "May 1", status: "Sent (Stealth)" },
    { id: 2, name: "Bob Ops", amount: "4,200 USDC", date: "May 1", status: "Sent (Stealth)" },
    { id: 3, name: "Charlie Design", amount: "4,500 USDC", date: "May 1", status: "Sent (Stealth)" },
  ];

  useEffect(() => {
    // Generate real stealth addresses on mount
    const transfers = mockPayroll.map(pay => ({
      ...pay,
      transferDetails: generateStealthTransfer(pay.name, pay.amount)
    }));
    setStealthTransfers(transfers);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAudit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Simulate decryption for all records using the Viewing Key logic
      const decrypted = stealthTransfers.map(st => ({
        ...st,
        audit: simulateAuditorDecryption(st.transferDetails)
      }));
      setDecryptedRecords(decrypted);
      setIsDecrypted(true);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col flex-1 h-screen overflow-hidden text-slate-300">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-6 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-500 text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="font-mono text-xl font-bold tracking-tight text-white">Shawage</span>
          <span className="rounded-full bg-primary-500/10 px-2 py-0.5 text-xs font-medium text-primary-400">Umbra Privacy</span>
        </div>
        
        {/* Navigation Tabs */}
        <nav className="flex space-x-1 rounded-lg bg-surface-hover p-1">
          {["employer", "employee", "audit", "proof"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                activeTab === tab 
                  ? "bg-primary-500 text-white shadow" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden p-6 justify-center">
        <div className="w-full max-w-5xl flex flex-col gap-6">

          {/* Employer Tab */}
          {activeTab === "employer" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Employer Dashboard</h1>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="rounded-xl border border-border bg-surface p-8 flex flex-col items-center justify-center border-dashed">
                  <Upload className="h-10 w-10 text-primary-400 mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Upload Payroll CSV</h3>
                  <p className="text-sm text-slate-400 text-center mb-6">Names and amounts will be converted to Umbra stealth addresses</p>
                  <button className="rounded-md bg-primary-500 hover:bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors">
                    Select File
                  </button>
                </div>
                <div className="rounded-xl border border-border bg-surface p-6 flex flex-col">
                  <h3 className="font-medium text-white mb-4">Recent Batches</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div>
                        <div className="font-medium text-white">May 2026 Payroll</div>
                        <div className="text-xs text-slate-400">3 Employees • 13,700 USDC</div>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium text-success">
                        <CheckCircle2 className="h-4 w-4" /> Stealth Active
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Employee Tab */}
          {activeTab === "employee" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-6 max-w-2xl mx-auto w-full">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-white">My Payroll</h1>
                <span className="flex items-center gap-1 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-400">
                  <Lock className="h-3 w-3" /> Private View
                </span>
              </div>
              
              <div className="rounded-xl border border-border bg-surface overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between bg-surface-hover">
                  <div>
                    <div className="text-sm text-slate-400">Latest Payment</div>
                    <div className="text-3xl font-bold text-white font-mono mt-1">5,000 USDC</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Status</div>
                    <div className="text-success font-medium">Received</div>
                  </div>
                </div>
                <div className="p-4 bg-slate-900/50">
                  <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary-400" />
                    Transaction routed via Umbra Protocol. Your address is not linked to your employer.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Audit Tab */}
          {activeTab === "audit" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-6">
               <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Compliance Portal</h1>
                <span className="flex items-center gap-1 rounded-full bg-secondary-500/10 px-3 py-1 text-xs font-medium text-secondary-400">
                  Auditor Access
                </span>
              </div>

              {!isDecrypted ? (
                <div className="rounded-xl border border-border bg-surface p-8 max-w-xl mx-auto w-full mt-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-secondary-500/10 flex items-center justify-center mb-4">
                      <Lock className="h-6 w-6 text-secondary-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">Encrypted Records</h3>
                    <p className="text-sm text-slate-400 mb-6">Enter your scoped Viewing Key to decrypt authorized payroll records.</p>
                    
                    <input 
                      type="text"
                      placeholder="UMBRA-VIEW-KEY-..."
                      value={viewingKey}
                      onChange={(e) => setViewingKey(e.target.value)}
                      className="w-full rounded-md border border-border bg-black px-4 py-2 text-sm text-white focus:border-secondary-500 focus:outline-none focus:ring-1 focus:ring-secondary-500 mb-4 font-mono"
                    />
                    
                    <button 
                      onClick={handleAudit}
                      disabled={!viewingKey || isProcessing}
                      className="w-full rounded-md bg-secondary-500 hover:bg-secondary-600 px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-50 flex justify-center"
                    >
                      {isProcessing ? "Decrypting via Umbra..." : "Decrypt Records"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-secondary-500/30 bg-surface overflow-hidden">
                  <div className="border-b border-border p-4 flex justify-between items-center bg-secondary-500/5">
                    <h2 className="font-semibold text-white flex items-center gap-2">
                      <Unlock className="h-5 w-5 text-secondary-400" />
                      Decrypted Audit Log (May 2026)
                    </h2>
                    <button className="flex items-center gap-2 rounded-md bg-surface-hover px-3 py-1.5 text-sm font-medium text-white hover:bg-border transition-colors">
                      <FileText className="h-4 w-4" />
                      Export PDF
                    </button>
                  </div>
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-surface-hover text-xs uppercase text-slate-400">
                      <tr>
                        <th className="px-4 py-3">Employee</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Stealth Address</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {decryptedRecords.map((pay) => (
                        <tr key={pay.id} className="border-b border-border hover:bg-surface-hover/50">
                          <td className="px-4 py-4 font-medium text-white">{pay.audit.verifiedEmployee}</td>
                          <td className="px-4 py-4 font-mono text-secondary-400">{pay.audit.verifiedAmount}</td>
                          <td className="px-4 py-4 font-mono text-xs text-slate-500" title={pay.transferDetails.stealthAddress}>
                            {pay.transferDetails.stealthAddress.substring(0, 10)}...{pay.transferDetails.stealthAddress.substring(38)}
                          </td>
                          <td className="px-4 py-4 text-success">{pay.audit.isAuthorized ? "Verified" : "Failed"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Proof Tab */}
          {activeTab === "proof" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-6 h-full">
               <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Explorer Proof</h1>
              </div>

              <div className="grid grid-cols-2 gap-6 flex-1">
                <div className="rounded-xl border border-border bg-black overflow-hidden flex flex-col">
                  <div className="border-b border-border p-3 bg-surface text-sm font-medium text-slate-400 flex items-center gap-2">
                    <Terminal className="h-4 w-4" />
                    Public Explorer (What the world sees)
                  </div>
                  <div className="p-4 font-mono text-xs text-slate-500 space-y-3 opacity-60">
                    {stealthTransfers.map((st) => (
                      <div key={st.id}>TX: {st.transferDetails.payload.substring(0, 10)}... → Transfer {st.amount} to {st.transferDetails.stealthAddress.substring(0, 6)}...{st.transferDetails.stealthAddress.substring(38)}</div>
                    ))}
                    <div className="mt-8 text-center text-red-500/50">No linkage to Employer. Addresses are single-use.</div>
                  </div>
                </div>

                <div className="rounded-xl border border-primary-500/30 bg-surface overflow-hidden flex flex-col shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                  <div className="border-b border-border p-3 bg-primary-500/10 text-sm font-medium text-primary-400 flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Shawage Internal (What you see)
                  </div>
                  <div className="p-4 font-mono text-xs text-slate-300 space-y-3">
                    {stealthTransfers.map((st) => (
                      <div key={st.id}>Employer → {st.name} ({st.amount})</div>
                    ))}
                    <div className="mt-8 text-center text-primary-400/80">Full transparency internally. Full privacy externally.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
