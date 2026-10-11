import React from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Sprout, 
  Users, 
  Sparkles, 
  Trees, 
  Check,
  Compass
} from 'lucide-react';

export const FAITH_PILLARS = [
  {
    name: 'Faith',
    scriptureRef: 'Hebrews 11:1',
    headline: 'Confidence in Unseen Possibility',
    description: 'We believe God sees value in every human being, regardless of past brokenness, incarceration, or poverty. Faith transforms defeat into purpose.',
  },
  {
    name: 'Hope',
    scriptureRef: 'Romans 15:13',
    headline: 'Anchoring Hearts for Tomorrow',
    description: 'Hope is not mere wishful thinking; it is the resilient conviction that restoration is possible. We bring living encouragement into dark cells and forgotten villages.',
  },
  {
    name: 'Integrity',
    scriptureRef: 'Proverbs 11:3',
    headline: 'Ethical Living & Honest Labor',
    description: 'Transformation takes root when individuals embrace personal accountability, moral transparency, and the dignity of earning bread through honest hands.',
  },
  {
    name: 'Stewardship',
    scriptureRef: 'Genesis 2:15',
    headline: 'Faithful Care of Earth & Harvest',
    description: 'We view agricultural work as holy stewardship of God’s soil, water, and creatures. Bio-intensive farming cares for the land so the land sustains the family.',
  },
  {
    name: 'Compassion',
    scriptureRef: 'Colossians 3:12',
    headline: 'Walking with the Vulnerable',
    description: 'Our ministry serves with deep empathy, reaching prisoners, widows, and orphans without judgment, paternalism, or condescension.',
  },
  {
    name: 'Service',
    scriptureRef: 'Galatians 5:13',
    headline: 'Love Expressed Through Action',
    description: 'Christ demonstrated leadership by washing feet. We follow His example through practical service—sharing tools, teaching skills, and visiting the sick and imprisoned.',
  },
];

interface SpiritualFoundationSectionProps {
  onNavigate?: (page: string) => void;
}

export const SpiritualFoundationSection: React.FC<SpiritualFoundationSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Trees className="w-3.5 h-3.5 text-emerald-700" />
            <span>Spiritual Foundation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Rooted in Faith, Guided by Hope, Committed to Service
          </h2>

          <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            Our Christian foundation is an open embrace, not an aggressive doctrine. We root personal integrity, emotional restoration, and ethical stewardship in Jesus Christ—respecting every person&apos;s dignity while demonstrating Christ&apos;s love through tangible deeds.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FAITH_PILLARS.map((pillar) => (
            <div
              key={pillar.name}
              className="p-7 rounded-3xl bg-[#FBF9F5] border border-stone-200 hover:border-emerald-500/50 hover:shadow-md transition-all space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl font-bold text-emerald-900 group-hover:text-emerald-700 transition-colors">
                  {pillar.name}
                </span>
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {pillar.scriptureRef}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-bold text-base text-stone-900">
                  {pillar.headline}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Practiced daily in our field operations</span>
              </div>
            </div>
          ))}
        </div>

        {/* Biblical Principles Callout */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#064E3B] via-[#0A2618] to-[#042419] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs uppercase font-mono font-bold tracking-wider text-yellow-300">
              Matthew 25:35–40 Foundation
            </div>
            <blockquote className="font-serif italic text-base sm:text-lg text-emerald-100 leading-snug">
              &ldquo;I was in prison and you came to visit me... whatever you did for one of the least of these brothers and sisters of mine, you did for me.&rdquo;
            </blockquote>
            <p className="text-xs text-stone-300">
              This mandate inspires our volunteers to visit cells, distribute Bibles, teach farming, and walk alongside reformed men and women for 12 months after release.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate('about')}
            className="px-6 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md shrink-0 cursor-pointer"
          >
            Learn More About Our Values
          </button>
        </div>
      </div>
    </section>
  );
};
