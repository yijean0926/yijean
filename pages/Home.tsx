
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Controls from '../components/Controls';
import AnimatedText from '../components/AnimatedText';
import { AnimationMode } from '../types';

interface HomeProps {
  inputText: string;
  setInputText: (text: string) => void;
}

const Home: React.FC<HomeProps> = ({ inputText, setInputText }) => {
  const navigate = useNavigate();
  // Local state for animation mode is fine to reset on navigation, 
  // but input text is now controlled by parent
  const [animationMode, setAnimationMode] = useState<AnimationMode>(AnimationMode.STATIC);

  // Default texts if input is empty
  const getDefaultText = (index: number) => {
    if (inputText) return inputText;
    switch (index) {
      case 0: return "SCOPE";
      case 1: return "Fictional";
      case 2: return "Indicate Mono";
      case 3: return "Handwritten"; 
      case 4: return "System";
      default: return "";
    }
  };

  const handleNavigate = (family: string, name: string) => {
    navigate('/detail', { state: { family, name } });
  };

  // Font Configuration
  // 1. Scope (Blocky/Technical) -> Chakra Petch
  // 2. Fictional (Geometric Sans) -> DM Sans
  // 3. Indicate Mono (Code) -> Space Mono
  // 4. Handwritten (Artistic) -> Zeyada
  // 5. System (Clean) -> Inter
  
  return (
    <div className="min-h-screen w-full relative flex flex-col overflow-hidden">
      <Controls currentMode={animationMode} setMode={setAnimationMode} />

      {/* Main Display Area */}
      <main className="flex-1 w-full flex flex-col items-center justify-center pt-[100px] pb-32 px-4 overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-6xl flex flex-col items-center gap-4 md:gap-12 text-center">
          
          {/* Row 1: Scope */}
          <div className="w-full py-4">
            <AnimatedText 
              text={getDefaultText(0)} 
              mode={animationMode} 
              fontFamily="hyeseong-Regular"
              className="text-6xl md:text-[8rem] lg:text-[10rem] font-bold leading-none text-black break-words"
              onClick={() => handleNavigate('hyeseong-Regular', 'SCOPE MEDIUM')}
            />
          </div>

          {/* Row 2: Fictional */}
          <div className="w-full py-4">
            <AnimatedText 
              text={getDefaultText(1)} 
              mode={animationMode} 
              fontFamily="A_Pretzel-Regular"
              className="text-5xl md:text-[7rem] lg:text-[9rem] font-medium leading-none text-black break-words"
              onClick={() => handleNavigate('A_Pretzel-Regular', 'FICTIONAL')}
            />
          </div>

          {/* Row 3: Indicate Mono */}
          <div className="w-full py-4">
            <AnimatedText 
              text={getDefaultText(2)} 
              mode={animationMode} 
              fontFamily="A_Jajaknamu-Regular"
              className="text-4xl md:text-[5rem] lg:text-[7rem] font-normal leading-none text-black break-words"
              onClick={() => handleNavigate('A_Jajaknamu-Regular', 'INDICATE MONO')}
            />
          </div>

           {/* Row 4: Handwritten */}
           <div className="w-full py-4">
            <AnimatedText 
              text={getDefaultText(3)} 
              mode={animationMode} 
              fontFamily="AtheneBold-Regular"
              className="text-5xl md:text-[6rem] lg:text-[8rem] font-normal leading-none text-black break-words"
              onClick={() => handleNavigate('AtheneBold-Regular', 'ATHENE BOLD')}
            />
          </div>

           {/* Row 5: System */}
           <div className="w-full py-4">
            <AnimatedText 
              text={getDefaultText(4)} 
              mode={animationMode} 
              fontFamily="Dolin-Regular"
              className="text-5xl md:text-[6rem] lg:text-[8rem] font-bold leading-none text-black break-words"
              onClick={() => handleNavigate('Dolin-Regular', 'DOLIN')}
            />
          </div>

        </div>
      </main>

      {/* Bottom Input Area */}
      <div className="fixed bottom-0 left-0 w-full bg-[#F5F5F0]/90 backdrop-blur-md border-t border-gray-200 z-40 p-6">
        <div className="max-w-4xl mx-auto w-full relative">
           <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type something here..."
            className="w-full bg-transparent text-xl md:text-3xl font-['Space_Mono'] border-b-2 border-black/20 focus:border-black outline-none py-2 px-0 placeholder-gray-300 transition-colors"
            autoFocus
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-['Inter'] pointer-events-none">
            TRY IT YOURSELF
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
