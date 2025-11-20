import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import GPACalculator from './components/GPACalculator';
import AIChat from './components/AIChat';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.CALCULATOR);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-72 bg-psu-blue text-white flex-shrink-0 flex flex-col">
          <div className="p-6 flex flex-col items-center border-b border-white/10">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-xl">
               {/* Placeholder for Logo - simplified representation */}
               <span className="material-icons-round text-psu-blue text-4xl">engineering</span>
            </div>
            <h1 className="text-xl font-bold text-center leading-tight">Faculty of Engineering</h1>
            <p className="text-sm text-blue-200">Port Said University</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <button 
                onClick={() => setActiveTab(Tab.CALCULATOR)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === Tab.CALCULATOR ? 'bg-white/15 text-white font-semibold' : 'text-blue-200 hover:bg-white/5'}`}
            >
                <span className="material-icons-round">calculate</span> GPA Calculator
            </button>
            <button 
                onClick={() => setActiveTab(Tab.CHAT)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === Tab.CHAT ? 'bg-white/15 text-white font-semibold' : 'text-blue-200 hover:bg-white/5'}`}
            >
                <span className="material-icons-round">chat_bubble</span> AI Assistant
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
            <div className="max-w-5xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {activeTab === Tab.CALCULATOR && 'GPA Dashboard'}
                        {activeTab === Tab.CHAT && 'AI Tutor'}
                    </h1>
                    <p className="text-gray-500">
                         {activeTab === Tab.CALCULATOR && 'Manage your courses, grades, and academic progress.'}
                         {activeTab === Tab.CHAT && 'Ask questions about your curriculum or get study help.'}
                    </p>
                </header>

                {activeTab === Tab.CALCULATOR && <GPACalculator />}
                {activeTab === Tab.CHAT && <AIChat />}
            </div>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;