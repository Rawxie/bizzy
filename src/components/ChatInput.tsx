import { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, onFileUpload, placeholder = "What's on your mind?", disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-slate-200 bg-white px-6 py-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-end space-x-3">
          <button
            type="button"
            onClick={onFileUpload}
            disabled={disabled}
            className="flex-shrink-0 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={disabled ? "Bizzy is thinking..." : placeholder}
              rows={1}
              disabled={disabled}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-slate-400 text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                minHeight: '48px',
                maxHeight: '120px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className="flex-shrink-0 p-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}