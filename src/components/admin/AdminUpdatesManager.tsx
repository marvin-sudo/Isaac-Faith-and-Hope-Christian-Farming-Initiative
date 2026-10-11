import React, { useState } from 'react';
import {
  Newspaper,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Calendar,
  User,
  Check,
  X,
  Eye,
  Sparkles,
  ArrowRight,
  UploadCloud
} from 'lucide-react';
import { WebsiteUpdate, saveWebsiteUpdates, logAdminActivity } from '../../data/adminStore';
import { ProgrammeContentEditor } from './ProgrammeContentEditor';

interface AdminUpdatesManagerProps {
  updates: WebsiteUpdate[];
  onUpdatesUpdated: (updated: WebsiteUpdate[]) => void;
}

const UPDATE_CATEGORIES = [
  'Field Mission',
  'Agricultural Harvest',
  'Prison Outreach',
  'Training Graduation',
  'Institutional Announcement',
  'ACE Hub Progress'
];

export const AdminUpdatesManager: React.FC<AdminUpdatesManagerProps> = ({
  updates,
  onUpdatesUpdated,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [fullArticle, setFullArticle] = useState('');
  const [featuredImage, setFeaturedImage] = useState('https://i.postimg.cc/C1qp29XX/Gemini-Generated-Image-1ppnm1ppnm1ppnm1.jpg');
  const [category, setCategory] = useState<WebsiteUpdate['category']>('Field Mission');
  const [author, setAuthor] = useState('Mukaga Titus Joshua (Country Coordinator)');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<'Published' | 'Draft'>('Published');
  const [featured, setFeatured] = useState(false);

  const [previewItem, setPreviewItem] = useState<WebsiteUpdate | null>(null);

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setSummary('');
    setFullArticle(`## Field Report & Updates\n\nProvide the narrative details of the field mission, workshop, or milestone.\n\n### Key Highlights\n• Direct beneficiaries served\n• Practical outputs achieved\n• Next scheduled outreach`);
    setFeaturedImage('https://i.postimg.cc/GhC5NVNJ/Gemini-Generated-Image-8y9pg68y9pg68y9p.jpg');
    setCategory('Field Mission');
    setAuthor('Mukaga Titus Joshua (Country Coordinator)');
    setDate(new Date().toISOString().split('T')[0]);
    setStatus('Published');
    setFeatured(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: WebsiteUpdate) => {
    setEditingId(item.id);
    setTitle(item.title);
    setSummary(item.summary);
    setFullArticle(item.fullArticle);
    setFeaturedImage(item.featuredImage);
    setCategory(item.category);
    setAuthor(item.author);
    setDate(item.date);
    setStatus(item.status);
    setFeatured(!!item.featured);
    setIsModalOpen(true);
  };

  const handleSave = (targetStatus: 'Published' | 'Draft') => {
    if (!title.trim() || !summary.trim()) {
      alert('Please fill out the update title and summary.');
      return;
    }

    if (editingId) {
      const updated = updates.map(u =>
        u.id === editingId
          ? {
              ...u,
              title: title.trim(),
              summary: summary.trim(),
              fullArticle: fullArticle.trim(),
              featuredImage,
              category,
              author,
              date,
              status: targetStatus,
              featured,
            }
          : u
      );
      saveWebsiteUpdates(updated);
      onUpdatesUpdated(updated);
      logAdminActivity('Updated Website Article', 'update', title, 'Administrator');
    } else {
      const newUpdate: WebsiteUpdate = {
        id: `upd-${Date.now()}`,
        title: title.trim(),
        summary: summary.trim(),
        fullArticle: fullArticle.trim(),
        featuredImage,
        category,
        author,
        date,
        status: targetStatus,
        featured,
      };
      const updated = [newUpdate, ...updates];
      saveWebsiteUpdates(updated);
      onUpdatesUpdated(updated);
      logAdminActivity(
        targetStatus === 'Published' ? 'Published Website News Update' : 'Saved News Update Draft',
        'update',
        newUpdate.title,
        'Administrator'
      );
    }
    setIsModalOpen(false);
  };

  const handleTogglePublish = (item: WebsiteUpdate) => {
    const nextStatus: 'Published' | 'Draft' = item.status === 'Published' ? 'Draft' : 'Published';
    const updated: WebsiteUpdate[] = updates.map(u => (u.id === item.id ? { ...u, status: nextStatus } : u));
    saveWebsiteUpdates(updated);
    onUpdatesUpdated(updated);
    logAdminActivity(
      nextStatus === 'Published' ? 'Published Website Update' : 'Unpublished Update',
      'update',
      item.title,
      'Administrator'
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      const target = updates.find(u => u.id === id);
      const updated = updates.filter(u => u.id !== id);
      saveWebsiteUpdates(updated);
      onUpdatesUpdated(updated);
      if (target) {
        logAdminActivity('Deleted Website Update', 'update', target.title, 'Administrator');
      }
    }
  };

  const filteredUpdates = updates.filter(u => {
    const matchesSearch =
      u.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || u.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#164E33]">
            <Newspaper className="w-4 h-4 text-emerald-700" />
            <span>Public News, Field Reports &amp; Announcements</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
            Website Updates &amp; News Manager
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Publish articles that automatically appear across the public IFHCFI website.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#164E33] hover:bg-[#0D281A] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer self-start md:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Update</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative min-w-[240px] flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search news by title, keywords or author..."
            className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164E33]"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-stone-500 font-medium">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#164E33]"
          >
            <option value="All">All Categories ({updates.length})</option>
            {UPDATE_CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Updates Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUpdates.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-stone-200 overflow-hidden hover:border-emerald-500/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="relative h-44 bg-stone-900 overflow-hidden">
              <img
                src={item.featuredImage}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs border ${
                    item.status === 'Published'
                      ? 'bg-emerald-700/90 text-white border-emerald-400/40'
                      : 'bg-amber-600/90 text-white border-amber-300/40'
                  }`}
                >
                  {item.status}
                </span>
                {item.featured && (
                  <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-stone-900 text-[10px] font-bold">
                    Featured
                  </span>
                )}
              </div>
              <div className="absolute top-3 right-3 text-[10px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded-full border border-white/20">
                {item.category}
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-serif font-bold text-base sm:text-lg leading-tight line-clamp-1">
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                {item.summary}
              </p>

              <div className="space-y-1 text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span className="truncate">{item.author}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{item.date}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => setPreviewItem(item)}
                  className="p-1.5 rounded-lg text-emerald-800 hover:bg-emerald-50 transition-colors cursor-pointer flex items-center gap-1 font-semibold"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Read Article</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleTogglePublish(item)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                      item.status === 'Published'
                        ? 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    }`}
                  >
                    {item.status === 'Published' ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="text-xs uppercase font-bold text-[#164E33]">
                {previewItem.category} · {previewItem.date}
              </span>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-1 rounded-lg hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              {previewItem.title}
            </h2>
            <div className="text-xs text-stone-500 font-medium">
              By {previewItem.author}
            </div>
            <div className="rounded-2xl overflow-hidden max-h-72 border border-stone-200">
              <img src={previewItem.featuredImage} alt="" className="w-full h-full object-cover" />
            </div>
            <p className="text-sm font-semibold text-stone-800 italic bg-stone-50 p-3 rounded-xl border border-stone-200">
              {previewItem.summary}
            </p>
            <div className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line space-y-2">
              {previewItem.fullArticle}
            </div>
            <div className="pt-4 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setPreviewItem(null)}
                className="px-5 py-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 rounded-xl cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-stone-200 max-h-[92vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#164E33]">
                  {editingId ? 'Edit Article' : 'Compose Field Update'}
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mt-0.5">
                  {editingId ? 'Edit Website Update' : 'New Website Update / News'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-800 rounded-xl bg-stone-100 hover:bg-stone-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-stone-800">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Wakiso Seedling Nursery Dome Enters Phase II"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-stone-800">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                  >
                    {UPDATE_CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-800">Summary Lead *</label>
                <textarea
                  rows={2}
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Key highlight for news cards..."
                  className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-800">Author</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-stone-800">Publication Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-800">Featured Image URL</label>
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-800">Full Article Content</label>
                <ProgrammeContentEditor
                  value={fullArticle}
                  onChange={setFullArticle}
                  minHeight="240px"
                  placeholder="Draft full field article..."
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 text-emerald-800 rounded"
                />
                <span className="font-semibold text-stone-800">Feature this update prominently</span>
              </label>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSave('Draft')}
                  className="px-4 py-2 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-xl cursor-pointer"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={() => handleSave('Published')}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#164E33] hover:bg-[#0D281A] rounded-xl cursor-pointer"
                >
                  Publish Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
