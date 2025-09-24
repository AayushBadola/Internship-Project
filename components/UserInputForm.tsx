import React, { useState } from 'react';
import { UserData, FitnessLevel, Goal, Gender, WorkoutPreference, DietaryPreference } from '../types';

interface Props {
  onSubmit: (data: UserData) => void;
  isLoading: boolean;
}

const UserInputForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserData>({
    name: 'Alex Doe',
    age: 30,
    gender: Gender.Male,
    height: 180,
    weight: 75,
    fitnessLevel: FitnessLevel.Intermediate,
    goal: Goal.MuscleGain,
    workoutPreference: WorkoutPreference.Gym,
    daysPerWeek: 4,
    dietaryPreference: DietaryPreference.None,
    additionalInfo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'age' || name === 'height' || name === 'weight' || name === 'daysPerWeek') ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const inputBaseClasses = "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition duration-200";

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-emerald-400">Your Fitness Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={inputBaseClasses} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-1">Age</label>
              <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className={inputBaseClasses} required min="12" max="100"/>
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className={inputBaseClasses}>
                {Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-300 mb-1">Height (cm)</label>
              <input type="number" id="height" name="height" value={formData.height} onChange={handleChange} className={inputBaseClasses} required min="100" max="250" />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-1">Weight (kg)</label>
              <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} className={inputBaseClasses} required min="30" max="300" />
            </div>
        </div>

        <div>
          <label htmlFor="fitnessLevel" className="block text-sm font-medium text-gray-300 mb-1">Fitness Level</label>
          <select id="fitnessLevel" name="fitnessLevel" value={formData.fitnessLevel} onChange={handleChange} className={inputBaseClasses}>
            {Object.values(FitnessLevel).map(level => <option key={level} value={level}>{level}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="goal" className="block text-sm font-medium text-gray-300 mb-1">Primary Goal</label>
          <select id="goal" name="goal" value={formData.goal} onChange={handleChange} className={inputBaseClasses}>
            {Object.values(Goal).map(goal => <option key={goal} value={goal}>{goal}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="workoutPreference" className="block text-sm font-medium text-gray-300 mb-1">Workout Location</label>
          <select id="workoutPreference" name="workoutPreference" value={formData.workoutPreference} onChange={handleChange} className={inputBaseClasses}>
            {Object.values(WorkoutPreference).map(pref => <option key={pref} value={pref}>{pref}</option>)}
          </select>
        </div>
        
        <div>
          <label htmlFor="daysPerWeek" className="block text-sm font-medium text-gray-300 mb-1">Workout Days/Week: {formData.daysPerWeek}</label>
          <input type="range" id="daysPerWeek" name="daysPerWeek" value={formData.daysPerWeek} onChange={handleChange} min="1" max="7" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
        </div>

        <div>
          <label htmlFor="dietaryPreference" className="block text-sm font-medium text-gray-300 mb-1">Dietary Preference</label>
          <select id="dietaryPreference" name="dietaryPreference" value={formData.dietaryPreference} onChange={handleChange} className={inputBaseClasses}>
            {Object.values(DietaryPreference).map(diet => <option key={diet} value={diet}>{diet}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-300 mb-1">
            Additional Information (Optional)
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            className={`${inputBaseClasses} min-h-[100px] resize-y`}
            placeholder="e.g., allergies (peanuts, gluten), medical conditions (bad knee), food dislikes..."
          />
        </div>

        <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-emerald-500 transition-all duration-300 ease-in-out disabled:bg-emerald-800 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? 'Generating Your Plan...' : 'Generate Plan'}
        </button>
      </form>
    </div>
  );
};

export default UserInputForm;