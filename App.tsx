import React, { useState } from 'react';
import { UserData, GeneratedPlan } from './types';
import { generatePlan } from './services/geminiService';
import Header from './components/Header';
import UserInputForm from './components/UserInputForm';
import PlanDisplay from './components/PlanDisplay';
import Loader from './components/Loader';

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
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <UserInputForm onSubmit={handleGeneratePlan} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-8">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 min-h-[400px] flex flex-col justify-center items-center transition-all duration-500">
              {isLoading && <Loader />}
              {error && (
                <div className="text-center text-red-400">
                  <h3 className="text-xl font-bold mb-2">Oops! Something went wrong.</h3>
                  <p>{error}</p>
                </div>
              )}
              {plan && currentUserData && <PlanDisplay plan={plan} userData={currentUserData} />}
              {!isLoading && !error && !plan && (
                 <div className="text-center text-gray-400">
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome to Your AI Fitness Planner</h2>
                    <p>Fill out the form to generate your personalized workout and diet plan.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Powered by Gemini AI. Plans are for informational purposes only. Consult a professional before starting any new fitness regimen.</p>
      </footer>
    </div>
  );
};

export default App;