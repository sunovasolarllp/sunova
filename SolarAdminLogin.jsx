import React, { useState } from 'react';
import { Sun, Shield, Wrench, Building2, ArrowRight, Lock, Mail } from 'lucide-react';

export default function SolarAdminLogin() {
  const [email, setEmail] = useState('admin@solarops.com');
  const [password, setPassword] = useState('••••••••••••');
  const [activeRole, setActiveRole] = useState('Super Admin');

  // Quick preset accounts for testing
  const quickAccounts = [
    {
      role: 'Super Admin',
      email: 'admin@solarops.com',
      icon: Shield,
      color: 'bg-amber-500/10 text-amber-500 border-amber-500/30 hover:bg-amber-500/20',
    },
    {
      role: 'Field Tech',
      email: 'tech@solarops.com',
      icon: Wrench,
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20',
    },
    {
      role: 'Partner Dealer',
      email: 'partner@solardealer.com',
      icon: Building2,
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20',
    },
  ];

  const handleQuickLogin = (account) => {
    setEmail(account.email);
    setPassword('demo-password-123');
    setActiveRole(account.role);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in as ${activeRole} (${email})`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      {/* Background Solar Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 mb-4 shadow-lg shadow-amber-500/20">
            <Sun className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">SolarPulse OS</h1>
          <p className="text-sm text-slate-400 mt-1">Energy Management & Diagnostics Platform</p>
        </div>

        {/* Card Container */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl">
          
          {/* Quick Demo Shortcuts */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Quick Test Shortcuts
              </span>
              <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full font-medium border border-amber-400/20">
                Dev Mode
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {quickAccounts.map((account) => {
                const Icon = account.icon;
                const isSelected = email === account.email;
                return (
                  <button
                    key={account.role}
                    type="button"
                    onClick={() => handleQuickLogin(account)}
                    className={`flex flex-col items-center p-2.5 rounded-xl border text-xs font-medium transition-all ${account.color} ${
                      isSelected ? 'ring-2 ring-amber-500 border-transparent shadow-md' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-1.5" />
                    <span className="truncate w-full text-center">{account.role}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-500">Or sign in manually</span>
            </div>
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-medium text-slate-300">Password</label>
                <a href="#forgot" className="text-xs text-amber-400 hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold py-2.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 group"
            >
              Sign In to Dashboard
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
