import { useState } from 'react';
import { X, Sparkles, Loader2, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Idea {
  id: number;
  idea: string;
}

interface IdeaGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIdeaSaved: () => void;
}

export default function IdeaGeneratorModal({ isOpen, onClose, onIdeaSaved }: IdeaGeneratorModalProps) {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState<number | null>(null);
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [showToast, setShowToast] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    setError('');
    setIdeas([]);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setError('Please log in to generate ideas');
        return;
      }

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-ideas`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword: topic.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate ideas');
      }

      const data = await response.json();

      if (data.ideas && Array.isArray(data.ideas)) {
        setIdeas(data.ideas);
      } else {
        setError('No ideas generated. Please try again.');
      }
    } catch (err) {
      console.error('Error generating ideas:', err);
      setError('Failed to generate ideas. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveIdea = async (idea: Idea) => {
    setSavingId(idea.id);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError('Please log in to save ideas');
        return;
      }

      const { error: insertError } = await supabase
        .from('ideas')
        .insert({
          user_id: user.id,
          topic: topic.trim(),
          idea_text: idea.idea,
        });

      if (insertError) {
        throw insertError;
      }

      setSavedIds(prev => new Set(prev).add(idea.id));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      onIdeaSaved();
    } catch (err) {
      console.error('Error saving idea:', err);
      setError('Failed to save idea. Please try again.');
    } finally {
      setSavingId(null);
    }
  };

  const handleClose = () => {
    setTopic('');
    setIdeas([]);
    setError('');
    setSavedIds(new Set());
    setShowToast(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-[#A4D8C8]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A4D8C8] to-[#B4C7E7] flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#1A1A1A]">Generate Content Ideas</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-[#545454] hover:text-[#1A1A1A] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="mb-6">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic, niche, or keyword…"
              className="w-full px-4 py-3 border-2 border-[#A4D8C8]/30 rounded-xl focus:outline-none focus:border-[#A4D8C8] transition-colors text-[#1A1A1A]"
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <button
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating}
              className="w-full mt-4 py-3 bg-gradient-to-r from-[#A4D8C8] to-[#B4C7E7] text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Ideas
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          {ideas.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">
                Generated Ideas ({ideas.length})
              </h3>
              {ideas.map((idea) => (
                <div
                  key={idea.id}
                  className="p-4 bg-[#F6F9F8] rounded-xl border border-[#A4D8C8]/20 hover:border-[#A4D8C8]/40 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-[#1A1A1A] mb-2">{idea.idea}</p>
                      <span className="inline-block px-3 py-1 bg-[#A4D8C8]/20 text-[#1A1A1A] text-xs font-semibold rounded-full">
                        {topic}
                      </span>
                    </div>
                    <button
                      onClick={() => handleSaveIdea(idea)}
                      disabled={savingId === idea.id || savedIds.has(idea.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                        savedIds.has(idea.id)
                          ? 'bg-[#A4D8C8] text-white cursor-not-allowed'
                          : 'border-2 border-[#A4D8C8] text-[#A4D8C8] hover:bg-[#A4D8C8]/10'
                      } disabled:opacity-50`}
                    >
                      {savingId === idea.id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : savedIds.has(idea.id) ? (
                        <>
                          <Save size={16} />
                          Saved
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          Save
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isGenerating && ideas.length === 0 && topic && (
            <div className="text-center py-12 text-[#545454]">
              <Sparkles size={48} className="mx-auto mb-4 text-[#A4D8C8]" />
              <p>Enter a topic and click Generate Ideas to get started!</p>
            </div>
          )}
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-8 right-8 bg-[#A4D8C8] text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in-up z-50">
          <p className="font-semibold">Idea saved!</p>
        </div>
      )}
    </div>
  );
}
