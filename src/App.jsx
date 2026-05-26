import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Star, Plus, Trash2, Upload, ArrowRight, ArrowLeft, Download, Sparkles, Trophy, TrendingUp, TrendingDown, Edit3, RotateCcw, Award, Move, X, Check } from 'lucide-react';

const COLORS = {
  bg: '#FFF8E7',
  ink: '#1A1A2E',
  pink: '#FF5C8A',
  yellow: '#FFD23F',
  blue: '#4361EE',
  mint: '#06D6A0',
  coral: '#FF6B35',
  lavender: '#B388EB',
};

// ⚠️ Replace these with your own info before deploying
const AUTHOR = {
  username: 'MuSu124', // your GitHub username
};
const GITHUB_URL = `https://github.com/${AUTHOR.username}`;

// ---------- Footer (declared outside main component) ----------
function Footer() {
  return (
    <footer className="py-6 px-4 flex items-center justify-center">
      <a>
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 text-xs font-bold transition-all hover:scale-105"
        style={{
          background: 'rgba(255,255,255,0.6)',
          borderColor: COLORS.ink,
          color: COLORS.ink,
        }}
      
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
        <span>Made by {AUTHOR.username}</span>
      </a>
    </footer>
  );
}

// ---------- Animated number (declared outside main component) ----------
function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  useEffect(() => {
    let raf;
    const start = prevRef.current;
    const end = value;
    const duration = 500;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(start + (end - start) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else prevRef.current = end;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{display.toFixed(1)}</>;
}

// ---------- Helper components (declared outside main component) ----------
function Header({ step, title, subtitle }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-black text-sm"
              style={{
                background: s <= step ? COLORS.ink : 'white',
                color: s <= step ? COLORS.yellow : COLORS.ink,
                borderColor: COLORS.ink,
              }}
            >
              {s}
            </div>
            {s < 3 && <div className="w-8 h-1" style={{ background: s < step ? COLORS.ink : 'rgba(0,0,0,0.2)' }} />}
          </div>
        ))}
      </div>
      <h1 className="text-4xl md:text-5xl font-black italic mb-2" style={{ color: COLORS.ink, fontFamily: 'Georgia, serif' }}>{title}</h1>
      <p className="text-base font-medium" style={{ color: COLORS.ink, opacity: 0.7 }}>{subtitle}</p>
    </div>
  );
}

function NavBar({ onBack, onNext, nextDisabled, nextLabel, backLabel = 'Back' }) {
  return (
    <div className="flex justify-between items-center pt-4">
      <button
        onClick={onBack}
        className="px-6 py-3 rounded-2xl border-4 font-black uppercase tracking-wide flex items-center gap-2 hover:scale-105 transition-transform"
        style={{ background: 'white', color: COLORS.ink, borderColor: COLORS.ink, boxShadow: `4px 4px 0 ${COLORS.ink}` }}
      >
        <ArrowLeft size={18} /> {backLabel}
      </button>
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className="px-8 py-3 rounded-2xl border-4 font-black uppercase tracking-wide flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        style={{ background: COLORS.ink, color: COLORS.yellow, borderColor: COLORS.ink, boxShadow: `4px 4px 0 ${COLORS.pink}` }}
      >
        {nextLabel} <ArrowRight size={18} />
      </button>
    </div>
  );
}

function EmptyState({ text, color }) {
  return (
    <div className="rounded-3xl border-4 border-dashed p-12 text-center mb-8" style={{ borderColor: COLORS.ink, background: 'rgba(255,255,255,0.5)' }}>
      <Award size={48} className="mx-auto mb-3" style={{ color }} />
      <p className="font-black text-lg" style={{ color: COLORS.ink }}>{text}</p>
    </div>
  );
}

function FilterButton({ active, onClick, color, icon, label, textColor }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full border-2 font-black uppercase text-xs tracking-wider flex items-center gap-2 transition-all hover:scale-105"
      style={{
        background: active ? color : 'white',
        color: active ? (textColor || COLORS.ink) : COLORS.ink,
        borderColor: COLORS.ink,
        boxShadow: active ? `3px 3px 0 ${COLORS.ink}` : 'none',
      }}
    >
      {icon} {label}
    </button>
  );
}

// ---------- Main app ----------
export default function RatingApp() {
  const [page, setPage] = useState(1);
  const [criteria, setCriteria] = useState([]);
  const [items, setItems] = useState([]);
  const [ratings, setRatings] = useState({});
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [resultOrder, setResultOrder] = useState('desc');
  const [resultFilter, setResultFilter] = useState('all');
  const [cameFromResults, setCameFromResults] = useState(false);
  const fileInputRef = useRef(null);
  const importInputRef = useRef(null);

  const [newCriterionName, setNewCriterionName] = useState('');
  const [newCriterionWeight, setNewCriterionWeight] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemImage, setNewItemImage] = useState(null);

  // Cropper state
  const [cropperSrc, setCropperSrc] = useState(null); // raw image data url
  const [cropperImg, setCropperImg] = useState(null); // HTMLImageElement once loaded
  const [cropOffset, setCropOffset] = useState({ x: 0, y: 0 }); // pan offset in display px
  const [cropZoom, setCropZoom] = useState(1); // 1 = "cover" minimum (image just fills crop area)
  const cropAreaRef = useRef(null);
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });

  // ---------- Logic ----------
  const addCriterion = () => {
    const w = parseFloat(newCriterionWeight);
    if (!newCriterionName.trim() || isNaN(w) || w === 0) return;
    setCriteria([...criteria, { id: Date.now() + Math.random(), name: newCriterionName.trim(), weight: w }]);
    setNewCriterionName('');
    setNewCriterionWeight('');
  };
  const removeCriterion = (id) => setCriteria(criteria.filter(c => c.id !== id));
  const updateCriterion = (id, field, value) => {
    setCriteria(criteria.map(c => c.id === id ? { ...c, [field]: field === 'weight' ? (parseFloat(value) || 0) : value } : c));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      // Load image to get its natural dimensions, then open cropper
      const img = new Image();
      img.onload = () => {
        setCropperImg(img);
        setCropperSrc(ev.target.result);
        setCropZoom(1);
        setCropOffset({ x: 0, y: 0 });
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
    // Reset file input so the same file can be re-selected if user cancels
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Compute the "cover" base size: smallest scale where image fully covers the square crop area
  const getCropDisplaySize = () => 280; // px — the visible crop area in the modal
  const getBaseImageSize = () => {
    if (!cropperImg) return { w: 0, h: 0 };
    const area = getCropDisplaySize();
    const scale = Math.max(area / cropperImg.naturalWidth, area / cropperImg.naturalHeight);
    return { w: cropperImg.naturalWidth * scale, h: cropperImg.naturalHeight * scale, scale };
  };

  // Clamp pan offset so image always covers the crop area
  const clampOffset = (offset, zoom) => {
    const base = getBaseImageSize();
    const area = getCropDisplaySize();
    const displayedW = base.w * zoom;
    const displayedH = base.h * zoom;
    const maxX = Math.max(0, (displayedW - area) / 2);
    const maxY = Math.max(0, (displayedH - area) / 2);
    return {
      x: Math.min(maxX, Math.max(-maxX, offset.x)),
      y: Math.min(maxY, Math.max(-maxY, offset.y)),
    };
  };

  const onCropMouseDown = (e) => {
    e.preventDefault();
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: cropOffset.x,
      originY: cropOffset.y,
    };
  };
  const onCropMouseMove = (e) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setCropOffset(clampOffset({ x: dragRef.current.originX + dx, y: dragRef.current.originY + dy }, cropZoom));
  };
  const onCropMouseUp = () => { dragRef.current.dragging = false; };

  const onCropTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    dragRef.current = {
      dragging: true,
      startX: t.clientX,
      startY: t.clientY,
      originX: cropOffset.x,
      originY: cropOffset.y,
    };
  };
  const onCropTouchMove = (e) => {
    if (!dragRef.current.dragging || e.touches.length !== 1) return;
    e.preventDefault();
    const t = e.touches[0];
    const dx = t.clientX - dragRef.current.startX;
    const dy = t.clientY - dragRef.current.startY;
    setCropOffset(clampOffset({ x: dragRef.current.originX + dx, y: dragRef.current.originY + dy }, cropZoom));
  };
  const onCropTouchEnd = () => { dragRef.current.dragging = false; };

  const onCropWheel = (e) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.002;
    const newZoom = Math.min(4, Math.max(1, cropZoom + delta));
    setCropZoom(newZoom);
    setCropOffset(clampOffset(cropOffset, newZoom));
  };

  const onZoomSlider = (e) => {
    const newZoom = parseFloat(e.target.value);
    setCropZoom(newZoom);
    setCropOffset(clampOffset(cropOffset, newZoom));
  };

  const cancelCrop = () => {
    setCropperSrc(null);
    setCropperImg(null);
  };

  const confirmCrop = () => {
    if (!cropperImg) return;
    const area = getCropDisplaySize();
    const base = getBaseImageSize();
    const displayedW = base.w * cropZoom;
    const displayedH = base.h * cropZoom;

    // In the display, image center is at (area/2 + cropOffset.x, area/2 + cropOffset.y)
    // Image top-left in display coords:
    const imgLeft = area / 2 + cropOffset.x - displayedW / 2;
    const imgTop = area / 2 + cropOffset.y - displayedH / 2;

    // Convert from display px → natural px on the source image
    // displayed-to-natural scale = naturalWidth / displayedW
    const naturalPerDisplay = cropperImg.naturalWidth / displayedW;

    // The crop area in display coords starts at (0, 0) and spans (area, area)
    // So in image-local display coords: (0 - imgLeft, 0 - imgTop) to (area - imgLeft, area - imgTop)
    const sx = (0 - imgLeft) * naturalPerDisplay;
    const sy = (0 - imgTop) * naturalPerDisplay;
    const sSize = area * naturalPerDisplay;

    // Output size: 600x600 for sharp results, capped at natural size
    const outSize = Math.min(600, Math.round(sSize));
    const canvas = document.createElement('canvas');
    canvas.width = outSize;
    canvas.height = outSize;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(cropperImg, sx, sy, sSize, sSize, 0, 0, outSize, outSize);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setNewItemImage(dataUrl);
    setCropperSrc(null);
    setCropperImg(null);
  };

  const addItem = () => {
    if (!newItemName.trim()) return;
    setItems([...items, { id: Date.now() + Math.random(), name: newItemName.trim(), image: newItemImage }]);
    setNewItemName('');
    setNewItemImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeItem = (id) => {
    setItems(items.filter(i => i.id !== id));
    const newRatings = { ...ratings };
    delete newRatings[id];
    setRatings(newRatings);
  };

  const setStarRating = (itemId, criterionId, stars) => {
    setRatings(prev => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [criterionId]: stars,
      },
    }));
  };

  const calculateScore = (itemId) => {
    const itemRatings = ratings[itemId] || {};
    let weighted = 0;
    let absWeightUsed = 0;
    criteria.forEach(c => {
      const stars = itemRatings[c.id];
      if (stars !== undefined) {
        weighted += stars * c.weight;
        absWeightUsed += Math.abs(c.weight);
      }
    });
    if (absWeightUsed === 0) return 0;
    return (weighted / absWeightUsed) * 20;
  };

  const isItemFullyRated = (itemId) => {
    const r = ratings[itemId] || {};
    return criteria.length > 0 && criteria.every(c => r[c.id] !== undefined);
  };

  const allItemsRated = items.length > 0 && items.every(i => isItemFullyRated(i.id));

  const handleExport = () => {
    const data = { criteria, items, ratings, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `score-o-matic-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.criteria && data.items) {
          setCriteria(data.criteria);
          setItems(data.items);
          setRatings(data.ratings || {});
          setPage(2);
        }
      } catch (err) {
        alert('Could not read that file.');
      }
    };
    reader.readAsText(file);
  };

  const sortedResults = useMemo(() => {
    const withScores = items.map(item => ({ ...item, score: calculateScore(item.id) }));
    if (resultFilter === 'best3') {
      return [...withScores].sort((a, b) => b.score - a.score).slice(0, 3);
    }
    if (resultFilter === 'worst3') {
      return [...withScores].sort((a, b) => a.score - b.score).slice(0, 3);
    }
    return [...withScores].sort((a, b) => resultOrder === 'desc' ? b.score - a.score : a.score - b.score);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, ratings, criteria, resultOrder, resultFilter]);

  const medals = ['🥇', '🥈', '🥉'];

  // ---------- Render ----------
  return (
    <div
      style={{
        background: COLORS.bg,
        minHeight: '100vh',
        backgroundImage: `radial-gradient(${COLORS.ink}10 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
        color: COLORS.ink,
      }}
    >
      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes growBar { from { width: 0%; } }
        input:focus { outline: none; }
      `}</style>

      {/* ============ PAGE 1: WELCOME ============ */}
      {page === 1 && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
          <div className="absolute top-10 left-10 w-24 h-24 rounded-full opacity-80 animate-bounce" style={{ background: COLORS.pink, animationDuration: '3s' }} />
          <div className="absolute top-20 right-16 w-16 h-16 opacity-80 animate-pulse" style={{ background: COLORS.mint, borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }} />
          <div className="absolute bottom-20 left-20 w-20 h-20 opacity-80 animate-spin" style={{ background: COLORS.yellow, animationDuration: '8s', clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />
          <div className="absolute bottom-32 right-24 w-12 h-12 rounded-full opacity-80" style={{ background: COLORS.lavender }} />
          <div className="absolute top-1/2 left-1/4 w-8 h-8 rounded-full opacity-60" style={{ background: COLORS.coral }} />
          <div className="absolute top-1/3 right-1/4 w-6 h-6 opacity-70 rotate-45" style={{ background: COLORS.blue }} />

          <div className="relative z-10 text-center max-w-2xl">
            <div className="inline-block mb-4 px-4 py-2 rounded-full" style={{ background: COLORS.ink, color: COLORS.yellow }}>
              <span className="text-sm font-bold tracking-widest uppercase">★ Rate Anything ★</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-black mb-2 leading-none tracking-tight" style={{ color: COLORS.ink, fontFamily: 'Georgia, serif' }}>The</h1>
            <h1 className="text-7xl md:text-9xl font-black mb-6 leading-none tracking-tighter italic" style={{ color: COLORS.pink, fontFamily: 'Georgia, serif', textShadow: `4px 4px 0 ${COLORS.ink}` }}>Score-O-Matic</h1>
            <p className="text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed" style={{ color: COLORS.ink }}>
              A delightfully scientific way to rank, judge, and crown your favorite things.
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center">
              {[
                { num: '01', label: 'Set criteria', color: COLORS.mint },
                { num: '02', label: 'Add items', color: COLORS.yellow },
                { num: '03', label: 'Rate & rank', color: COLORS.pink },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-2xl border-2 transform hover:rotate-2 transition-transform" style={{ background: step.color, borderColor: COLORS.ink, boxShadow: `4px 4px 0 ${COLORS.ink}` }}>
                  <span className="text-2xl font-black" style={{ color: COLORS.ink }}>{step.num}</span>
                  <span className="font-bold" style={{ color: COLORS.ink }}>{step.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPage(2)}
              className="group inline-flex items-center gap-3 px-10 py-5 text-xl font-black uppercase tracking-wider rounded-full border-4 transform hover:scale-105 hover:-rotate-2 transition-all"
              style={{ background: COLORS.ink, color: COLORS.yellow, borderColor: COLORS.ink, boxShadow: `8px 8px 0 ${COLORS.pink}` }}
            >
              Let's Go
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
            </button>

            <div className="mt-8 flex justify-center gap-4">
              <button onClick={() => importInputRef.current?.click()} className="text-sm underline opacity-60 hover:opacity-100" style={{ color: COLORS.ink }}>
                Import saved session
              </button>
              <input ref={importInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
            </div>
          </div>
        </div>
      )}

      {/* ============ PAGE 2: CRITERIA ============ */}
      {page === 2 && (
        <div className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
          <Header step={1} title="Define your criteria" subtitle="What dimensions matter? Give each one a weight." />

          <div className="rounded-2xl border-2 border-dashed p-3 mb-6 text-sm" style={{ borderColor: COLORS.ink, background: 'rgba(255,255,255,0.5)', color: COLORS.ink }}>
            <span className="font-black">💡 Tip:</span> use a <span className="font-bold">negative weight</span> for criteria where more stars should <em>lower</em> the score (e.g. "Noise level", "Cost"). Scores can dip below 0 or above 100 when mixing positive and negative weights.
          </div>

          <div className="rounded-3xl border-4 p-6 mb-8" style={{ background: COLORS.yellow, borderColor: COLORS.ink, boxShadow: `6px 6px 0 ${COLORS.ink}` }}>
            <div className="grid md:grid-cols-[1fr_140px_auto] gap-3 items-end">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: COLORS.ink }}>Criterion name</label>
                <input
                  type="text"
                  value={newCriterionName}
                  onChange={(e) => setNewCriterionName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') addCriterion(); }}
                  placeholder="e.g. Taste, Design, Value..."
                  className="w-full px-4 py-3 rounded-xl border-2 font-medium"
                  style={{ background: 'white', borderColor: COLORS.ink, color: COLORS.ink }}
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: COLORS.ink }}>Weight</label>
                <input
                  type="number"
                  step="0.1"
                  value={newCriterionWeight}
                  onChange={(e) => setNewCriterionWeight(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') addCriterion(); }}
                  placeholder="1.0"
                  className="w-full px-4 py-3 rounded-xl border-2 font-medium"
                  style={{ background: 'white', borderColor: COLORS.ink, color: COLORS.ink }}
                />
              </div>
              <button
                onClick={addCriterion}
                className="px-6 py-3 rounded-xl border-2 font-black uppercase tracking-wide flex items-center gap-2 hover:scale-105 transition-transform"
                style={{ background: COLORS.ink, color: COLORS.yellow, borderColor: COLORS.ink }}
              >
                <Plus size={18} /> Add
              </button>
            </div>
          </div>

          {criteria.length === 0 ? (
            <EmptyState text="No criteria yet. Add your first one above ↑" color={COLORS.pink} />
          ) : (
            <div className="space-y-3 mb-8">
              {criteria.map((c, idx) => {
                const totalAbsWeight = criteria.reduce((s, x) => s + Math.abs(x.weight), 0);
                const pct = totalAbsWeight > 0 ? (Math.abs(c.weight) / totalAbsWeight * 100).toFixed(1) : 0;
                const palette = [COLORS.pink, COLORS.mint, COLORS.blue, COLORS.coral, COLORS.lavender];
                const bg = palette[idx % palette.length];
                const isNegative = c.weight < 0;
                return (
                  <div key={c.id} className="rounded-2xl border-4 p-4 flex items-center gap-4 flex-wrap" style={{ background: bg, borderColor: COLORS.ink, boxShadow: `4px 4px 0 ${COLORS.ink}` }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-lg flex-shrink-0" style={{ background: COLORS.ink, color: 'white' }}>{idx + 1}</div>
                    <input
                      type="text"
                      value={c.name}
                      onChange={(e) => updateCriterion(c.id, 'name', e.target.value)}
                      className="flex-1 min-w-[120px] bg-transparent font-black text-lg border-b-2 border-transparent focus:border-black"
                      style={{ color: COLORS.ink }}
                    />
                    {isNegative && (
                      <span className="px-2 py-1 rounded-full text-xs font-black uppercase tracking-wider border-2" style={{ background: COLORS.ink, color: COLORS.coral, borderColor: COLORS.ink }}>
                        ↓ Subtracts
                      </span>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase opacity-70" style={{ color: COLORS.ink }}>Weight</span>
                      <input
                        type="number"
                        step="0.1"
                        value={c.weight}
                        onChange={(e) => updateCriterion(c.id, 'weight', e.target.value)}
                        className="w-20 px-2 py-1 rounded-lg border-2 font-bold text-center"
                        style={{ background: 'white', borderColor: COLORS.ink, color: COLORS.ink }}
                      />
                      <span className="text-sm font-bold opacity-60 w-14" style={{ color: COLORS.ink }}>{pct}%</span>
                    </div>
                    <button onClick={() => removeCriterion(c.id)} className="p-2 rounded-lg hover:bg-black hover:bg-opacity-10 transition-colors" style={{ color: COLORS.ink }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <NavBar
            onBack={() => setPage(1)}
            onNext={() => setPage(3)}
            nextDisabled={criteria.length === 0}
            nextLabel="Add items"
          />
        </div>
      )}

      {/* ============ PAGE 3: ITEMS ============ */}
      {page === 3 && (
        <div className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
          <Header step={2} title="Add things to rate" subtitle="Give each item a name and (optionally) an image." />

          <div className="rounded-3xl border-4 p-6 mb-8" style={{ background: COLORS.mint, borderColor: COLORS.ink, boxShadow: `6px 6px 0 ${COLORS.ink}` }}>
            <div className="grid md:grid-cols-[1fr_auto_auto] gap-3 items-end">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: COLORS.ink }}>Item name</label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') addItem(); }}
                  placeholder="e.g. Pizza place A, Movie X..."
                  className="w-full px-4 py-3 rounded-xl border-2 font-medium"
                  style={{ background: 'white', borderColor: COLORS.ink, color: COLORS.ink }}
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: COLORS.ink }}>Image</label>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-3 rounded-xl border-2 font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                  style={{ background: 'white', borderColor: COLORS.ink, color: COLORS.ink }}
                >
                  <Upload size={18} />
                  {newItemImage ? 'Change' : 'Upload'}
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>
              <button
                onClick={addItem}
                className="px-6 py-3 rounded-xl border-2 font-black uppercase tracking-wide flex items-center gap-2 hover:scale-105 transition-transform"
                style={{ background: COLORS.ink, color: COLORS.mint, borderColor: COLORS.ink }}
              >
                <Plus size={18} /> Add
              </button>
            </div>
            {newItemImage && (
              <div className="mt-4 flex items-center gap-3">
                <img src={newItemImage} alt="preview" className="w-16 h-16 rounded-lg object-cover border-2" style={{ borderColor: COLORS.ink }} />
                <span className="text-sm font-medium" style={{ color: COLORS.ink }}>Image ready to attach</span>
              </div>
            )}
          </div>

          {items.length === 0 ? (
            <EmptyState text="No items yet. Add your first one above ↑" color={COLORS.blue} />
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {items.map((item, idx) => (
                <div key={item.id} className="rounded-2xl border-4 p-4 relative transform hover:-rotate-1 transition-transform" style={{ background: 'white', borderColor: COLORS.ink, boxShadow: `4px 4px 0 ${COLORS.ink}` }}>
                  <div className="flex justify-between items-center mb-3 gap-2">
                    <span className="text-xs font-black px-2 py-1 rounded-full flex-shrink-0" style={{ background: COLORS.yellow, color: COLORS.ink }}>#{idx + 1}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-lg hover:bg-red-100 transition-colors flex-shrink-0"
                      style={{ color: COLORS.ink }}
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-32 rounded-lg object-cover border-2 mb-3" style={{ borderColor: COLORS.ink }} />
                  ) : (
                    <div className="w-full h-32 rounded-lg border-2 border-dashed flex items-center justify-center mb-3" style={{ borderColor: COLORS.ink, color: COLORS.ink, opacity: 0.4 }}>
                      No image
                    </div>
                  )}
                  <h3 className="font-black text-lg break-words" style={{ color: COLORS.ink }}>{item.name}</h3>
                </div>
              ))}
            </div>
          )}

          <NavBar
            onBack={() => setPage(2)}
            onNext={() => { setCurrentItemIndex(0); setPage(4); }}
            nextDisabled={items.length === 0}
            nextLabel="Start rating!"
            backLabel="Edit criteria"
          />
        </div>
      )}

      {/* ============ PAGE 4: RATING ============ */}
      {page === 4 && items[currentItemIndex] && (() => {
        const item = items[currentItemIndex];
        const itemRatings = ratings[item.id] || {};
        const score = calculateScore(item.id);
        const fullyRated = isItemFullyRated(item.id);

        return (
          <div className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
            <Header step={3} title="Rate the items" subtitle={`Item ${currentItemIndex + 1} of ${items.length}`} />

            {/* Progress dots */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {items.map((it, idx) => {
                const rated = isItemFullyRated(it.id);
                const isCurrent = idx === currentItemIndex;
                const itemRatingsForDot = ratings[it.id] || {};
                const ratedCount = criteria.filter(c => itemRatingsForDot[c.id] !== undefined).length;
                const status = rated ? 'Complete' : ratedCount > 0 ? `${ratedCount}/${criteria.length} rated` : 'Not started';
                const statusColor = rated ? COLORS.mint : ratedCount > 0 ? COLORS.yellow : COLORS.coral;
                return (
                  <div key={it.id} className="relative group">
                    <button
                      onClick={() => setCurrentItemIndex(idx)}
                      className="block"
                    >
                      <div
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-sm transition-all ${isCurrent ? 'scale-125' : 'hover:scale-110'}`}
                        style={{
                          background: rated ? COLORS.mint : isCurrent ? COLORS.yellow : 'white',
                          borderColor: COLORS.ink,
                          color: COLORS.ink,
                          boxShadow: isCurrent ? `3px 3px 0 ${COLORS.ink}` : 'none',
                        }}
                      >
                        {idx + 1}
                      </div>
                    </button>
                    {/* Custom tooltip */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-20 whitespace-nowrap"
                      style={{ transformOrigin: 'bottom center' }}
                    >
                      <div
                        className="rounded-xl border-2 px-3 py-2 text-left"
                        style={{
                          background: COLORS.ink,
                          borderColor: COLORS.ink,
                          boxShadow: `3px 3px 0 ${COLORS.pink}`,
                          minWidth: '120px',
                          maxWidth: '220px',
                        }}
                      >
                        <div className="text-xs font-black uppercase tracking-widest mb-0.5" style={{ color: COLORS.yellow }}>
                          #{idx + 1}
                        </div>
                        <div className="font-black text-sm truncate" style={{ color: 'white' }}>
                          {it.name}
                        </div>
                        <div className="text-xs font-bold mt-1" style={{ color: statusColor }}>
                          {status}
                        </div>
                      </div>
                      {/* Little arrow pointing down */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 border-r-2 border-b-2"
                        style={{ background: COLORS.ink, borderColor: COLORS.ink }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid md:grid-cols-[300px_1fr] gap-6 mb-8">
              {/* Item card */}
              <div className="rounded-3xl border-4 p-5 h-fit md:sticky md:top-6" style={{ background: COLORS.lavender, borderColor: COLORS.ink, boxShadow: `6px 6px 0 ${COLORS.ink}` }}>
                <div className="text-xs font-black uppercase tracking-widest mb-2 opacity-70" style={{ color: COLORS.ink }}>Item #{currentItemIndex + 1}</div>
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full aspect-square rounded-2xl object-cover border-4 mb-3" style={{ borderColor: COLORS.ink }} />
                ) : (
                  <div className="w-full aspect-square rounded-2xl border-4 border-dashed flex items-center justify-center mb-3" style={{ borderColor: COLORS.ink, color: COLORS.ink, opacity: 0.5 }}>
                    No image
                  </div>
                )}
                <h2 className="text-2xl font-black mb-4 break-words" style={{ color: COLORS.ink }}>{item.name}</h2>

                <div className="rounded-2xl border-4 p-4 text-center" style={{ background: COLORS.ink, borderColor: COLORS.ink }}>
                  <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: COLORS.yellow }}>Total Score</div>
                  <div className="text-5xl font-black tabular-nums" style={{ color: fullyRated ? COLORS.mint : COLORS.yellow, fontFamily: 'Georgia, serif' }}>
                    <AnimatedNumber value={score} />
                  </div>
                  <div className="text-xs font-bold mt-1" style={{ color: 'white', opacity: 0.6 }}>/ 100</div>
                  {fullyRated && (
                    <div className="mt-2 flex items-center justify-center gap-1 text-xs font-black" style={{ color: COLORS.mint }}>
                      <Sparkles size={14} /> COMPLETE
                    </div>
                  )}
                </div>
              </div>

              {/* Criteria stars */}
              <div className="space-y-3">
                {criteria.map((c, idx) => {
                  const palette = [COLORS.pink, COLORS.mint, COLORS.blue, COLORS.coral, COLORS.lavender, COLORS.yellow];
                  const bg = palette[idx % palette.length];
                  const stars = itemRatings[c.id] || 0;
                  return (
                    <div key={c.id} className="rounded-2xl border-4 p-4 flex flex-wrap items-center gap-4 justify-between" style={{ background: bg, borderColor: COLORS.ink, boxShadow: `4px 4px 0 ${COLORS.ink}` }}>
                      <div className="flex-1 min-w-0">
                        <div className="font-black text-lg break-words" style={{ color: COLORS.ink }}>{c.name}</div>
                        <div className="text-xs font-bold opacity-70" style={{ color: COLORS.ink }}>Weight: {c.weight}</div>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(n => (
                          <button
                            key={n}
                            onClick={() => setStarRating(item.id, c.id, n)}
                            className="transition-all hover:scale-125 active:scale-95"
                            style={{ color: COLORS.ink }}
                            title={`${n} star${n > 1 ? 's' : ''}`}
                          >
                            <Star
                              size={32}
                              fill={n <= stars ? COLORS.ink : 'transparent'}
                              strokeWidth={2.5}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-between items-center">
              <button
                onClick={() => {
                  if (cameFromResults) { setPage(5); setCameFromResults(false); }
                  else if (currentItemIndex > 0) setCurrentItemIndex(currentItemIndex - 1);
                  else setPage(3);
                }}
                className="px-6 py-3 rounded-2xl border-4 font-black uppercase tracking-wide flex items-center gap-2 hover:scale-105 transition-transform"
                style={{ background: 'white', color: COLORS.ink, borderColor: COLORS.ink, boxShadow: `4px 4px 0 ${COLORS.ink}` }}
              >
                <ArrowLeft size={18} />
                {cameFromResults ? 'Back to results' : currentItemIndex > 0 ? 'Previous' : 'Items'}
              </button>

              {currentItemIndex < items.length - 1 ? (
                <button
                  onClick={() => setCurrentItemIndex(currentItemIndex + 1)}
                  className="px-8 py-3 rounded-2xl border-4 font-black uppercase tracking-wide flex items-center gap-2 hover:scale-105 transition-transform"
                  style={{ background: COLORS.ink, color: COLORS.yellow, borderColor: COLORS.ink, boxShadow: `4px 4px 0 ${COLORS.pink}` }}
                >
                  Next item <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  onClick={() => setPage(5)}
                  disabled={!allItemsRated}
                  className="px-8 py-3 rounded-2xl border-4 font-black uppercase tracking-wide flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ background: COLORS.pink, color: 'white', borderColor: COLORS.ink, boxShadow: `4px 4px 0 ${COLORS.ink}` }}
                >
                  <Trophy size={18} /> See results
                </button>
              )}
            </div>

            {!allItemsRated && currentItemIndex === items.length - 1 && (
              <p className="text-center mt-4 text-sm font-bold" style={{ color: COLORS.coral }}>
                Rate every criterion on every item to unlock results.
              </p>
            )}
          </div>
        );
      })()}

      {/* ============ PAGE 5: RESULTS ============ */}
      {page === 5 && (
        <div className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block mb-3 px-4 py-2 rounded-full" style={{ background: COLORS.ink, color: COLORS.yellow }}>
              <span className="text-xs font-black tracking-widest uppercase">★ The Results Are In ★</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black italic" style={{ color: COLORS.pink, fontFamily: 'Georgia, serif', textShadow: `3px 3px 0 ${COLORS.ink}` }}>
              The Rankings
            </h1>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <FilterButton active={resultFilter === 'all'} onClick={() => setResultFilter('all')} color={COLORS.yellow} icon={<Sparkles size={16} />} label="All items" />
            <FilterButton active={resultFilter === 'best3'} onClick={() => setResultFilter('best3')} color={COLORS.mint} icon={<Trophy size={16} />} label="Best 3" />
            <FilterButton active={resultFilter === 'worst3'} onClick={() => setResultFilter('worst3')} color={COLORS.coral} icon={<TrendingDown size={16} />} label="Worst 3" />
            {resultFilter === 'all' && (
              <>
                <div className="w-px bg-black opacity-20 mx-2" />
                <FilterButton active={resultOrder === 'desc'} onClick={() => setResultOrder('desc')} color={COLORS.blue} icon={<TrendingDown size={16} />} label="High → Low" textColor="white" />
                <FilterButton active={resultOrder === 'asc'} onClick={() => setResultOrder('asc')} color={COLORS.lavender} icon={<TrendingUp size={16} />} label="Low → High" />
              </>
            )}
          </div>

          <div className="space-y-4 mb-10">
            {sortedResults.map((item, idx) => {
              const palette = [COLORS.yellow, COLORS.mint, COLORS.pink, COLORS.lavender, COLORS.coral, COLORS.blue];
              const bg = palette[idx % palette.length];
              const isPodium = (resultFilter === 'best3' || (resultFilter === 'all' && resultOrder === 'desc')) && idx < 3;
              return (
                <div
                  key={item.id}
                  className="rounded-3xl border-4 p-5 flex items-center gap-5 transform hover:scale-[1.01] transition-transform flex-wrap"
                  style={{
                    background: bg,
                    borderColor: COLORS.ink,
                    boxShadow: `6px 6px 0 ${COLORS.ink}`,
                    animation: `slideIn 0.4s ease-out ${idx * 80}ms both`,
                  }}
                >
                  <div className="flex-shrink-0 w-16 text-center">
                    {isPodium ? (
                      <div className="text-5xl">{medals[idx]}</div>
                    ) : (
                      <div className="text-4xl font-black" style={{ color: COLORS.ink, fontFamily: 'Georgia, serif' }}>#{idx + 1}</div>
                    )}
                  </div>
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover border-4 flex-shrink-0" style={{ borderColor: COLORS.ink }} />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl border-4 border-dashed flex items-center justify-center flex-shrink-0" style={{ borderColor: COLORS.ink, opacity: 0.4 }}>
                      <span className="text-xs font-bold" style={{ color: COLORS.ink }}>no img</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-[180px]">
                    <h3 className="text-xl md:text-2xl font-black break-words" style={{ color: COLORS.ink }}>{item.name}</h3>
                    <div className="mt-2 h-3 rounded-full border-2 overflow-hidden" style={{ background: 'rgba(0,0,0,0.1)', borderColor: COLORS.ink }}>
                      <div
                        className="h-full"
                        style={{
                          width: `${Math.max(0, Math.min(100, item.score))}%`,
                          background: item.score < 0 ? COLORS.coral : COLORS.ink,
                          animation: `growBar 1s ease-out ${idx * 80}ms both`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-4xl md:text-5xl font-black tabular-nums" style={{ color: COLORS.ink, fontFamily: 'Georgia, serif' }}>
                      {item.score.toFixed(1)}
                    </div>
                    <div className="text-xs font-black uppercase tracking-widest opacity-60" style={{ color: COLORS.ink }}>/ 100</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => { setCurrentItemIndex(0); setCameFromResults(true); setPage(4); }}
              className="px-6 py-3 rounded-2xl border-4 font-black uppercase tracking-wide flex items-center gap-2 hover:scale-105 transition-transform"
              style={{ background: 'white', color: COLORS.ink, borderColor: COLORS.ink, boxShadow: `4px 4px 0 ${COLORS.ink}` }}
            >
              <Edit3 size={18} /> Edit ratings
            </button>
            <button
              onClick={handleExport}
              className="px-6 py-3 rounded-2xl border-4 font-black uppercase tracking-wide flex items-center gap-2 hover:scale-105 transition-transform"
              style={{ background: COLORS.blue, color: 'white', borderColor: COLORS.ink, boxShadow: `4px 4px 0 ${COLORS.ink}` }}
            >
              <Download size={18} /> Export session
            </button>
            <button
              onClick={() => {
                if (confirm('Start over? This will erase all criteria, items, and ratings.')) {
                  setCriteria([]); setItems([]); setRatings({}); setCurrentItemIndex(0); setPage(1);
                }
              }}
              className="px-6 py-3 rounded-2xl border-4 font-black uppercase tracking-wide flex items-center gap-2 hover:scale-105 transition-transform"
              style={{ background: COLORS.coral, color: 'white', borderColor: COLORS.ink, boxShadow: `4px 4px 0 ${COLORS.ink}` }}
            >
              <RotateCcw size={18} /> Start over
            </button>
          </div>
        </div>
      )}

      {/* ============ FOOTER ============ */}
      <Footer />

      {/* ============ CROPPER MODAL ============ */}
      {cropperSrc && cropperImg && (() => {
        const area = getCropDisplaySize();
        const base = getBaseImageSize();
        const displayedW = base.w * cropZoom;
        const displayedH = base.h * cropZoom;
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(26, 26, 46, 0.85)' }}
            onMouseMove={onCropMouseMove}
            onMouseUp={onCropMouseUp}
            onMouseLeave={onCropMouseUp}
          >
            <div
              className="rounded-3xl border-4 p-6 max-w-md w-full"
              style={{ background: COLORS.bg, borderColor: COLORS.ink, boxShadow: `8px 8px 0 ${COLORS.pink}` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: COLORS.ink, opacity: 0.6 }}>Adjust your image</div>
                  <h2 className="text-2xl font-black italic" style={{ color: COLORS.ink, fontFamily: 'Georgia, serif' }}>Position & zoom</h2>
                </div>
                <button
                  onClick={cancelCrop}
                  className="p-2 rounded-xl border-2 hover:bg-black hover:bg-opacity-10"
                  style={{ borderColor: COLORS.ink, color: COLORS.ink }}
                  title="Cancel"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Crop area */}
              <div className="flex justify-center mb-4">
                <div
                  ref={cropAreaRef}
                  className="relative overflow-hidden rounded-2xl border-4 select-none"
                  style={{
                    width: area,
                    height: area,
                    borderColor: COLORS.ink,
                    background: COLORS.ink,
                    cursor: dragRef.current.dragging ? 'grabbing' : 'grab',
                    touchAction: 'none',
                  }}
                  onMouseDown={onCropMouseDown}
                  onTouchStart={onCropTouchStart}
                  onTouchMove={onCropTouchMove}
                  onTouchEnd={onCropTouchEnd}
                  onWheel={onCropWheel}
                >
                  <img
                    src={cropperSrc}
                    alt="crop preview"
                    draggable={false}
                    style={{
                      position: 'absolute',
                      width: displayedW,
                      height: displayedH,
                      maxWidth: 'none',
                      maxHeight: 'none',
                      left: area / 2 + cropOffset.x - displayedW / 2,
                      top: area / 2 + cropOffset.y - displayedH / 2,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    }}
                  />
                  {/* Decorative drag hint */}
                  <div className="absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-black flex items-center gap-1 pointer-events-none" style={{ background: COLORS.yellow, color: COLORS.ink }}>
                    <Move size={12} /> Drag to move
                  </div>
                </div>
              </div>

              {/* Zoom slider */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black uppercase tracking-widest" style={{ color: COLORS.ink }}>Zoom</label>
                  <span className="text-xs font-bold opacity-60" style={{ color: COLORS.ink }}>{cropZoom.toFixed(1)}×</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.05"
                  value={cropZoom}
                  onChange={onZoomSlider}
                  className="w-full"
                  style={{ accentColor: COLORS.pink }}
                />
                <p className="text-xs mt-2 opacity-60" style={{ color: COLORS.ink }}>
                  Tip: scroll inside the image to zoom too
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={cancelCrop}
                  className="flex-1 px-4 py-3 rounded-2xl border-4 font-black uppercase tracking-wide flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                  style={{ background: 'white', color: COLORS.ink, borderColor: COLORS.ink, boxShadow: `4px 4px 0 ${COLORS.ink}` }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmCrop}
                  className="flex-1 px-4 py-3 rounded-2xl border-4 font-black uppercase tracking-wide flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                  style={{ background: COLORS.ink, color: COLORS.mint, borderColor: COLORS.ink, boxShadow: `4px 4px 0 ${COLORS.pink}` }}
                >
                  <Check size={18} /> Use this
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}