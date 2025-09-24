import React, { useState } from 'react';
import { UserData, GeneratedPlan } from './types';
import { generatePlan } from './services/geminiService';
import Header from './components/Header';
import UserInputForm from './components/UserInputForm';
import PlanDisplay from './components/PlanDisplay';
import Loader from './components/Loader';
import DumbbellIcon from './components/icons/DumbbellIcon';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [currentUserData, setCurrentUserData] = useState<UserData | null>(null);

  const handleGeneratePlan = async (userData: UserData) => {
    setIsLoading(true);
    setError(null);
    setPlan(null);
    setCurrentUserData(userData);
    try {
      const generatedPlan = await generatePlan(userData);
      setPlan(generatedPlan);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1">
            <UserInputForm onSubmit={handleGeneratePlan} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 transition-all duration-500 h-full">
              {isLoading && <div className="flex justify-center items-center h-full min-h-[500px]"><Loader /></div>}
              {error && (
                <div className="text-left text-red-400">
                  <h3 className="text-xl font-bold mb-2">Oops! Something went wrong.</h3>
                  <p>{error}</p>
                </div>
              )}
              {plan && currentUserData && <PlanDisplay plan={plan} userData={currentUserData} />}
              {!isLoading && !error && !plan && (
                 <div className="text-left text-slate-400">
                    <DumbbellIcon className="w-16 h-16 text-emerald-400 mb-6" />
                    <h2 className="text-4xl font-bold text-white mb-4">Your Personalized Fitness Journey Starts Here</h2>
                    <p className="text-lg">Complete the profile on the left to let our AI craft a unique workout and diet plan tailored just for you.</p>
                    <p className="mt-6 text-sm text-slate-500">The more details you provide, the better your plan will be!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>Powered by Gemini AI. Plans are for informational purposes only. Consult a professional before starting any new fitness regimen.</p>
      </footer>
    </div>
  );
};

export default App;