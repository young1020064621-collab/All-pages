import React, { useState } from 'react';
import { X, Save, FileText, Mic, Send, ChevronDown, Bot } from 'lucide-react';

interface QAPopupProps {
  isVisible: boolean;
  onClose: () => void;
  question: string;
  answer: string;
  isAIMode?: boolean;
  isAIResult?: boolean;
  onSaveToHistory?: (question: string, answer: string) => void;
  onSaveNote?: (question: string, answer: string, note: string) => void;
  onAISubmit?: (client: string, deal: string, question: string) => void;
}

const QAPopup: React.FC<QAPopupProps> = ({
  isVisible,
  onClose,
  question,
  answer,
  isAIMode = false,
  isAIResult = false,
  onSaveToHistory,
  onSaveNote,
  onAISubmit
}) => {
  const [note, setNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedDeal, setSelectedDeal] = useState('');
  const [aiQuestion, setAiQuestion] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Mock data for clients and deals
  const clients = [
    { id: 'client1', name: 'Acme Corporation' },
    { id: 'client2', name: 'TechStart Inc.' },
    { id: 'client3', name: 'Global Solutions Ltd.' },
    { id: 'client4', name: 'Innovation Partners' }
  ];

  const dealsByClient: Record<string, Array<{ id: string; name: string }>> = {
    client1: [
      { id: 'deal1', name: 'Q1 Software License Deal' },
      { id: 'deal2', name: 'Enterprise Support Contract' }
    ],
    client2: [
      { id: 'deal3', name: 'Cloud Migration Project' },
      { id: 'deal4', name: 'Security Audit Services' }
    ],
    client3: [
      { id: 'deal5', name: 'Digital Transformation Initiative' },
      { id: 'deal6', name: 'Data Analytics Platform' }
    ],
    client4: [
      { id: 'deal7', name: 'AI Implementation Project' },
      { id: 'deal8', name: 'Process Automation Suite' }
    ]
  };

  const handleSaveToHistory = () => {
    if (onSaveToHistory) {
      onSaveToHistory(question, answer);
    }
    onClose();
  };

  const handleSaveNote = () => {
    if (onSaveNote && note.trim()) {
      onSaveNote(question, answer, note.trim());
    }
    setNote('');
    setShowNoteInput(false);
    onClose();
  };

  const handleAISubmit = () => {
    if (onAISubmit && selectedClient && selectedDeal && aiQuestion.trim()) {
      onAISubmit(selectedClient, selectedDeal, aiQuestion.trim());
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real implementation, this would start/stop voice recognition
    console.log('Voice input toggled:', !isListening);
  };

  const handleClose = () => {
    setNote('');
    setShowNoteInput(false);
    setSelectedClient('');
    setSelectedDeal('');
    setAiQuestion('');
    setIsListening(false);
    onClose();
  };

  const availableDeals = selectedClient ? dealsByClient[selectedClient] || [] : [];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[70]">
      <div className="w-[600px] bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={22} className="text-[#FF8E1C]" />
              <h3 className="text-lg font-semibold text-gray-900">
                {isAIMode ? 'Ask SAM' : isAIResult ? 'Ask SAM' : "Sam's Response"}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-all duration-200"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-100"></div>

        {/* Body */}
        <div className="px-6 py-6 flex-1 overflow-y-auto">
          <div className="space-y-6">
            {isAIMode ? (
              <>
                {/* Client Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Client
                  </label>
                  <div className="relative">
                    <select
                      value={selectedClient}
                      onChange={(e) => {
                        setSelectedClient(e.target.value);
                        setSelectedDeal(''); // Reset deal selection when client changes
                      }}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF8E1C]/20 focus:border-[#FF8E1C] transition-all duration-200 appearance-none bg-white"
                    >
                      <option value="">Choose a client...</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Deal Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Deal
                  </label>
                  <div className="relative">
                    <select
                      value={selectedDeal}
                      onChange={(e) => setSelectedDeal(e.target.value)}
                      disabled={!selectedClient}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF8E1C]/20 focus:border-[#FF8E1C] transition-all duration-200 appearance-none bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {selectedClient ? 'Choose a deal...' : 'Select a client first'}
                      </option>
                      {availableDeals.map((deal) => (
                        <option key={deal.id} value={deal.id}>
                          {deal.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Question Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Question or Instruction
                  </label>
                  <div className="relative">
                    <textarea
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      placeholder="Ask anything about the selected client and deal..."
                      className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF8E1C]/20 focus:border-[#FF8E1C] transition-all duration-200 resize-none"
                      rows={4}
                    />
                    <button
                      onClick={handleVoiceInput}
                      className={`absolute right-3 top-3 p-1.5 rounded-md transition-all duration-200 ${
                        isListening
                          ? 'text-red-500 bg-red-50 hover:bg-red-100'
                          : 'text-gray-400 hover:text-[#FF8E1C] hover:bg-gray-100'
                      }`}
                      title={isListening ? 'Stop recording' : 'Voice input'}
                    >
                      <Mic size={16} />
                    </button>
                  </div>
                  {isListening && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      Recording...
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Question */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <span className={`font-bold text-xs ${isAIResult ? 'text-[#FF8E1C]' : 'text-blue-600'}`}>Q</span>
                    </div>
                    Your Question
                  </h4>
                  <div className="p-4">
                    <p className="text-gray-800 text-sm border-b border-gray-100 rounded-lg p-2 leading-relaxed">{question}</p>
                  </div>
                </div>

                {/* Answer */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <span className={`font-bold text-xs ${isAIResult ? 'text-[#FF8E1C]' : 'text-green-600'}`}>A</span>
                    </div>
                    {isAIResult ? 'SAM Says' : "Sam's Answer"}
                  </h4>
                  <div className="p-4">
                    <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{answer}</p>
                  </div>
                </div>
              </>
            )}

            {/* Note Input */}
            {!isAIMode && !isAIResult && showNoteInput && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FileText size={16} className="text-[#605BFF]" />
                  Add Note
                </h4>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Write your notes here..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#605BFF]/20 focus:border-[#605BFF] transition-all duration-200 resize-none"
                  rows={4}
                  autoFocus
                />
              </div>
            )}
            
            {/* AI Result Note Input */}
            {isAIResult && showNoteInput && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FileText size={16} className="text-[#FF8E1C]" />
                  Add Note
                </h4>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Write your notes here..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF8E1C]/20 focus:border-[#FF8E1C] transition-all duration-200 resize-none"
                  rows={4}
                  autoFocus
                />
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-100"></div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white flex-shrink-0">
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              Close
            </button>
            
            {isAIMode ? (
              <button
                onClick={handleAISubmit}
                disabled={!selectedClient || !selectedDeal || !aiQuestion.trim()}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  selectedClient && selectedDeal && aiQuestion.trim()
                    ? 'text-[#FF8E1C]  bg-white border border-[#FF8E1C] hover:bg-[#FF8E1C] hover:text-white'
                    : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                }`}
              >
                <Send size={16} />
                Ask SAM
              </button>
            ) : (!showNoteInput && !isAIResult) ? (
              <>
                <button
                  onClick={() => setShowNoteInput(true)}
                  className="px-4 py-2 text-sm font-medium text-[#FF8E1C] bg-white border border-[#FF8E1C] hover:bg-[#FF8E1C] hover:text-white rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                  <FileText size={16} />
                  Add Note
                </button>
                <button
                  onClick={handleSaveToHistory}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#605BFF] hover:bg-[#4F46E5] rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                  <Save size={16} />
                  Save to History
                </button>
              </>
            ) : (!showNoteInput && isAIResult) ? (
              <>
                <button
                  onClick={() => setShowNoteInput(true)}
                  className="px-4 py-2 text-sm font-medium text-[#FF8E1C] bg-white border border-[#FF8E1C] hover:bg-[#FF8E1C] hover:text-white rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                  <FileText size={16} />
                  Add Note
                </button>
                <button
                  onClick={handleSaveToHistory}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#FF8E1C] hover:bg-[#E67E0C] rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                  <Save size={16} />
                  Save to History
                </button>
              </>
            ) : (
              <button
                onClick={handleSaveNote}
                disabled={!note.trim()}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  note.trim()
                    ? `text-white ${isAIResult ? 'bg-[#FF8E1C] hover:bg-[#E67E0C]' : 'bg-[#605BFF] hover:bg-[#4F46E5]'}`
                    : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                }`}
              >
                <Save size={16} />
                Save Note
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QAPopup;