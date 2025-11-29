import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Loader2, Save, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface GeneratedIdea {
  id: number;
  idea: string;
}

interface SavedIdea {
  id: string;
  topic: string;
  idea_text: string;
  created_at: string;
}

export default function Ideas() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([]);
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState<number | null>(null);
  const [savedIdsSet, setSavedIdsSet] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchSavedIdeas();
  }, []);

  const fetchSavedIdeas = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching ideas:', error);
        return;
      }

      setSavedIdeas(data || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    setError('');
    setGeneratedIdeas([]);
    setSavedIdsSet(new Set());

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setError('Please log in to generate ideas');
        navigate('/login');
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
        setGeneratedIdeas(data.ideas);
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

  const handleSaveIdea = async (idea: GeneratedIdea) => {
    setSavingId(idea.id);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError('Please log in to save ideas');
        navigate('/login');
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

      setSavedIdsSet(prev => new Set(prev).add(idea.id));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      await fetchSavedIdeas();
    } catch (err) {
      console.error('Error saving idea:', err);
      setError('Failed to save idea. Please try again.');
    } finally {
      setSavingId(null);
    }
  };

  const handleDeleteIdea = async (ideaId: string) => {
    try {
      const { error } = await supabase
        .from('ideas')
        .delete()
        .eq('id', ideaId);

      if (error) {
        console.error('Error deleting idea:', error);
        return;
      }

      setSavedIdeas(prevIdeas => prevIdeas.filter(idea => idea.id !== ideaId));
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F9F8]">
      <div className="bg-white border-b border-[#A4D8C8]/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-[#545454] hover:text-[#1A1A1A] transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A4D8C8] to-[#B4C7E7] flex items-center justify-center">
              <Sparkles size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-[#1A1A1A]">Content Ideas</h1>
              <p className="text-[#545454]">Generate AI-powered content ideas for your niche</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-pastel border border-[#A4D8C8]/20 p-8 mb-8">
          <h2 className="text-xl font-extrabold text-[#1A1A1A] mb-6">Generate New Ideas</h2>

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

          {generatedIdeas.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">
                Generated Ideas ({generatedIdeas.length})
              </h3>
              <div className="space-y-3">
                {generatedIdeas.map((idea) => (
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
                        disabled={savingId === idea.id || savedIdsSet.has(idea.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                          savedIdsSet.has(idea.id)
                            ? 'bg-[#A4D8C8] text-white cursor-not-allowed'
                            : 'border-2 border-[#A4D8C8] text-[#A4D8C8] hover:bg-[#A4D8C8]/10'
                        } disabled:opacity-50`}
                      >
                        {savingId === idea.id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : savedIdsSet.has(idea.id) ? (
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
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-pastel border border-[#A4D8C8]/20 p-8">
          <h2 className="text-xl font-extrabold text-[#1A1A1A] mb-6">
            My Saved Ideas ({savedIdeas.length})
          </h2>

          {isLoading ? (
            <div className="text-center py-12 text-[#545454]">
              <Loader2 size={48} className="mx-auto mb-4 text-[#A4D8C8] animate-spin" />
              <p>Loading ideas...</p>
            </div>
          ) : savedIdeas.length === 0 ? (
            <div className="text-center py-12 text-[#545454]">
              <Sparkles size={48} className="mx-auto mb-4 text-[#A4D8C8]/30" />
              <p>No ideas saved yet. Generate your first idea above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className="p-4 bg-[#F6F9F8] rounded-xl border border-[#A4D8C8]/20 hover:border-[#A4D8C8]/40 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-[#1A1A1A] mb-2 text-sm leading-relaxed">{idea.idea_text}</p>
                      <div className="flex items-center gap-3">
                        <span className="inline-block px-3 py-1 bg-[#A4D8C8]/20 text-[#1A1A1A] text-xs font-semibold rounded-full">
                          {idea.topic}
                        </span>
                        <span className="text-xs text-[#545454]">
                          {formatDate(idea.created_at)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteIdea(idea.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[#545454] hover:text-red-500 p-2"
                      title="Delete idea"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
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
