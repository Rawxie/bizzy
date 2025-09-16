interface ViabilityBadgeProps {
  status: 'VIABLE' | 'MODERATE_RISK' | 'HIGH_RISK';
}

export function ViabilityBadge({ status }: ViabilityBadgeProps) {
  const variants = {
    VIABLE: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      label: 'VIABLE'
    },
    MODERATE_RISK: {
      bg: 'bg-amber-50',
      text: 'text-amber-700', 
      border: 'border-amber-200',
      label: 'MODERATE RISK'
    },
    HIGH_RISK: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      label: 'HIGH RISK'
    }
  };

  const variant = variants[status];

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full border ${variant.bg} ${variant.text} ${variant.border}`}>
      <div className={`w-2 h-2 rounded-full mr-2 ${variant.text === 'text-emerald-700' ? 'bg-emerald-500' : variant.text === 'text-amber-700' ? 'bg-amber-500' : 'bg-red-500'}`} />
      <span className="text-sm font-medium">{variant.label}</span>
    </div>
  );
}