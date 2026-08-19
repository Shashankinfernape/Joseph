import React, { useState, useEffect } from 'react';
import { Bus, MapPin, Phone, ShieldAlert, Navigation, RefreshCw, Clock, User } from 'lucide-react';
import { fetchAPI } from '../../utils/api';
import { useToast } from '../../context/ToastContext';

export default function BusMap({ routeId = 'RT-02' }) {
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sosTriggered, setSosTriggered] = useState(false);
  const { addToast } = useToast();

  const loadRouteData = async () => {
    try {
      const res = await fetchAPI(`/transport/route/${routeId}`);
      if (res.success && res.route) {
        setRoute(res.route);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRouteData();
    const interval = setInterval(loadRouteData, 6000);
    return () => clearInterval(interval);
  }, [routeId]);

  const handleSOS = () => {
    setSosTriggered(true);
    addToast('EMERGENCY ALERT: Campus security and transport control room have been alerted with live GPS coordinates!', 'error', 6000);
  };

  if (loading) {
    return (
      <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-8 flex items-center justify-center min-h-[350px]">
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <RefreshCw className="w-8 h-8 animate-spin text-cbse-accent" />
          <span className="text-sm font-medium">Connecting to GPS Telematics Unit...</span>
        </div>
      </div>
    );
  }

  if (!route) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
      
      {/* Top Telematics Bar */}
      <div className="bg-slate-900 text-white p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cbse-blue flex items-center justify-center text-cbse-gold">
            <Bus className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm text-white">{route.name}</h3>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                LIVE GPS
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Vehicle: {route.busNumber} • {route.busModel}
            </p>
          </div>
        </div>

        {/* Action Controls: Refresh & SOS */}
        <div className="flex items-center gap-2">
          <button
            onClick={loadRouteData}
            title="Refresh GPS"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Sync</span>
          </button>
          
          <button
            onClick={handleSOS}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
              sosTriggered
                ? 'bg-rose-700 text-white animate-pulse'
                : 'bg-rose-600 hover:bg-rose-700 text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>SOS Alert</span>
          </button>
        </div>
      </div>

      {/* Interactive Map Visual Simulation */}
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 p-6 text-white min-h-[300px] overflow-hidden flex flex-col justify-between">
        
        {/* Bangalore Map Grid Texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Live GPS Telemetry Box */}
        <div className="relative z-10 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-xl border border-slate-700/80 max-w-md text-xs space-y-1">
          <div className="flex items-center justify-between text-slate-300 font-mono text-[11px]">
            <span>Lat: {route.currentLocation.lat}° N</span>
            <span>Lng: {route.currentLocation.lng}° E</span>
            <span className="text-emerald-400 font-bold">Speed: {route.currentLocation.speed}</span>
          </div>
          <div className="font-semibold text-white flex items-center gap-1.5 pt-1">
            <Navigation className="w-4 h-4 text-cbse-gold shrink-0 animate-spin" />
            <span className="truncate">{route.currentLocation.address}</span>
          </div>
        </div>

        {/* Simulated Route Progress Visual Line */}
        <div className="relative z-10 my-8">
          <div className="flex items-center justify-between relative">
            {/* Background Route Line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 bg-slate-700 rounded-full"></div>
            <div className="absolute left-0 w-2/5 top-1/2 -translate-y-1/2 h-2 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"></div>

            {/* Stops along the Route */}
            {route.stops?.map((stop, index) => {
              const isCurrent = stop.status === 'Current Stop';
              const isPassed = stop.status === 'Passed';
              const isDest = stop.status === 'Destination';

              return (
                <div key={index} className="relative flex flex-col items-center group">
                  {/* Stop Node Icon */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-transform ${
                      isCurrent
                        ? 'bg-amber-400 text-slate-900 border-white ring-4 ring-amber-400/40 scale-125 z-20'
                        : isPassed
                        ? 'bg-emerald-500 text-white border-slate-900 z-10'
                        : isDest
                        ? 'bg-cbse-gold text-slate-900 border-white z-10'
                        : 'bg-slate-800 text-slate-400 border-slate-600 z-10'
                    }`}
                  >
                    {isCurrent ? <Bus className="w-3.5 h-3.5" /> : index + 1}
                  </div>

                  {/* Stop Label */}
                  <div className="absolute top-8 w-28 text-center -translate-x-1/2 left-1/2 opacity-90 group-hover:opacity-100">
                    <div className={`text-[10px] font-bold truncate ${isCurrent ? 'text-amber-300' : 'text-slate-300'}`}>
                      {stop.stopName.split('(')[0]}
                    </div>
                    <div className="text-[9px] text-slate-400 font-mono">{stop.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Status Ticker */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 pt-6">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cbse-accent" />
            <span>Updated: {route.currentLocation.lastUpdated || 'Just now'}</span>
          </div>
          <div className="text-emerald-400 font-semibold">
            Status: {route.currentLocation.status}
          </div>
        </div>

      </div>

      {/* Driver & Attendant Contact Bar */}
      <div className="bg-slate-50 dark:bg-slate-800/60 p-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-200">
            <User className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-100">{route.driverName}</span>
            <div className="text-[11px] text-slate-500">Bus Pilot (15+ Yrs Safe Driving Record)</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${route.driverPhone}`}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Driver: {route.driverPhone}</span>
          </a>
        </div>
      </div>

    </div>
  );
}
