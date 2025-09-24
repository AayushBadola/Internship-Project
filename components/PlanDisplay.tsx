import React, { useState } from 'react';
import { GeneratedPlan, WorkoutDay, DietaryDay, Exercise, UserData } from '../types';
import { downloadPlanAsPDF } from '../utils/pdfGenerator';
import DumbbellIcon from './icons/DumbbellIcon';
import PlateIcon from './icons/PlateIcon';

interface Props {
  plan: GeneratedPlan;
  userData: UserData;
}

const ExerciseCard: React.FC<{ exercise: Exercise }> = ({ exercise }) => (
    <div className="bg-slate-800 p-4 rounded-lg">
        <h4 className="font-bold text-emerald-300">{exercise.name}</h4>
        <div className="grid grid-cols-3 gap-2 text-sm mt-2 text-slate-300">
            <span><span className="font-semibold text-slate-400">Sets:</span> {exercise.sets}</span>
            <span><span className="font-semibold text-slate-400">Reps:</span> {exercise.reps}</span>
            <span><span className="font-semibold text-slate-400">Rest:</span> {exercise.rest}</span>
        </div>
        <p className="text-xs text-slate-400 mt-2">{exercise.description}</p>
    </div>
);


const WorkoutDayCard: React.FC<{ day: WorkoutDay }> = ({ day }) => (
  <div className="bg-slate-700 p-4 rounded-xl">
    <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">{day.day}</h3>
        <span className="text-sm font-medium bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full">{day.focus}</span>
    </div>
    {day.exercises.length > 0 ? (
        <div className="space-y-3">
            {day.exercises.map((ex, index) => <ExerciseCard key={index} exercise={ex} />)}
        </div>
    ) : (
        <p className="text-slate-400 italic">Rest Day</p>
    )}
  </div>
);

const DietaryDayCard: React.FC<{ day: DietaryDay }> = ({ day }) => (
    <div className="bg-slate-700 p-4 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-2">{day.day}</h3>
        <div className="mb-4 bg-slate-800 p-2 rounded-lg flex flex-wrap justify-around text-center text-sm">
            <div className="p-1"><span className="font-bold text-emerald-300">{day.totalCalories}</span><span className="text-slate-400"> kcal</span></div>
            <div className="p-1"><span className="font-bold text-emerald-300">{day.macronutrients.protein}</span><span className="text-slate-400"> Protein</span></div>
            <div className="p-1"><span className="font-bold text-emerald-300">{day.macronutrients.carbs}</span><span className="text-slate-400"> Carbs</span></div>
            <div className="p-1"><span className="font-bold text-emerald-300">{day.macronutrients.fat}</span><span className="text-slate-400"> Fat</span></div>
        </div>
        <div className="space-y-2 text-sm">
            {day.meals.map((meal, index) => (
                <div key={index} className="bg-slate-800 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-emerald-300">{meal.meal}</p>
                        <p className="text-xs text-slate-400">{meal.calories} kcal</p>
                    </div>
                    <p className="text-slate-300 mt-1">{meal.description}</p>
                </div>
            ))}
        </div>
    </div>
);

const PlanDisplay: React.FC<Props> = ({ plan, userData }) => {
  const [activeTab, setActiveTab] = useState<'workout' | 'diet'>('workout');
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
        await downloadPlanAsPDF(plan, userData);
    } catch (error) {
        console.error("Failed to generate PDF", error);
    } finally {
        setIsDownloading(false);
    }
  };

  return (
    <div className="w-full animate-fade-in">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
             <h2 className="text-3xl font-bold text-white">Your Custom Plan</h2>
             <button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-emerald-500 transition-all duration-300 ease-in-out disabled:bg-emerald-800 disabled:cursor-wait"
            >
               {isDownloading ? 'Downloading...' : 'Download PDF'}
            </button>
        </div>
        
        <div className="flex space-x-1 bg-slate-700 p-1 rounded-lg mb-6">
            <button onClick={() => setActiveTab('workout')} className={`w-full flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'workout' ? 'bg-emerald-600 text-white shadow' : 'text-slate-300 hover:bg-slate-600'}`}>
                <DumbbellIcon className="w-5 h-5 mr-2" /> Workout Plan
            </button>
            <button onClick={() => setActiveTab('diet')} className={`w-full flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'diet' ? 'bg-emerald-600 text-white shadow' : 'text-slate-300 hover:bg-slate-600'}`}>
                <PlateIcon className="w-5 h-5 mr-2" /> Dietary Plan
            </button>
        </div>
      
        <div id="plan-to-download">
            {activeTab === 'workout' && (
                <div className="space-y-4">
                    {plan.workoutPlan.map((day, index) => <WorkoutDayCard key={index} day={day} />)}
                </div>
            )}
            {activeTab === 'diet' && (
                 <div className="space-y-4">
                    {plan.dietaryPlan.map((day, index) => <DietaryDayCard key={index} day={day} />)}
                </div>
            )}
        </div>
    </div>
  );
};

export default PlanDisplay;