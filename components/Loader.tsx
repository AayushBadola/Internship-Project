import React, { useState, useEffect } from 'react';

// A collection of fun facts about fitness and nutrition.
const funFacts = [
    "An apple can give you more energy than a cup of coffee.",
    "Broccoli contains more protein per calorie than steak.",
    "Bananas are technically berries, while strawberries aren't.",
    "Honey never spoils. Edible honey has been found in 3,000-year-old Egyptian tombs.",
    "The most stolen food in the world is cheese.",
    "Carrots were originally purple, not orange.",
    "Avocados are a fruit, specifically a single-seeded berry.",
    "Regular exercise boosts your immune system, helping you fight off colds.",
    "Strength training increases your metabolism, burning more calories at rest.",
    "Pistachios are technically the fruit of the pistachio tree.",
    "Laughing for 15 minutes can burn up to 40 calories.",
    "Dark chocolate is rich in antioxidants and can improve heart health.",
    "Staying hydrated can significantly improve your physical performance.",
    "A good night's sleep is as important as exercise and diet for your health.",
];

// A collection of loading messages to show progress.
const loadingSteps = [
    { text: "Analyzing your fitness profile..." },
    { text: "Calibrating goals with your data..." },
    { text: "Designing your weekly workout split..." },
    { text: "Selecting the most effective exercises..." },
    { text: "Crafting a balanced dietary plan..." },
    { text: "Calculating daily calories and macros..." },
    { text: "Putting the final touches on your plan..." },
];

const Spinner: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        className="animate-spin" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const Loader: React.FC = () => {
    // State for the current fun fact.
    const [currentFact, setCurrentFact] = useState(
        () => funFacts[Math.floor(Math.random() * funFacts.length)]
    );
    // State for the current loading step message.
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    useEffect(() => {
        // Interval for cycling fun facts.
        const factIntervalId = setInterval(() => {
            setCurrentFact(prevFact => {
                let newFact;
                // Ensure the new fact is different from the current one.
                do {
                    newFact = funFacts[Math.floor(Math.random() * funFacts.length)];
                } while (newFact === prevFact);
                return newFact;
            });
        }, 3500); // Change fact every 3.5 seconds

        // Interval for cycling loading step messages.
        const stepIntervalId = setInterval(() => {
            setCurrentStepIndex(prevIndex => (prevIndex + 1) % loadingSteps.length);
        }, 2500); // Change step every 2.5 seconds

        // Cleanup function to clear intervals when the component unmounts.
        return () => {
            clearInterval(factIntervalId);
            clearInterval(stepIntervalId);
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount.

  const currentStep = loadingSteps[currentStepIndex];

  return (
    <div className="flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 text-emerald-400 mb-2">
            <Spinner />
        </div>
        
        {/* Animated loading step message */}
        <p className="mt-4 text-lg font-semibold text-white animate-fade-in-subtle" key={currentStep.text}>
            {currentStep.text}
        </p>
        <p className="text-slate-400">This may take a moment.</p>

        {/* Fun Fact Section */}
        <div className="mt-8 pt-4 border-t border-slate-700 w-full max-w-sm">
            <p className="text-sm font-semibold text-emerald-300 mb-2">Fun Fact</p>
            {/* Using the fact as a key forces React to re-mount the component on change, which re-triggers the animation */}
            <p className="text-slate-400 text-sm animate-fade-in-subtle" key={currentFact}>
              {currentFact}
            </p>
        </div>
    </div>
  );
};

export default Loader;