interface RoadmapPhase {
  title: string;
  timeline: string;
  description: string;
  keyMilestones: string[];
}

interface RoadmapComponentProps {
  phases: RoadmapPhase[];
}

export function RoadmapComponent({ phases }: RoadmapComponentProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 my-4">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Strategic Roadmap</h3>
      
      <div className="space-y-8">
        {phases.map((phase, index) => (
          <div key={index} className="relative">
            {/* Timeline line */}
            {index < phases.length - 1 && (
              <div className="absolute left-4 top-12 w-px h-16 bg-slate-200" />
            )}
            
            <div className="flex items-start space-x-4">
              {/* Phase indicator */}
              <div className="flex-shrink-0 w-8 h-8 bg-slate-100 border-2 border-slate-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-slate-600">{index + 1}</span>
              </div>
              
              {/* Phase content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-semibold text-slate-800">{phase.title}</h4>
                  <span className="text-sm text-slate-500 bg-slate-50 px-2 py-1 rounded">{phase.timeline}</span>
                </div>
                
                <p className="text-sm text-slate-600 mb-3 leading-relaxed">{phase.description}</p>
                
                {phase.keyMilestones.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-2">Key Milestones:</p>
                    <ul className="space-y-1">
                      {phase.keyMilestones.map((milestone, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-start">
                          <span className="text-slate-400 mr-2">•</span>
                          {milestone}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}