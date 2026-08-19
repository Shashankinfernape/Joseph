import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Layers, Save } from 'lucide-react';
import { fetchAPI } from '../../../utils/api';
import { useToast } from '../../../context/ToastContext';

export default function AdminCMS() {
  const [tab, setTab] = useState('alert');
  const [urgentAlert, setUrgentAlert] = useState({ enabled: true, text: '', kannadaText: '', link: '' });
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const { addToast } = useToast();
  const [newNews, setNewNews] = useState({ title: '', category: 'Achievements', summary: '', image: '' });
  const [newEvent, setNewEvent] = useState({ title: '', date: '2026-10-15', time: '09:00 AM', venue: 'Auditorium' });
  const [newAlbum, setNewAlbum] = useState({ academicYear: '2026-27', eventName: '', date: '2026-08-18', coverImage: '' });

  useEffect(() => {
    fetchAPI('/cms/urgent-alert').then(r => r.success && setUrgentAlert(r.alert)).catch(() => {});
    fetchAPI('/cms/news').then(r => r.success && setNews(r.news)).catch(() => {});
    fetchAPI('/cms/events').then(r => r.success && setEvents(r.events)).catch(() => {});
    fetchAPI('/cms/gallery').then(r => r.success && setGallery(r.gallery)).catch(() => {});
  }, []);

  const onSaveAlert = async (e) => {
    e.preventDefault();
    try { await fetchAPI('/cms/urgent-alert', { method: 'PUT', body: JSON.stringify(urgentAlert) }); addToast('Alert updated!', 'success'); }
    catch { addToast('Error', 'error'); }
  };
  const onCreateNews = async (e) => {
    e.preventDefault();
    try { const r = await fetchAPI('/cms/news', { method: 'POST', body: JSON.stringify(newNews) }); if (r.success) { setNews([...news, r.news]); addToast('Published!', 'success'); } }
    catch { addToast('Error', 'error'); }
  };
  const onCreateEvent = async (e) => {
    e.preventDefault();
    try { const r = await fetchAPI('/cms/events', { method: 'POST', body: JSON.stringify(newEvent) }); if (r.success) { setEvents([...events, r.event]); addToast('Added!', 'success'); } }
    catch { addToast('Error', 'error'); }
  };
  const onCreateAlbum = async (e) => {
    e.preventDefault();
    try { const r = await fetchAPI('/cms/gallery', { method: 'POST', body: JSON.stringify(newAlbum) }); if (r.success) { setGallery([...gallery, r.album]); addToast('Published!', 'success'); } }
    catch { addToast('Error', 'error'); }
  };

  const TABS = [
    { k: 'alert', l: 'Alert Banner' },
    { k: 'news', l: 'News (' + news.length + ')' },
    { k: 'events', l: 'Events (' + events.length + ')' },
    { k: 'gallery', l: 'Gallery (' + gallery.length + ')' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-cbse-navy dark:text-white font-serif flex items-center gap-2">
          <Layers className="w-6 h-6" /> Website CMS Editor
        </h2>
        <p className="text-sm text-slate-500 mt-1">Manage website content without coding.</p>
      </div>
      <div className="flex gap-2 border-b pb-3 flex-wrap">
        {TABS.map(({ k, l }) => (
          <Button key={k} onClick={() => setTab(k)} variant={tab === k ? 'default' : 'outline'} size="sm" className="rounded-xl">{l}</Button>
        ))}
      </div>

      {tab === 'alert' && (
        <Card className="max-w-2xl">
          <CardHeader><CardTitle className="font-serif">Edit Alert Banner</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={onSaveAlert} className="space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <input type="checkbox" id="ae" checked={urgentAlert.enabled} onChange={e => setUrgentAlert({ ...urgentAlert, enabled: e.target.checked })} className="w-4 h-4 rounded" />
                <label htmlFor="ae" className="font-bold cursor-pointer">Show on Website</label>
              </div>
              <div>
                <label className="block font-bold mb-1">English Text *</label>
                <textarea rows="2" required value={urgentAlert.text} onChange={e => setUrgentAlert({ ...urgentAlert, text: e.target.value })} className="w-full p-3 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-cbse-accent"></textarea>
              </div>
              <div>
                <label className="block font-bold mb-1">Kannada Text</label>
                <textarea rows="2" value={urgentAlert.kannadaText || ''} onChange={e => setUrgentAlert({ ...urgentAlert, kannadaText: e.target.value })} className="w-full p-3 rounded-xl border text-xs font-kannada"></textarea>
              </div>
              <div>
                <label className="block font-bold mb-1">Link (Optional)</label>
                <Input type="text" value={urgentAlert.link || ''} placeholder="/admissions" onChange={e => setUrgentAlert({ ...urgentAlert, link: e.target.value })} />
              </div>
              <Button type="submit"><Save className="w-4 h-4 mr-1.5" />Save Alert</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {tab === 'news' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader><CardTitle className="font-serif">Publish News</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={onCreateNews} className="space-y-4 text-xs">
                <div><label className="block font-bold mb-1">Title *</label><Input required value={newNews.title} placeholder="News title" onChange={e => setNewNews({ ...newNews, title: e.target.value })} /></div>
                <div>
                  <label className="block font-bold mb-1">Category</label>
                  <select value={newNews.category} onChange={e => setNewNews({ ...newNews, category: e.target.value })} className="w-full p-2.5 rounded-xl border">
                    <option>Achievements</option><option>Academics</option><option>Sports</option><option>Cultural</option>
                  </select>
                </div>
                <div><label className="block font-bold mb-1">Image URL</label><Input value={newNews.image} placeholder="https://..." onChange={e => setNewNews({ ...newNews, image: e.target.value })} /></div>
                <div><label className="block font-bold mb-1">Summary *</label><textarea rows="3" required value={newNews.summary} onChange={e => setNewNews({ ...newNews, summary: e.target.value })} className="w-full p-2.5 rounded-xl border"></textarea></div>
                <Button type="submit">Publish</Button>
              </form>
            </CardContent>
          </Card>
          <div className="space-y-3">
            <h3 className="font-bold text-base font-serif">Published Stories</h3>
            {news.map(n => (
              <div key={n.id} className="p-3 bg-white dark:bg-slate-800 rounded-xl border flex justify-between text-xs">
                <div><h4 className="font-bold">{n.title}</h4><span className="text-slate-400">{n.category}</span></div>
                <span className="text-emerald-600 font-bold">Live</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'events' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader><CardTitle className="font-serif">Add Event</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={onCreateEvent} className="space-y-4 text-xs">
                <div><label className="block font-bold mb-1">Title *</label><Input required value={newEvent.title} placeholder="Event title" onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block font-bold mb-1">Date</label><Input type="date" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} /></div>
                  <div><label className="block font-bold mb-1">Time</label><Input value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} /></div>
                </div>
                <div><label className="block font-bold mb-1">Venue</label><Input value={newEvent.venue} onChange={e => setNewEvent({ ...newEvent, venue: e.target.value })} /></div>
                <Button type="submit">Add Event</Button>
              </form>
            </CardContent>
          </Card>
          <div className="space-y-3">
            <h3 className="font-bold text-base font-serif">Upcoming Events</h3>
            {events.map(ev => (
              <div key={ev.id} className="p-3 bg-white dark:bg-slate-800 rounded-xl border flex justify-between text-xs">
                <div><h4 className="font-bold">{ev.title}</h4><span className="text-slate-400">{ev.date}</span></div>
                <span className="text-blue-600 font-bold">Live</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'gallery' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader><CardTitle className="font-serif">Create Album</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={onCreateAlbum} className="space-y-4 text-xs">
                <div><label className="block font-bold mb-1">Event Name *</label><Input required value={newAlbum.eventName} placeholder="Album name" onChange={e => setNewAlbum({ ...newAlbum, eventName: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">Year</label>
                    <select value={newAlbum.academicYear} onChange={e => setNewAlbum({ ...newAlbum, academicYear: e.target.value })} className="w-full p-2.5 rounded-xl border">
                      <option>2026-27</option><option>2025-26</option><option>2024-25</option>
                    </select>
                  </div>
                  <div><label className="block font-bold mb-1">Date</label><Input type="date" value={newAlbum.date} onChange={e => setNewAlbum({ ...newAlbum, date: e.target.value })} /></div>
                </div>
                <div><label className="block font-bold mb-1">Cover Image URL *</label><Input required value={newAlbum.coverImage} placeholder="https://..." onChange={e => setNewAlbum({ ...newAlbum, coverImage: e.target.value })} /></div>
                <Button type="submit">Publish Album</Button>
              </form>
            </CardContent>
          </Card>
          <div className="space-y-3">
            <h3 className="font-bold text-base font-serif">Published Albums</h3>
            {gallery.map(g => (
              <div key={g.id} className="p-3 bg-white dark:bg-slate-800 rounded-xl border flex justify-between text-xs">
                <div><h4 className="font-bold">{g.eventName}</h4><span className="text-slate-400">{g.academicYear}</span></div>
                <span className="text-emerald-600 font-bold">Active</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
