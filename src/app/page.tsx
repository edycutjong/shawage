"use client";

import { StatusBar } from "@/components/StatusBar";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";
import { ScrambleText } from "@/components/ScrambleText";

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
  Activity,
  Loader2
} from "lucide-react";
import { generateStealthTransfer, simulateAuditorDecryption } from "@/lib/umbra";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"employer" | "employee" | "audit" | "proof">("employer");
  const [viewingKey, setViewingKey] = useState("");
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stealthTransfers, setStealthTransfers] = useState<any[]>([]);
  const [decryptedRecords, setDecryptedRecords] = useState<any[]>([]);
  const [auditError, setAuditError] = useState("");
  const [employeeDecrypted, setEmployeeDecrypted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Base payroll data as the base data to iterate from
  const payrollData = [
    { id: 1, name: "Alice Dev", amount: "5,000 USDC", date: "May 1", status: "Sent (Stealth)" },
    { id: 2, name: "Bob Ops", amount: "4,200 USDC", date: "May 1", status: "Sent (Stealth)" },
    { id: 3, name: "Charlie Design", amount: "4,500 USDC", date: "May 1", status: "Sent (Stealth)" },
    { id: 4, name: "Dave Marketing", amount: "3,800 USDC", date: "May 1", status: "Sent (Stealth)" },
    { id: 5, name: "Eve Security", amount: "6,000 USDC", date: "May 1", status: "Sent (Stealth)" },
  ];

  useEffect(() => {
    // Generate real stealth addresses on mount
    const transfers = payrollData.map(pay => ({
      ...pay,
      transferDetails: generateStealthTransfer(pay.name, pay.amount)
    }));
    setStealthTransfers(transfers);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAudit = () => {
    setIsProcessing(true);
    setAuditError("");
    setTimeout(() => {
      try {
        const decrypted = stealthTransfers.map(st => ({
          ...st,
          audit: simulateAuditorDecryption(st.transferDetails, viewingKey)
        }));
        setDecryptedRecords(decrypted);
        setIsDecrypted(true);
      } catch (err: any) {
        setAuditError(err.message || "Invalid Viewing Key");
      } finally {
        setIsProcessing(false);
      }
    }, 1500);
  };

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
    }, 2000);
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <>
      <ParticleBackground />
      <StatusBar />
      <div className="flex flex-col flex-1 h-screen overflow-hidden text-slate-300 relative z-10 print:h-auto print:overflow-visible">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-surface/80 px-6 backdrop-blur-xl print:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="font-mono text-xl font-bold tracking-tight text-white">Shawage</span>
            <span className="rounded-full border border-primary-500/20 bg-primary-500/10 px-2 py-0.5 text-xs font-medium text-primary-400">Umbra Privacy</span>
          </div>
          
          {/* Navigation Tabs */}
          <nav className="flex space-x-1 rounded-lg border border-border bg-black/50 p-1 backdrop-blur-md">
            {["employer", "employee", "audit", "proof"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-all duration-300 ${
                  activeTab === tab 
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20 scale-105" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 overflow-y-auto p-6 justify-center print:p-0 print:overflow-visible">
          <div className="w-full max-w-5xl flex flex-col gap-6 print:max-w-full">

            {/* Employer Tab */}
            {activeTab === "employer" && (
              <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col gap-6 print:hidden">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Activity className="h-6 w-6 text-primary-500" />
                    Employer Dashboard
                  </h1>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="rounded-xl border border-border bg-surface/50 backdrop-blur-md p-8 flex flex-col items-center justify-center border-dashed transition-all hover:border-primary-500/50 hover:bg-primary-500/5">
                    {isUploading ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="h-10 w-10 text-primary-400 mb-4 animate-spin" />
                        <h3 className="text-lg font-medium text-white mb-2">Processing Batch...</h3>
                        <p className="text-sm text-slate-400 text-center">Generating 5 stealth addresses</p>
                      </div>
                    ) : (
                      <>
                        <div className="p-4 rounded-full bg-primary-500/10 mb-4">
                          <Upload className="h-8 w-8 text-primary-400" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">Upload Payroll CSV</h3>
                        <p className="text-sm text-slate-400 text-center mb-6 max-w-xs">Names and amounts will be converted to Umbra stealth addresses</p>
                        <button onClick={handleUpload} className="rounded-md bg-primary-500 hover:bg-primary-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] px-6 py-2.5 text-sm font-medium text-white transition-all hover:scale-105 active:scale-95">
                          Select File
                        </button>
                      </>
                    )}
                  </div>
                  <div className="rounded-xl border border-border bg-surface/50 backdrop-blur-md p-6 flex flex-col">
                    <h3 className="font-medium text-white mb-4 flex items-center gap-2">
                      <Terminal className="h-4 w-4" /> Recent Batches
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg border border-border bg-black/40 p-4 transition-colors hover:border-primary-500/30">
                        <div>
                          <div className="font-medium text-white">May 2026 Payroll</div>
                          <div className="text-xs text-slate-400 mt-1">5 Employees • 23,500 USDC</div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-success bg-success/10 px-2.5 py-1 rounded-full border border-success/20">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Stealth Active
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Employee Tab */}
            {activeTab === "employee" && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col gap-6 max-w-2xl mx-auto w-full print:hidden">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-bold text-white">My Payroll</h1>
                  <span className="flex items-center gap-1.5 rounded-full border border-primary-500/20 bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    <Lock className="h-3 w-3" /> Private View
                  </span>
                </div>
                
                <div className="rounded-xl border border-border bg-surface/80 backdrop-blur-xl overflow-hidden shadow-2xl relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>
                  <div className="p-8 border-b border-border flex items-center justify-between bg-black/20">
                    <div>
                      <div className="text-sm text-slate-400 mb-2">Latest Payment</div>
                      <div className="text-4xl font-bold text-white font-mono mt-1 tracking-tight flex items-center h-10">
                        <ScrambleText text="5,000 USDC" trigger={employeeDecrypted} duration={1500} />
                        {!employeeDecrypted && <span className="opacity-50 tracking-wider">***,*** USDC</span>}
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <div className="text-sm text-slate-400 mb-2">Status</div>
                      {employeeDecrypted ? (
                        <div className="text-success font-medium flex items-center gap-1 h-8">
                          <Unlock className="h-4 w-4" /> Decrypted
                        </div>
                      ) : (
                        <button 
                          onClick={() => setEmployeeDecrypted(true)}
                          className="text-primary-400 text-sm border border-primary-500/30 bg-primary-500/10 hover:bg-primary-500/20 px-3 py-1.5 rounded-md flex items-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] h-8"
                        >
                          <Lock className="h-4 w-4" /> Decrypt Transfer
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="p-5 bg-black/60">
                    <div className="text-xs text-slate-400 font-mono flex items-start gap-3 leading-relaxed">
                      <ShieldCheck className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
                      <div>
                        Transaction routed via Umbra Protocol. Your receiving address is an ephemeral stealth address and cannot be linked back to your employer.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Audit Tab */}
            {activeTab === "audit" && (
              <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col gap-6">
                 <div className="flex items-center justify-between print:hidden">
                  <h1 className="text-2xl font-bold text-white">Compliance Portal</h1>
                  <span className="flex items-center gap-1 rounded-full border border-secondary-500/30 bg-secondary-500/10 px-3 py-1 text-xs font-medium text-secondary-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    Auditor Access
                  </span>
                </div>

                {!isDecrypted ? (
                  <div className="rounded-xl border border-secondary-500/20 bg-surface/60 backdrop-blur-md p-10 max-w-xl mx-auto w-full mt-8 shadow-2xl relative overflow-hidden print:hidden">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary-500/20 rounded-full blur-[50px]"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary-500/10 rounded-full blur-[50px]"></div>
                    
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="h-16 w-16 rounded-full bg-secondary-500/10 border border-secondary-500/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                        <Lock className="h-8 w-8 text-secondary-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Encrypted Records</h3>
                      <p className="text-sm text-slate-400 mb-8 max-w-sm">Enter your scoped Viewing Key to decrypt authorized payroll records.</p>
                      
                      <div className="w-full relative group mb-6">
                        <input 
                          type="password"
                          placeholder="UMBRA-VIEW-KEY-..."
                          value={viewingKey}
                          onChange={(e) => setViewingKey(e.target.value)}
                          className="w-full rounded-lg border border-border bg-black/50 px-4 py-3 text-sm text-white focus:border-secondary-500 focus:outline-none focus:ring-1 focus:ring-secondary-500 font-mono transition-colors"
                        />
                        {auditError && (
                          <div className="absolute -bottom-6 left-0 text-xs text-red-400 font-medium">{auditError}</div>
                        )}
                      </div>
                      
                      <button 
                        onClick={handleAudit}
                        disabled={!viewingKey || isProcessing}
                        className="w-full rounded-lg bg-secondary-500 hover:bg-secondary-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] px-4 py-3 text-sm font-bold text-white transition-all disabled:opacity-50 disabled:shadow-none flex justify-center items-center gap-2"
                      >
                        {isProcessing ? (
                          <><Loader2 className="h-4 w-4 animate-spin" /> Decrypting via Umbra...</>
                        ) : "Decrypt Records"}
                      </button>
                      <div className="mt-4 text-xs text-slate-500">Hint: Try UMBRA-VIEW-KEY-2026</div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-secondary-500/40 bg-surface/90 backdrop-blur-xl overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.15)] print:border-none print:shadow-none">
                    <div className="border-b border-border p-5 flex justify-between items-center bg-linear-to-r from-secondary-500/10 to-transparent print:bg-white print:text-black">
                      <h2 className="font-bold text-white flex items-center gap-2 print:text-black print:text-2xl">
                        <Unlock className="h-5 w-5 text-secondary-400 print:hidden" />
                        Decrypted Audit Log (May 2026)
                      </h2>
                      <button onClick={exportPDF} className="flex items-center gap-2 rounded-md border border-border bg-black/40 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 hover:border-slate-500 transition-all print:hidden">
                        <FileText className="h-4 w-4" />
                        Export PDF
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-slate-300 print:text-black">
                        <thead className="bg-black/40 text-xs uppercase text-slate-400 border-b border-border print:bg-gray-100 print:text-black">
                          <tr>
                            <th className="px-5 py-4 font-semibold tracking-wider">Employee</th>
                            <th className="px-5 py-4 font-semibold tracking-wider">Amount</th>
                            <th className="px-5 py-4 font-semibold tracking-wider">Stealth Address</th>
                            <th className="px-5 py-4 font-semibold tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50 print:divide-gray-300">
                          {decryptedRecords.map((pay) => (
                            <tr key={pay.id} className="hover:bg-white/5 transition-colors print:hover:bg-transparent">
                              <td className="px-5 py-4 font-medium text-white print:text-black">{pay.audit.verifiedEmployee}</td>
                              <td className="px-5 py-4 font-mono text-secondary-400 print:text-black">{pay.audit.verifiedAmount}</td>
                              <td className="px-5 py-4 font-mono text-xs text-slate-500 print:text-gray-600" title={pay.transferDetails.stealthAddress}>
                                <ScrambleText text={`${pay.transferDetails.stealthAddress.substring(0, 14)}...${pay.transferDetails.stealthAddress.substring(34)}`} trigger={true} duration={1000 + Math.random() * 1000} />
                              </td>
                              <td className="px-5 py-4">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success border border-success/20 print:border-none print:bg-transparent">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  {pay.audit.isAuthorized ? "Verified" : "Failed"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Proof Tab */}
            {activeTab === "proof" && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col gap-6 h-full print:hidden">
                 <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Terminal className="h-6 w-6 text-slate-400" />
                    Explorer Proof
                  </h1>
                </div>

                <div className="grid grid-cols-2 gap-8 flex-1">
                  <div className="rounded-xl border border-border bg-black/80 backdrop-blur-md overflow-hidden flex flex-col shadow-xl">
                    <div className="border-b border-border p-4 bg-surface/50 text-sm font-medium text-slate-300 flex items-center gap-2">
                      <Activity className="h-4 w-4 text-red-400" />
                      Public Explorer <span className="text-slate-500 font-normal">(What the world sees)</span>
                    </div>
                    <div className="p-5 font-mono text-xs text-slate-500 space-y-4 opacity-80 flex-1 overflow-y-auto">
                      {stealthTransfers.map((st) => (
                        <div key={st.id} className="border-l-2 border-slate-800 pl-3">
                          <div className="text-slate-400 mb-1">TX: 0x{st.transferDetails.payload.substring(2, 14)}...</div>
                          <div className="text-red-400/80">Transfer 
                            <ScrambleText text={` ${st.amount}`} trigger={true} duration={2000} className="text-red-300" />
                          </div>
                          <div>To: {st.transferDetails.stealthAddress.substring(0, 10)}...{st.transferDetails.stealthAddress.substring(34)}</div>
                        </div>
                      ))}
                      <div className="mt-8 pt-4 border-t border-border/50 text-center text-red-500/60 font-sans font-medium flex flex-col items-center gap-2">
                        <EyeOff className="h-5 w-5" />
                        No linkage to Employer. Addresses are single-use.
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-primary-500/40 bg-surface/80 backdrop-blur-md overflow-hidden flex flex-col shadow-[0_0_40px_rgba(6,182,212,0.15)] relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                    <div className="border-b border-primary-500/20 p-4 bg-primary-500/10 text-sm font-bold text-primary-400 flex items-center gap-2 relative z-10">
                      <Eye className="h-4 w-4" />
                      Shawage Internal <span className="text-primary-400/60 font-normal">(What you see)</span>
                    </div>
                    <div className="p-5 font-mono text-sm text-slate-200 space-y-4 flex-1 overflow-y-auto relative z-10">
                      {stealthTransfers.map((st) => (
                        <div key={st.id} className="border-l-2 border-primary-500/50 pl-3 bg-primary-500/5 p-2 rounded-r-md">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-white">Employer → {st.name}</span>
                            <span className="text-primary-400">{st.amount}</span>
                          </div>
                        </div>
                      ))}
                      <div className="mt-8 pt-4 border-t border-primary-500/20 text-center text-primary-400/80 font-sans font-medium flex flex-col items-center gap-2">
                        <ShieldCheck className="h-5 w-5" />
                        Full transparency internally. Full privacy externally.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}
