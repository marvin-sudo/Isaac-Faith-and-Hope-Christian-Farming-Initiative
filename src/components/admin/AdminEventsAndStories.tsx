import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  Plus,
  Trash2,
  Edit3,
  MapPin,
  Clock,
  User,
  Quote,
  Check,
  X
} from 'lucide-react';
import {
  UpcomingEvent,
  SuccessStory,
  saveUpcomingEvents,
  saveSuccessStories,
  logAdminActivity
} from '../../data/adminStore';

interface AdminEventsAndStoriesProps {
  events: UpcomingEvent[];
  stories: SuccessStory[];
  onEventsUpdated: (updated: UpcomingEvent[]) => void;
  onStoriesUpdated: (updated: SuccessStory[]) => void;
}

export const AdminEventsAndStories: React.FC<AdminEventsAndStoriesProps> = ({
  events,
  stories,
  onEventsUpdated,
  onStoriesUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'stories'>('events');

  // Event form
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventCategory, setEventCategory] = useState<UpcomingEvent['category']>('Agricultural Workshop');

  // Story form
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [storyTitle, setStoryTitle] = useState('');
  const [storyBeneficiary, setStoryBeneficiary] = useState('');
  const [storyCategory, setStoryCategory] = useState('Vulnerable Family Support');
  const [storyQuote, setStoryQuote] = useState('');
  const [storyNarrative, setStoryNarrative] = useState('');
  const [storyPhoto, setStoryPhoto] = useState('/src/assets/images/family_starter_kit_1790277954367.jpg');
  const [storyMetric, setStoryMetric] = useState('100% Recidivism-Free');
  const [storyLocation, setStoryLocation] = useState('Wakiso District');

  // EVENT HANDLERS
  const handleOpenAddEvent = () => {
    setEditingEventId(null);
    setEventTitle('');
    setEventDate(new Date().toISOString().split('T')[0]);
    setEventTime('09:00 AM - 02:00 PM');
    setEventLocation('Wakiso ACE Hub Main Training Hall');
    setEventDescription('');
    setEventCategory('Agricultural Workshop');
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    if (editingEventId) {
      const updated = events.map(ev =>
        ev.id === editingEventId
          ? {
              ...ev,
              title: eventTitle.trim(),
              date: eventDate,
              time: eventTime,
              location: eventLocation,
              description: eventDescription,
              category: eventCategory,
            }
          : ev
      );
      saveUpcomingEvents(updated);
      onEventsUpdated(updated);
      logAdminActivity('Updated Upcoming Event', 'event', eventTitle, 'Administrator');
    } else {
      const newEv: UpcomingEvent = {
        id: `evt-${Date.now()}`,
        title: eventTitle.trim(),
        date: eventDate,
        time: eventTime,
        location: eventLocation,
        description: eventDescription,
        category: eventCategory,
        status: 'Published',
        registeredCount: 0,
      };
      const updated = [newEv, ...events];
      saveUpcomingEvents(updated);
      onEventsUpdated(updated);
      logAdminActivity('Created Upcoming Event', 'event', newEv.title, 'Administrator');
    }
    setIsEventModalOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('Delete this event?')) {
      const updated = events.filter(e => e.id !== id);
      saveUpcomingEvents(updated);
      onEventsUpdated(updated);
    }
  };

  // STORY HANDLERS
  const handleOpenAddStory = () => {
    setEditingStoryId(null);
    setStoryTitle('');
    setStoryBeneficiary('');
    setStoryCategory('Vulnerable Family Support');
    setStoryQuote('');
    setStoryNarrative('');
    setStoryPhoto('/src/assets/images/women_village_savings_1790277977734.jpg');
    setStoryMetric('100% Food Secure');
    setStoryLocation('Wakiso District');
    setIsStoryModalOpen(true);
  };

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyTitle.trim() || !storyBeneficiary.trim()) return;

    if (editingStoryId) {
      const updated = stories.map(s =>
        s.id === editingStoryId
          ? {
              ...s,
              title: storyTitle.trim(),
              beneficiaryName: storyBeneficiary.trim(),
              category: storyCategory,
              quote: storyQuote.trim(),
              narrative: storyNarrative.trim(),
              photoUrl: storyPhoto,
              impactMetric: storyMetric.trim(),
              location: storyLocation,
            }
          : s
      );
      saveSuccessStories(updated);
      onStoriesUpdated(updated);
      logAdminActivity('Updated Success Story', 'story', storyTitle, 'Administrator');
    } else {
      const newStory: SuccessStory = {
        id: `sty-${Date.now()}`,
        title: storyTitle.trim(),
        beneficiaryName: storyBeneficiary.trim(),
        category: storyCategory,
        quote: storyQuote.trim(),
        narrative: storyNarrative.trim(),
        photoUrl: storyPhoto,
        impactMetric: storyMetric.trim(),
        location: storyLocation,
        date: new Date().toISOString().split('T')[0],
        status: 'Published',
      };
      const updated = [newStory, ...stories];
      saveSuccessStories(updated);
      onStoriesUpdated(updated);
      logAdminActivity('Published Beneficiary Success Story', 'story', newStory.title, 'Administrator');
    }
    setIsStoryModalOpen(false);
  };

  const handleDeleteStory = (id: string) => {
    if (confirm('Delete this success story?')) {
      const updated = stories.filter(s => s.id !== id);
      saveSuccessStories(updated);
      onStoriesUpdated(updated);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Toggle */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Events &amp; Beneficiary Testimonials
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage upcoming regional events, workshops, missions, and verified beneficiary success stories.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-stone-100 p-1 rounded-xl text-xs flex">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'events' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
              }`}
            >
              Upcoming Events ({events.length})
            </button>
            <button
              onClick={() => setActiveTab('stories')}
              className={`px-4 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'stories' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
              }`}
            >
              Success Stories ({stories.length})
            </button>
          </div>

          <button
            onClick={activeTab === 'events' ? handleOpenAddEvent : handleOpenAddStory}
            className="px-3.5 py-2 bg-[#164E33] hover:bg-[#0D281A] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{activeTab === 'events' ? 'New Event' : 'New Story'}</span>
          </button>
        </div>
      </div>

      {/* EVENTS TAB */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-3xl border border-stone-200 p-5 space-y-3 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                    {ev.category}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md">
                    {ev.date}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base text-stone-900 leading-snug">
                  {ev.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {ev.description}
                </p>
                <div className="space-y-1 text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="truncate">{ev.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-stone-400">
                  {ev.registeredCount || 0} RSVPs logged
                </span>
                <button
                  onClick={() => handleDeleteEvent(ev.id)}
                  className="p-1 text-stone-400 hover:text-red-600 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* STORIES TAB */}
      {activeTab === 'stories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((sty) => (
            <div
              key={sty.id}
              className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 hover:border-yellow-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-yellow-50 text-yellow-800 border border-yellow-200 text-[10px] font-bold uppercase tracking-wider">
                    {sty.category}
                  </span>
                  <span className="text-[11px] font-mono text-stone-400">
                    {sty.date}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={sty.photoUrl}
                    alt={sty.beneficiaryName}
                    className="w-12 h-12 rounded-xl object-cover bg-stone-100 shrink-0 border"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-base text-stone-900 leading-snug">
                      {sty.title}
                    </h4>
                    <div className="text-xs text-[#164E33] font-semibold">
                      {sty.beneficiaryName} · {sty.location}
                    </div>
                  </div>
                </div>

                <blockquote className="text-xs text-stone-700 italic bg-stone-50 p-3 rounded-xl border border-stone-200 leading-relaxed">
                  "{sty.quote}"
                </blockquote>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {sty.narrative}
                </p>

                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center justify-between">
                  <span>Verified Outcome:</span>
                  <span className="font-bold">{sty.impactMetric}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-end">
                <button
                  onClick={() => handleDeleteStory(sty.id)}
                  className="p-1 text-stone-400 hover:text-red-600 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Event Add Modal */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveEvent}
            className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200 text-xs"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {editingEventId ? 'Edit Event' : 'Create New Event'}
              </h3>
              <button
                type="button"
                onClick={() => setIsEventModalOpen(false)}
                className="p-1 rounded-lg hover:bg-stone-100 text-stone-500"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-stone-800">Event Title *</label>
              <input
                type="text"
                required
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="e.g. Smallholder Seedling Distribution Day"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-stone-800">Date *</label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-stone-800">Time</label>
                <input
                  type="text"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  placeholder="09:00 AM - 02:00 PM"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-stone-800">Location</label>
              <input
                type="text"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                placeholder="Wakiso ACE Hub Main Training Hall"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-stone-800">Description</label>
              <textarea
                rows={3}
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Objectives and schedule overview..."
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>

            <div className="pt-3 border-t flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEventModalOpen(false)}
                className="px-4 py-2 font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 font-bold text-white bg-[#164E33] hover:bg-[#0D281A] rounded-xl"
              >
                Save Event
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Story Add Modal */}
      {isStoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveStory}
            className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-stone-200 text-xs"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {editingStoryId ? 'Edit Story' : 'New Beneficiary Story'}
              </h3>
              <button
                type="button"
                onClick={() => setIsStoryModalOpen(false)}
                className="p-1 rounded-lg hover:bg-stone-100 text-stone-500"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-stone-800">Story Title *</label>
              <input
                type="text"
                required
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
                placeholder="e.g. From Dependency to Self-Reliant Poultry Farming"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-stone-800">Beneficiary Name *</label>
                <input
                  type="text"
                  required
                  value={storyBeneficiary}
                  onChange={(e) => setStoryBeneficiary(e.target.value)}
                  placeholder="e.g. Gerald K. (Kasangati)"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-stone-800">Impact Metric</label>
                <input
                  type="text"
                  value={storyMetric}
                  onChange={(e) => setStoryMetric(e.target.value)}
                  placeholder="e.g. 100% Recidivism-Free"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-stone-800">Quote</label>
              <input
                type="text"
                value={storyQuote}
                onChange={(e) => setStoryQuote(e.target.value)}
                placeholder="Beneficiary's personal quote..."
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-stone-800">Narrative Description</label>
              <textarea
                rows={3}
                value={storyNarrative}
                onChange={(e) => setStoryNarrative(e.target.value)}
                placeholder="Detailed case background..."
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>

            <div className="pt-3 border-t flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsStoryModalOpen(false)}
                className="px-4 py-2 font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 font-bold text-white bg-[#164E33] hover:bg-[#0D281A] rounded-xl"
              >
                Save Story
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
