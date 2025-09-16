interface MatrixRow {
  factor: string;
  rating: number;
  notes: string;
}

interface ViabilityMatrixProps {
  data: MatrixRow[];
}

export function ViabilityMatrix({ data }: ViabilityMatrixProps) {
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-emerald-600 bg-emerald-50';
    if (rating >= 3) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 my-4">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Viability Assessment Matrix</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-2 text-sm font-medium text-slate-600 w-24">Factor</th>
              <th className="text-center py-3 px-2 text-sm font-medium text-slate-600 w-20">Rating</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-slate-600">Assessment Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b border-slate-100 last:border-b-0">
                <td className="py-4 px-2 text-sm font-medium text-slate-700">{row.factor}</td>
                <td className="py-4 px-2 text-center">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${getRatingColor(row.rating)}`}>
                    {row.rating}
                  </span>
                </td>
                <td className="py-4 px-2 text-sm text-slate-600 leading-relaxed">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}