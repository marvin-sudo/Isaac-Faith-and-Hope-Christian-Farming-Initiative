import React, { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Eye,
  Edit3,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface ProgrammeContentEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export const ProgrammeContentEditor: React.FC<ProgrammeContentEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write comprehensive programme overview, objectives, methodology, and field verification...',
  minHeight = '320px',
}) => {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormatting = (prefix: string, suffix: string = '', defaultText: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = value.substring(start, end) || defaultText;

    const replacement = `${prefix}${selection}${suffix}`;
    const newValue = value.substring(0, start) + replacement + value.substring(end);

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selection.length
      );
    }, 10);
  };

  const handleInsertHeading2 = () => insertFormatting('\n## ', '\n', 'Section Title');
  const handleInsertHeading3 = () => insertFormatting('\n### ', '\n', 'Subsection Title');
  const handleInsertBold = () => insertFormatting('**', '**', 'bold text');
  const handleInsertItalic = () => insertFormatting('*', '*', 'italic text');
  const handleInsertList = () => insertFormatting('\n• ', '\n', 'Key practical intervention activity');
  const handleInsertQuote = () => insertFormatting('\n> ', '\n', 'Inspiring statement or biblical guiding principle');
  const handleInsertLink = () => {
    const url = prompt('Enter destination URL (e.g. https://... or #contact):', 'https://');
    if (url) {
      insertFormatting('[', `](${url})`, 'Link Text');
    }
  };
  const handleInsertImage = () => {
    const url = prompt('Enter Image URL:', 'https://i.postimg.cc/');
    if (url) {
      const caption = prompt('Enter Image Caption:', 'Field demonstration photo');
      insertFormatting(`\n![${caption || 'Photo'}](${url})\n`);
    }
  };

  // Simple Markdown renderer for Preview mode
  const renderPreview = (text: string) => {
    if (!text.trim()) {
      return (
        <p className="text-stone-400 italic text-sm">
          No content written yet. Switch to the "Write" tab to begin crafting the programme overview.
        </p>
      );
    }

    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listBuffer: string[] = [];

    const flushList = (keyPrefix: number) => {
      if (listBuffer.length > 0) {
        elements.push(
          <ul key={`ul-${keyPrefix}`} className="space-y-1.5 my-3 pl-2">
            {listBuffer.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-stone-700 text-sm">
                <span className="text-emerald-700 font-bold shrink-0 mt-0.5">•</span>
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ul>
        );
        listBuffer = [];
      }
    };

    const renderInline = (str: string): React.ReactNode => {
      // Bold **text**
      const parts: React.ReactNode[] = [];
      let current = str;
      let counter = 0;

      // Handle bold **...**
      const boldRegex = /\*\*(.*?)\*\*/g;
      let match;
      let lastIndex = 0;

      while ((match = boldRegex.exec(current)) !== null) {
        if (match.index > lastIndex) {
          parts.push(current.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={`b-${counter++}`} className="font-semibold text-stone-900">
            {match[1]}
          </strong>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < current.length) {
        parts.push(current.substring(lastIndex));
      }

      return parts.length > 0 ? parts : str;
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Check bullet list
      if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        listBuffer.push(trimmed.substring(2));
        return;
      }

      flushList(index);

      if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-6 mb-2 border-b border-stone-200/80 pb-1.5">
            {trimmed.substring(3)}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-lg font-serif font-bold text-[#164E33] mt-4 mb-1.5">
            {trimmed.substring(4)}
          </h3>
        );
      } else if (trimmed.startsWith('> ')) {
        elements.push(
          <blockquote key={index} className="border-l-4 border-emerald-600 bg-emerald-50/70 p-3.5 my-3 rounded-r-xl text-stone-800 text-sm italic">
            {trimmed.substring(2)}
          </blockquote>
        );
      } else if (trimmed.startsWith('![') && trimmed.includes('](')) {
        const altMatch = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
        if (altMatch) {
          elements.push(
            <div key={index} className="my-4 rounded-xl overflow-hidden border border-stone-200 shadow-xs">
              <img src={altMatch[2]} alt={altMatch[1]} className="w-full h-56 object-cover" />
              {altMatch[1] && (
                <div className="p-2 text-xs text-stone-500 bg-stone-50 border-t border-stone-200 text-center italic">
                  {altMatch[1]}
                </div>
              )}
            </div>
          );
        }
      } else if (trimmed === '') {
        // empty space
      } else {
        elements.push(
          <p key={index} className="text-stone-700 text-sm leading-relaxed my-2">
            {renderInline(trimmed)}
          </p>
        );
      }
    });

    flushList(lines.length);

    return <div className="space-y-1">{elements}</div>;
  };

  return (
    <div className="border border-stone-300 rounded-xl overflow-hidden bg-white shadow-2xs">
      {/* Editor Header Toolbar */}
      <div className="bg-stone-100/90 border-b border-stone-200 px-3 py-2 flex flex-wrap items-center justify-between gap-2">
        {/* Formatting Actions (Enabled only in write mode) */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={handleInsertHeading2}
            disabled={activeTab === 'preview'}
            className="p-1.5 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-stone-200/80 transition-colors disabled:opacity-40 cursor-pointer"
            title="Heading 2 (## Section Title)"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleInsertHeading3}
            disabled={activeTab === 'preview'}
            className="p-1.5 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-stone-200/80 transition-colors disabled:opacity-40 cursor-pointer"
            title="Heading 3 (### Subsection Title)"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <span className="w-px h-4 bg-stone-300 mx-1" />
          <button
            type="button"
            onClick={handleInsertBold}
            disabled={activeTab === 'preview'}
            className="p-1.5 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-stone-200/80 transition-colors disabled:opacity-40 cursor-pointer"
            title="Bold (**text**)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleInsertItalic}
            disabled={activeTab === 'preview'}
            className="p-1.5 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-stone-200/80 transition-colors disabled:opacity-40 cursor-pointer"
            title="Italic (*text*)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <span className="w-px h-4 bg-stone-300 mx-1" />
          <button
            type="button"
            onClick={handleInsertList}
            disabled={activeTab === 'preview'}
            className="p-1.5 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-stone-200/80 transition-colors disabled:opacity-40 cursor-pointer"
            title="Bullet Point List (• item)"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleInsertQuote}
            disabled={activeTab === 'preview'}
            className="p-1.5 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-stone-200/80 transition-colors disabled:opacity-40 cursor-pointer"
            title="Quote Block (> quote)"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleInsertLink}
            disabled={activeTab === 'preview'}
            className="p-1.5 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-stone-200/80 transition-colors disabled:opacity-40 cursor-pointer"
            title="Hyperlink ([text](url))"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleInsertImage}
            disabled={activeTab === 'preview'}
            className="p-1.5 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-stone-200/80 transition-colors disabled:opacity-40 cursor-pointer"
            title="Insert Photo URL (![caption](url))"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Write vs Preview Mode Toggle */}
        <div className="flex items-center gap-1 bg-stone-200/70 p-0.5 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'write'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Write / Edit</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-[#164E33] text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      {activeTab === 'write' ? (
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={12}
            style={{ minHeight }}
            className="w-full p-4 text-xs sm:text-sm font-sans text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#164E33] focus:border-transparent resize-y leading-relaxed"
          />
          <div className="px-4 py-2 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-600" />
              <span>Supports Headings, Bullets, Quotes, Links &amp; Photos</span>
            </span>
            <span>{value.length} characters · {value.split(/\s+/).filter(Boolean).length} words</span>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-[#FCFAF6] border-t border-stone-200 overflow-y-auto" style={{ minHeight }}>
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
            <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold mb-3 flex items-center gap-1.5">
              <span>Public Website Article Preview</span>
            </div>
            {renderPreview(value)}
          </div>
        </div>
      )}
    </div>
  );
};
