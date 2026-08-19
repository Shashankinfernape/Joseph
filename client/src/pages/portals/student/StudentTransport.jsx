import React from 'react';
import { Bus, ShieldAlert, Navigation, Phone, MapPin, Clock } from 'lucide-react';
import BusMap from '../../../components/common/BusMap';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

export default function StudentTransport() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider mb-2">
          <Bus className="w-4 h-4 text-purple-700" />
          <span>AIS-140 Certified GPS Telematics & Fleet Control</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-cbse-navy dark:text-white">
          Live School Bus GPS Tracking
        </h1>
        <p className="text-xs text-slate-500">
          Student: Aarav Sharma • Assigned: Route 2 (Indiranagar / Koramangala) • Stop: Koramangala Sony Signal (07:38 AM)
        </p>
      </div>

      {/* Live Interactive Map Simulation */}
      <BusMap routeId="RT-02" />

      {/* Transport Guidelines Card */}
      <Card className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-sm text-cbse-navy dark:text-white flex items-center gap-2">
            <Navigation className="w-4 h-4 text-cbse-accent" />
            <span>Bus Safety & Fleet Protocol</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-slate-600 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc pl-5">
            <li>Students should arrive at their assigned stop <strong>5 minutes before</strong> the scheduled pickup time.</li>
            <li>All school buses are governed by digital speed limiters restricted to a maximum of 40 km/h across Bengaluru city limits.</li>
            <li>In case of unannounced delays due to Outer Ring Road traffic or weather, real-time SMS alerts are dispatched to registered parent mobile numbers.</li>
          </ul>
        </CardContent>
      </Card>

    </div>
  );
}
