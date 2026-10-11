import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  UploadCloud,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Check,
  X,
  Filter,
  Tag
} from 'lucide-react';
import { GalleryImage, saveGalleryImages, logAdminActivity } from '../../data/adminStore';

interface AdminGalleryManagerProps {
  gallery: GalleryImage[];
  onGalleryUpdated: (updated: GalleryImage[]) => void;
}

const GALLERY_CATEGORIES: GalleryImage['category'][] = [
  'Agriculture',
  'Community',
  'Education',
  'Training',
  'Events',
  'Outreach',
  'ACE Hub',
  'Church',
  'General'
];

export const AdminGalleryManager: React.FC<AdminGalleryManagerProps> = ({
  gallery,
  onGalleryUpdated,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Upload Form Fields
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState<GalleryImage['category']>('Agriculture');
  const [isFeatured, setIsFeatured] = useState(false);

  const [previewImage, setPreviewImage] = useState<GalleryImage | null>(null);

  // File reader for multiple or single file uploads
  const handleMultipleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const newImage: GalleryImage = {
            id: `gal-${Date.now()}-${index}`,
            url: reader.result as string,
            caption: file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '),
            category: category,
            isFeatured: false,
            isVisible: true,
            uploadedDate: new Date().toISOString().split('T')[0],
            order: gallery.length + index + 1,
          };
          const updated = [newImage, ...gallery];
          saveGalleryImages(updated);
          onGalleryUpdated(updated);
          logAdminActivity('Uploaded Gallery Photo', 'gallery', newImage.caption, 'Administrator');
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddSingleUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;

    const newImage: GalleryImage = {
      id: `gal-${Date.now()}`,
      url: imageUrl.trim(),
      caption: caption.trim() || 'IFHCFI Field Activity',
      category: category,
      isFeatured: isFeatured,
      isVisible: true,
      uploadedDate: new Date().toISOString().split('T')[0],
      order: gallery.length + 1,
    };

    const updated = [newImage, ...gallery];
    saveGalleryImages(updated);
    onGalleryUpdated(updated);
    logAdminActivity('Added Gallery Image', 'gallery', newImage.caption, 'Administrator');

    setImageUrl('');
    setCaption('');
    setIsUploadModalOpen(false);
  };

  const handleToggleVisibility = (id: string) => {
    const updated = gallery.map(g => (g.id === id ? { ...g, isVisible: !g.isVisible } : g));
    saveGalleryImages(updated);
    onGalleryUpdated(updated);
  };

  const handleToggleFeatured = (id: string) => {
    const updated = gallery.map(g => (g.id === id ? { ...g, isFeatured: !g.isFeatured } : g));
    saveGalleryImages(updated);
    onGalleryUpdated(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this gallery image?')) {
      const target = gallery.find(g => g.id === id);
      const updated = gallery.filter(g => g.id !== id);
      saveGalleryImages(updated);
      onGalleryUpdated(updated);
      if (target) {
        logAdminActivity('Deleted Gallery Image', 'gallery', target.caption, 'Administrator');
      }
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newItems = [...gallery];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    saveGalleryImages(newItems);
    onGalleryUpdated(newItems);
  };

  const filteredGallery = gallery.filter(g => {
    if (selectedCategory === 'All') return true;
    return g.category === selectedCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#164E33]">
            <ImageIcon className="w-4 h-4 text-emerald-700" />
            <span>Institutional Visual Media &amp; Field Photography</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
            Media &amp; Gallery Manager
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Upload single or multiple images, assign categories, manage captions, reorder display hierarchy, and toggle public visibility.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2.5 bg-[#164E33] hover:bg-[#0D281A] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer self-start md:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Image(s)</span>
        </button>
      </div>

      {/* Category Tabs & Upload Callout */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-xs">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === 'All'
                ? 'bg-[#164E33] text-white shadow-2xs font-bold'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            All Photos ({gallery.length})
          </button>
          {GALLERY_CATEGORIES.map(cat => {
            const count = gallery.filter(g => g.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#164E33] text-white shadow-2xs font-bold'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <label className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#164E33] border border-emerald-200 rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-colors shrink-0">
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Upload Multiple Files</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleMultipleFilesUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredGallery.map((item, index) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border overflow-hidden shadow-2xs transition-all duration-200 flex flex-col justify-between group ${
              item.isVisible ? 'border-stone-200 hover:shadow-md' : 'border-stone-300 opacity-60'
            }`}
          >
            {/* Image Box */}
            <div className="relative aspect-4/3 bg-stone-900 overflow-hidden">
              <img
                src={item.url}
                alt={item.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => setPreviewImage(item)}
              />
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="px-2 py-0.5 rounded-full bg-black/60 text-white text-[9px] font-mono border border-white/20">
                  {item.category}
                </span>
                {item.isFeatured && (
                  <span className="px-1.5 py-0.5 rounded-full bg-yellow-400 text-stone-900 text-[9px] font-bold">
                    ★
                  </span>
                )}
              </div>
              {!item.isVisible && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-[11px] font-semibold">
                  Hidden
                </div>
              )}
            </div>

            {/* Caption & Controls */}
            <div className="p-3 space-y-2 text-xs flex-1 flex flex-col justify-between">
              <p className="text-[11px] text-stone-700 line-clamp-2 font-medium" title={item.caption}>
                {item.caption}
              </p>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                {/* Reorder Buttons */}
                <div className="flex items-center gap-0.5 text-stone-400">
                  <button
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    className="p-1 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                    title="Move up"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === filteredGallery.length - 1}
                    className="p-1 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                    title="Move down"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleFeatured(item.id)}
                    className={`p-1 rounded transition-colors cursor-pointer ${
                      item.isFeatured ? 'text-yellow-600 bg-yellow-50' : 'text-stone-400 hover:text-stone-600'
                    }`}
                    title={item.isFeatured ? 'Remove from featured' : 'Make featured'}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleToggleVisibility(item.id)}
                    className={`p-1 rounded transition-colors cursor-pointer ${
                      item.isVisible ? 'text-emerald-700 hover:bg-emerald-50' : 'text-stone-400 hover:bg-stone-100'
                    }`}
                    title={item.isVisible ? 'Hide image' : 'Show image'}
                  >
                    {item.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 text-stone-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                    title="Delete image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Fullscreen Image Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-3 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                Category: {previewImage.category}
              </span>
              <button
                onClick={() => setPreviewImage(null)}
                className="p-1 rounded-lg text-stone-500 hover:bg-stone-100 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden max-h-[60vh] bg-stone-900 flex items-center justify-center">
              <img src={previewImage.url} alt={previewImage.caption} className="max-h-[60vh] object-contain" />
            </div>
            <p className="text-xs sm:text-sm text-stone-800 font-medium">
              {previewImage.caption}
            </p>
            <div className="text-[11px] text-stone-400 font-mono">
              Uploaded on {previewImage.uploadedDate}
            </div>
          </div>
        </div>
      )}

      {/* Upload Single Photo Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleAddSingleUrl}
            className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200 animate-in zoom-in-95 text-xs"
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Upload / Add Photo to Gallery
              </h3>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded-lg hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-stone-800 block">Image URL *</label>
              <input
                type="text"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://... or data URL"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-stone-800 block">Caption / Description</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Farmers inspecting high-yield cabbage seedlings"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-stone-800 block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
              >
                {GALLERY_CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-2 cursor-pointer p-2.5 bg-stone-50 rounded-xl border border-stone-200">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-emerald-800 rounded"
              />
              <span className="font-semibold text-stone-800">Set as Featured Gallery Image</span>
            </label>

            <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-white bg-[#164E33] hover:bg-[#0D281A] rounded-xl font-bold cursor-pointer"
              >
                Save Photo
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
