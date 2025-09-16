import { ViabilityBadge } from './ViabilityBadge';
import { ViabilityMatrix } from './ViabilityMatrix';
import { RoadmapComponent } from './RoadmapComponent';
import { SuggestedActions } from './SuggestedActions';
import bizzyAvatar from 'figma:asset/255083aeba273b9bdfd86ebe02d1fa8aa624342c.png';

interface ChatMessageProps {
  isUser: boolean;
  content: string;
  timestamp: string;
  components?: {
    viabilityBadge?: 'VIABLE' | 'MODERATE_RISK' | 'HIGH_RISK';
    viabilityMatrix?: Array<{
      factor: string;
      rating: number;
      notes: string;
    }>;
    roadmap?: Array<{
      title: string;
      timeline: string;
      description: string;
      keyMilestones: string[];
    }>;
    suggestedActions?: string[];
  };
  onActionClick?: (action: string) => void;
}

export function ChatMessage({ 
  isUser, 
  content, 
  timestamp, 
  components,
  onActionClick 
}: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`max-w-3xl ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Avatar and Name */}
        <div className={`flex items-center mb-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <div className={`flex items-center ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            {isUser ? (
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-sm font-medium text-slate-600">
                Y
              </div>
            ) : (
              <img 
                src={bizzyAvatar} 
                alt="Bizzy" 
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <span className={`text-sm font-medium text-slate-600 ${isUser ? 'mr-2' : 'ml-2'}`}>
              {isUser ? 'You' : 'Bizzy'}
              {!isUser && <span className="ml-2 text-xs text-emerald-600">● Online</span>}
            </span>
          </div>
        </div>

        {/* Message Content */}
        <div className={`rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-slate-800 text-white' 
            : 'bg-white border border-slate-200 text-slate-800'
        }`}>
          <p className="leading-relaxed whitespace-pre-wrap">{content}</p>
          
          {/* Components */}
          {components?.viabilityBadge && (
            <div className="mt-3">
              <ViabilityBadge status={components.viabilityBadge} />
            </div>
          )}
        </div>

        {/* External Components */}
        {components?.viabilityMatrix && (
          <ViabilityMatrix data={components.viabilityMatrix} />
        )}
        
        {components?.roadmap && (
          <RoadmapComponent phases={components.roadmap} />
        )}

        {/* Suggested Actions */}
        {components?.suggestedActions && onActionClick && (
          <SuggestedActions 
            actions={components.suggestedActions}
            onActionClick={onActionClick}
          />
        )}

        {/* Timestamp */}
        <div className={`text-xs text-slate-400 mt-2 ${isUser ? 'text-right' : 'text-left'}`}>
          {timestamp}
        </div>
      </div>
    </div>
  );
}