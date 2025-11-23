import { useState } from 'react';
import { Upload, Video, Clock, CheckCircle, X } from 'lucide-react';

interface Clip {
  id: number;
  name: string;
  status: 'Processing' | 'Ready to Edit' | 'Done';
  uploadedAt: string;
}

export default function UploadClips() {
  const [clips, setClips] = useState<Clip[]>([
    {
      id: 1,
      name: 'morning-routine-take1.mp4',
      status: 'Done',
      uploadedAt: '2 hours ago',
    },
    {
      id: 2,
      name: 'client-testimonial.mov',
      status: 'Ready to Edit',
      uploadedAt: '1 day ago',
    },
    {
      id: 3,
      name: 'workout-demo.mp4',
      status: 'Processing',
      uploadedAt: '2 days ago',
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing':
        return <Clock size={16} className="text-[#FFCFAE]" />;
      case 'Ready to Edit':
        return <Video size={16} className="text-[#B4C7E7]" />;
      case 'Done':
        return <CheckCircle size={16} className="text-[#A4D8C8]" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'bg-[#FFCFAE]/20 text-[#FFCFAE]';
      case 'Ready to Edit':
        return 'bg-[#B4C7E7]/20 text-[#B4C7E7]';
      case 'Done':
        return 'bg-[#A4D8C8]/20 text-[#A4D8C8]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const removeClip = (id: number) => {
    setClips(clips.filter((clip) => clip.id !== id));
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-extrabold text-[#1A1A1A] mb-4">Upload Raw Clips</h2>

      <div className="bg-white rounded-2xl shadow-pastel border border-[#A4D8C8]/20 p-8 mb-6">
        <div className="border-2 border-dashed border-[#A4D8C8]/40 rounded-xl p-12 text-center hover:border-[#A4D8C8] hover:bg-[#A4D8C8]/5 transition-all cursor-pointer">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#A4D8C8] to-[#B4C7E7] flex items-center justify-center mx-auto mb-4">
            <Upload size={32} className="text-white" strokeWidth={2} />
          </div>
          <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">
            Drag & Drop Your Clips Here
          </h3>
          <p className="text-[#545454] mb-4">or click to browse files</p>
          <button className="px-6 py-3 bg-[#A4D8C8] text-[#1A1A1A] font-semibold rounded-xl hover:bg-[#8fc7b5] transition-all">
            Upload Clips
          </button>
        </div>
      </div>

      {clips.length > 0 && (
        <div className="bg-white rounded-2xl shadow-pastel border border-[#A4D8C8]/10">
          <div className="p-6 border-b border-[#A4D8C8]/10">
            <h3 className="font-bold text-[#1A1A1A]">Recently Uploaded</h3>
          </div>
          <div className="divide-y divide-[#A4D8C8]/10">
            {clips.map((clip) => (
              <div
                key={clip.id}
                className="p-4 flex items-center justify-between hover:bg-[#F6F9F8] transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#B4C7E7] to-[#F7E6FF] flex items-center justify-center flex-shrink-0">
                    <Video size={24} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#1A1A1A] truncate">{clip.name}</h4>
                    <p className="text-sm text-[#545454]">{clip.uploadedAt}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(
                      clip.status
                    )}`}
                  >
                    {getStatusIcon(clip.status)}
                    <span>{clip.status}</span>
                  </div>
                  <button
                    onClick={() => removeClip(clip.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X size={16} className="text-[#545454]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
