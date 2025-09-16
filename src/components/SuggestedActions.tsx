interface SuggestedActionsProps {
  actions: string[];
  onActionClick: (action: string) => void;
}

export function SuggestedActions({ actions, onActionClick }: SuggestedActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => onActionClick(action)}
          className="inline-flex items-center px-3 py-2 text-sm bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-full border border-slate-200 transition-colors duration-200"
        >
          {action}
        </button>
      ))}
    </div>
  );
}