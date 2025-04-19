import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div
      className="fixed top-0 left-0 z-1000 flex h-full w-full flex-col items-center justify-center bg-black
        delay-2500 duration-500 ease-in-out animate-[fadeOut] fill-mode-forwards"
    >
      <img
        src="/logo-txt.png"
        alt="KingKebap Logo"
        // className="h-auto w-128 duration-500 animate-in slide-in-from-bottom-full zoom-in fill-mode-forwards"
        // className="h-auto w-128 animate-[bounce-mid] duration-1500 ease-in-out"
        className="w-128 h-auto animate-[bounce-mid_1.5s_ease-in-out]"
      />
      <p className="text-3xl text-white opacity-0 delay-1500 duration-500 ease-in-out animate-out fade-out-100 fill-mode-forwards">
        Willkommen
      </p>
    </div>
  );
};

export default SplashScreen;
