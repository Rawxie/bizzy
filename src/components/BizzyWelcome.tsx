import { MessageSquare, TrendingUp, Users, Target } from 'lucide-react';

interface BizzyWelcomeProps {
  avatarSrc: string;
}

export function BizzyWelcome({ avatarSrc }: BizzyWelcomeProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12">
      <div className="max-w-lg text-center space-y-6">
        {/* Avatar */}
        <div className="flex justify-center">
          <img 
            src={avatarSrc} 
            alt="Bizzy" 
            className="w-24 h-24 rounded-2xl object-cover shadow-lg"
          />
        </div>

        {/* Introduction */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-800">
            Meet Bizzy
          </h2>
          <p className="text-lg text-slate-600">
            Your Premium Business Development Executive
          </p>
        </div>

        {/* Description */}
        <div className="space-y-4 text-slate-600">
          <p>
            I'm here to provide strategic guidance for Indian startup founders looking to scale their businesses. 
            With deep expertise in market expansion, funding strategies, and operational excellence, I offer 
            data-driven insights tailored to your unique challenges.
          </p>
        </div>

        {/* Expertise Areas */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-slate-200">
            <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-cyan-600" />
            </div>
            <span className="text-sm font-medium text-slate-700">Growth Strategy</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-slate-200">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-slate-700">Market Entry</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-slate-200">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-slate-700">Team Building</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-slate-200">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-slate-700">Funding Advice</span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 p-4 bg-gradient-to-r from-slate-50 to-cyan-50 rounded-xl border border-slate-200">
          <p className="text-sm text-slate-600">
            Start by sharing your current business challenge or goal. I'll provide strategic insights 
            with actionable recommendations backed by industry data.
          </p>
        </div>

        {/* Example starter prompts */}
        <div className="space-y-2 mt-6">
          <p className="text-sm font-medium text-slate-700 mb-3">Example prompts to get started:</p>
          <div className="space-y-2">
            <div className="text-sm text-slate-500 bg-white p-3 rounded-lg border border-slate-100">
              "We're planning to expand to Southeast Asia. What should we consider?"
            </div>
            <div className="text-sm text-slate-500 bg-white p-3 rounded-lg border border-slate-100">
              "Our customer acquisition costs are increasing. How can we optimize?"
            </div>
            <div className="text-sm text-slate-500 bg-white p-3 rounded-lg border border-slate-100">
              "We need to raise Series A funding. What's our best strategy?"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}