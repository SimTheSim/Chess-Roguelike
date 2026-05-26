import React, { useState, useMemo } from 'react';
import { ALL_ARTIFACTS } from './components/artifactRegistry';
import type { ArtifactDefinition, ArtifactCombo, ArtifactRarity, ArtifactFamily } from './components/artifactRegistry';

const RARITY_COLORS: Record<string, string> = {
  common: 'border-slate-500 bg-slate-900/60',
  rare: 'border-blue-500 bg-blue-950/60',
  epic: 'border-purple-500 bg-purple-950/60',
};

const FAMILY_OPTIONS: ArtifactFamily[] = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king', 'general'];
const RARITY_OPTIONS: ArtifactRarity[] = ['common', 'rare', 'epic'];

function ArtifactIcon({ svg, viewBox, size = 40 }: { svg: string; viewBox: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default function ArtifactDevUI() {
  const [artifacts, setArtifacts] = useState<ArtifactDefinition[]>([...ALL_ARTIFACTS]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const editingArtifact = useMemo(() => 
    artifacts.find(a => a.id === editingId) || null
  , [artifacts, editingId]);

  const filteredArtifacts = useMemo(() => {
    return artifacts.filter(a => 
      a.name.toLowerCase().includes(search.toLowerCase()) || 
      a.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [artifacts, search]);

  const handleSave = (updated: ArtifactDefinition) => {
    setArtifacts(prev => {
      const exists = prev.find(a => a.id === updated.id);
      if (exists && editingId !== updated.id) {
        alert("ID already exists!");
        return prev;
      }
      if (editingId && prev.find(a => a.id === editingId)) {
        return prev.map(a => a.id === editingId ? updated : a);
      }
      return [...prev, updated];
    });
    setEditingId(updated.id);
  };

  const createNew = () => {
    const newArt: ArtifactDefinition = {
      id: `new-artifact-${Date.now()}`,
      name: 'New Artifact',
      description: 'Description here...',
      rarity: 'common',
      pieceFamily: 'general',
      iconSvg: '<circle cx="12" cy="12" r="8" stroke="white"/>',
      iconViewBox: '0 0 24 24',
      pieceOverlaySvg: null,
      combos: []
    };
    setArtifacts([...artifacts, newArt]);
    setEditingId(newArt.id);
  };

  const deleteArtifact = (id: string) => {
    if (confirm('Delete this artifact?')) {
      setArtifacts(artifacts.filter(a => a.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  const exportData = () => {
    const data = JSON.stringify(artifacts, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'artifacts_export.json';
    a.click();
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
      <aside className="w-80 border-r border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800 space-y-3">
          <h1 className="font-bold text-xl text-white">Artifact Editor</h1>
          <input 
            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
            <button onClick={createNew} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2 rounded">
              + NEW
            </button>
            <button onClick={exportData} className="flex-1 bg-slate-800 hover:bg-slate-700 text-xs font-bold py-2 rounded">
              EXPORT
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {filteredArtifacts.map(a => (
            <div 
              key={a.id}
              onClick={() => setEditingId(a.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${editingId === a.id ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-900/40 hover:bg-slate-900'}`}
            >
              <div className="flex gap-3">
                <div className="w-8 h-8 shrink-0 bg-black/40 rounded flex items-center justify-center">
                  <ArtifactIcon svg={a.iconSvg} viewBox={a.iconViewBox} size={24} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white truncate">{a.name}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">{a.pieceFamily} · {a.rarity}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-slate-950 p-8">
        {editingArtifact ? (
          <EditorForm 
            artifact={editingArtifact} 
            allArtifacts={artifacts}
            onSave={handleSave} 
            onDelete={() => deleteArtifact(editingArtifact.id)}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500">
            Select an artifact to edit or create a new one
          </div>
        )}
      </main>
    </div>
  );
}

function EditorForm({ 
  artifact, 
  allArtifacts,
  onSave, 
  onDelete 
}: { 
  artifact: ArtifactDefinition; 
  allArtifacts: ArtifactDefinition[];
  onSave: (a: ArtifactDefinition) => void;
  onDelete: () => void;
}) {
  const [form, setForm] = useState<ArtifactDefinition>(artifact);

  React.useEffect(() => {
    setForm(artifact);
  }, [artifact]);

  const update = (updates: Partial<ArtifactDefinition>) => {
    const next = { ...form, ...updates };
    setForm(next);
    onSave(next);
  };

  const addCombo = () => {
    update({
      combos: [...form.combos, { withId: '', bonusDescription: '', bonusTag: '' }]
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">{form.name || 'Unnamed Artifact'}</h2>
          <code className="text-xs text-indigo-400">{form.id}</code>
        </div>
        <button onClick={onDelete} className="text-rose-500 hover:text-rose-400 text-xs font-bold uppercase tracking-wider">
          Delete Artifact
        </button>
      </header>

      <div className="grid grid-cols-2 gap-8">
        <section className="space-y-4">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Basic Identity</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Unique ID">
                <input 
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-sm"
                  value={form.id} 
                  onChange={e => update({ id: e.target.value })} 
                />
              </Field>
              <Field label="Display Name">
                <input 
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-sm"
                  value={form.name} 
                  onChange={e => update({ name: e.target.value })} 
                />
              </Field>
            </div>
            <Field label="Description">
              <textarea 
                className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-sm h-20 resize-none"
                value={form.description} 
                onChange={e => update({ description: e.target.value })} 
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Piece Affinity">
                <select 
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-sm"
                  value={form.pieceFamily} 
                  onChange={e => update({ pieceFamily: e.target.value as ArtifactFamily })}
                >
                  {FAMILY_OPTIONS.map(f => <option key={f} value={f}>{f.toUpperCase()}</option>)}
                </select>
              </Field>
              <Field label="Rarity">
                <select 
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-sm"
                  value={form.rarity} 
                  onChange={e => update({ rarity: e.target.value as ArtifactRarity })}
                >
                  {RARITY_OPTIONS.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}
                </select>
              </Field>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Visual Assets</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Field label="Icon ViewBox">
                  <input 
                    className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-sm"
                    value={form.iconViewBox} 
                    onChange={e => update({ iconViewBox: e.target.value })} 
                  />
                </Field>
              </div>
              <div className="w-20 h-20 bg-black rounded border border-slate-800 flex items-center justify-center shrink-0 mt-6">
                <ArtifactIcon svg={form.iconSvg} viewBox={form.iconViewBox} size={48} />
              </div>
            </div>
            <Field label="Boon Icon (SVG Content)">
              <textarea 
                className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-[10px] font-mono h-24"
                value={form.iconSvg} 
                onChange={e => update({ iconSvg: e.target.value })} 
              />
            </Field>
            <Field label="Piece Overlay SVG (Optional)">
              <textarea 
                className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-[10px] font-mono h-24"
                value={form.pieceOverlaySvg || ''} 
                placeholder="Leave empty for no overlay..."
                onChange={e => update({ pieceOverlaySvg: e.target.value || null })} 
              />
            </Field>
          </div>
        </section>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Combinations</h3>
          <button onClick={addCombo} className="text-indigo-400 hover:text-indigo-300 text-xs font-bold">+ ADD COMBO</button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {form.combos.map((combo, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-lg flex gap-4">
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Combo With Artifact">
                    <select 
                      className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs"
                      value={combo.withId}
                      onChange={e => {
                        const combos = [...form.combos];
                        combos[idx] = { ...combo, withId: e.target.value };
                        update({ combos });
                      }}
                    >
                      <option value="">Select Artifact...</option>
                      {allArtifacts.filter(a => a.id !== form.id).map(a => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Bonus Tag">
                    <input 
                      className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs"
                      value={combo.bonusTag}
                      onChange={e => {
                        const combos = [...form.combos];
                        combos[idx] = { ...combo, bonusTag: e.target.value.toUpperCase() };
                        update({ combos });
                      }}
                    />
                  </Field>
                </div>
                <Field label="Bonus Description">
                  <textarea 
                    className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs h-12"
                    value={combo.bonusDescription}
                    onChange={e => {
                      const combos = [...form.combos];
                      combos[idx] = { ...combo, bonusDescription: e.target.value };
                      update({ combos });
                    }}
                  />
                </Field>
              </div>
              <button 
                onClick={() => update({ combos: form.combos.filter((_, i) => i !== idx) })}
                className="self-start text-slate-600 hover:text-rose-500 p-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-tight">{label}</label>
      {children}
    </div>
  );
}