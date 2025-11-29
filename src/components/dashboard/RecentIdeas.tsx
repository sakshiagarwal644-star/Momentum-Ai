import { useState, useEffect } from 'react';
import { Lightbulb, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Idea {
  id: string;
  keyword: string;
  idea_text: string;
  created_at: string;
}

export default function RecentIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchIdeas = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching ideas:', error);
        return;
      }

      setIdeas(data || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const handleDelete = async (ideaId: string) => {
    try {
      const { error } = await supabase
        .from('ideas')
        .delete()
        .eq('id', ideaId);

      if (error) {
        console.error('Error deleting idea:', error);
        return;
      }

      setIdeas(prevIdeas => prevIdeas.filter(idea => idea.id !== ideaId));
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-pastel border border-[#A4D8C8]/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb size={24} className="text-[#A4D8C8]" />
          <h3 className="text-xl font-extrabold text-[#1A1A1A]">Recent Ideas</h3>
        </div>
        <div className="text-center py-8 text-[#545454]">Loading...</div>
      </div>
    );
  }

  if (ideas.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-pastel border border-[#A4D8C8]/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb size={24} className="text-[#A4D8C8]" />
          <h3 className="text-xl font-extrabold text-[#1A1A1A]">Recent Ideas</h3>
        </div>
        <div className="text-center py-8 text-[#545454]">
          <Lightbulb size={48} className="mx-auto mb-4 text-[#A4D8C8]/30" />
          <p>No ideas saved yet. Generate your first idea!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-pastel border border-[#A4D8C8]/20 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb size={24} className="text-[#A4D8C8]" />
        <h3 className="text-xl font-extrabold text-[#1A1A1A]">Recent Ideas</h3>
      </div>

      <div className="space-y-4">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="p-4 bg-[#F6F9F8] rounded-xl border border-[#A4D8C8]/20 hover:border-[#A4D8C8]/40 transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-[#1A1A1A] mb-2 text-sm leading-relaxed">{idea.idea_text}</p>
                <div className="flex items-center gap-3">
                  <span className="inline-block px-3 py-1 bg-[#A4D8C8]/20 text-[#1A1A1A] text-xs font-semibold rounded-full">
                    {idea.keyword}
                  </span>
                  <span className="text-xs text-[#545454]">
                    {formatDate(idea.created_at)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(idea.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-[#545454] hover:text-red-500 p-2"
                title="Delete idea"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
