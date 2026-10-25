import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Tag, 
  Eye, 
  Maximize2 
} from 'lucide-react';
import { getGalleryImages, GalleryImage } from '../data/adminStore';

export const GALLERY_CATEGORIES = [
  'All',
  'Prison Ministry',
  'Agriculture',
  'Training',
  'Community Outreach',
  'ACE Hub',
  'Church',
  'General'
] as const;

export const PublicGallerySection: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>(() => 
    getGalleryImages().filter(img => img.isVisible)
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setImages(getGalleryImages().filter(img => img.isVisible));
    };
    window.addEventListener('ifhcfi_gallery_updated', handleUpdate);
    return () => window.removeEventListener('ifhcfi_gallery_updated', handleUpdate);
  }, []);

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  const currentLightboxImg = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span>Living Proof &amp; Field Evidence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Media Gallery &amp; Living Proof
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Authentic moments from our demonstration acreage, prison church services, greenhouse nursery beds, and village family starter-kit distributions.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {GALLERY_CATEGORIES.map((cat) => {
            const isSelected = cat === selectedCategory;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md'
                    : 'bg-white text-stone-700 hover:bg-stone-100 hover:text-orange-600 border border-stone-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => handleOpenLightbox(idx)}
              className="relative h-64 rounded-2xl overflow-hidden bg-stone-900 group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={img.url}
                alt={img.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Category Pill Tag */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-emerald-300 text-[10px] font-mono border border-white/20">
                  {img.category}
                </span>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-black/60 text-white">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                <p className="text-xs font-medium leading-snug line-clamp-2">
                  {img.caption}
                </p>
                <div className="text-[10px] text-stone-400 font-mono">
                  {img.uploadedDate}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="p-12 text-center text-stone-500 bg-white rounded-2xl border border-stone-200 text-sm">
            No gallery images found in category &ldquo;{selectedCategory}&rdquo;.
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && currentLightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
          onClick={handleCloseLightbox}
        >
          {/* Close button */}
          <button
            onClick={handleCloseLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-50"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-50"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black max-h-[70vh]">
              <img
                src={currentLightboxImg.url}
                alt={currentLightboxImg.caption}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="mt-4 text-center max-w-xl text-white space-y-1">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                {currentLightboxImg.category} · {currentLightboxImg.uploadedDate}
              </div>
              <p className="text-sm text-stone-200">
                {currentLightboxImg.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
