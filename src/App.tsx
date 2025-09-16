import { useState, useRef } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { BizzyWelcome } from './components/BizzyWelcome';
import bizzyAvatar from 'figma:asset/255083aeba273b9bdfd86ebe02d1fa8aa624342c.png';

interface Message {
  id: string;
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
}

const initialMessages: Message[] = [];

export default function App() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const userIdRef = useRef(Math.random().toString(36).substring(7));

  const callStackAI = async (userInput: string): Promise<string> => {
    try {
      const response = await fetch('https://api.stack-ai.com/inference/v0/run/82daafa8-4b94-431b-989d-d482e0c29e95/68c18eb3d25e1a930c9ece2a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 24aca533-c147-4a96-a309-b59bf6bb9c77'
        },
        body: JSON.stringify({
          user_id: userIdRef.current,
          "in-0": userInput
        })
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }

      const data = await response.json();
      return data.outputs?.['out-0'] || data.response || 'I apologize, but I\'m having trouble processing your request right now. Please try again.';
    } catch (error) {
      console.error('Stack AI API Error:', error);
      return 'I\'m experiencing some technical difficulties. Please try again in a moment.';
    }
  };

  const parseResponseForComponents = (response: string) => {
    const components: Message['components'] = {};

    // Extract viability assessment if present
    if (response.toLowerCase().includes('viable') || response.toLowerCase().includes('risk assessment')) {
      if (response.toLowerCase().includes('high risk')) {
        components.viabilityBadge = 'HIGH_RISK';
      } else if (response.toLowerCase().includes('moderate risk')) {
        components.viabilityBadge = 'MODERATE_RISK';
      } else if (response.toLowerCase().includes('viable')) {
        components.viabilityBadge = 'VIABLE';
      }
    }

    // Generate suggested actions based on response content
    const suggestedActions = [];
    if (response.toLowerCase().includes('roadmap') || response.toLowerCase().includes('phases')) {
      suggestedActions.push('Show me the detailed roadmap');
    }
    if (response.toLowerCase().includes('budget') || response.toLowerCase().includes('cost')) {
      suggestedActions.push('What\'s the budget breakdown?');
    }
    if (response.toLowerCase().includes('market') || response.toLowerCase().includes('expansion')) {
      suggestedActions.push('Tell me about market risks');
    }
    if (response.toLowerCase().includes('regulatory') || response.toLowerCase().includes('legal')) {
      suggestedActions.push('What are the regulatory requirements?');
    }
    if (suggestedActions.length === 0) {
      suggestedActions.push('Tell me more about this', 'What are the next steps?', 'How can we mitigate risks?');
    }

    components.suggestedActions = suggestedActions.slice(0, 3);

    return components;
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      isUser: true,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await callStackAI(content);
      const components = parseResponseForComponents(aiResponse);

      const bizzyResponse: Message = {
        id: (Date.now() + 1).toString(),
        isUser: false,
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        components
      };

      setMessages(prev => [...prev, bizzyResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        isUser: false,
        content: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = () => {
    // Simulate file upload
    console.log('File upload clicked');
  };

  const handleActionClick = (action: string) => {
    handleSendMessage(action);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={bizzyAvatar} 
              alt="Bizzy" 
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div>
              <h1 className="font-semibold text-slate-800">Bizzy</h1>
              <div className="flex items-center text-sm text-slate-500">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                Business Development Executive
              </div>
            </div>
          </div>
          <div className="text-sm text-slate-400">
            Confidential Advisory Session
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <BizzyWelcome avatarSrc={bizzyAvatar} />
        ) : (
          <div className="px-6 py-6 space-y-1">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                isUser={message.isUser}
                content={message.content}
                timestamp={message.timestamp}
                components={message.components}
                onActionClick={handleActionClick}
              />
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start mb-6">
                <div className="max-w-3xl">
                  <div className="flex items-center mb-2">
                    <img 
                      src={bizzyAvatar} 
                      alt="Bizzy" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-slate-600 ml-2">
                      Bizzy
                      <span className="ml-2 text-xs text-emerald-600">● Thinking...</span>
                    </span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-sm text-slate-500">Analyzing your request...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex-shrink-0">
        <ChatInput
          onSendMessage={handleSendMessage}
          onFileUpload={handleFileUpload}
          placeholder="What's on your mind?"
          disabled={isLoading}
        />
      </div>
    </div>
  );
}