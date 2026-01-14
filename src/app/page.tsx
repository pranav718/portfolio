'use client';

import Scene from '@/components/3d/Scene';
import AudioControls from '@/components/ui/AudioControls';
import HelpOverlay from '@/components/ui/HelpOverlay';
import LoadingScreen from '@/components/ui/LoadingScreen';
import MobileWarning from '@/components/ui/MobileWarning';
import { CAMERA } from '@/utils/constants';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';

export default function Home() {
  const [lampOn, setLampOn] = useState(false);
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [isMuted, setIsMuted] = useState(false);

  const [showHelp, setShowHelp] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const hasVisited = localStorage.getItem('portfolio-visited');
    if (hasVisited) {
      setShowHelp(false);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLampPull = () => {
    setLampOn(true);
    localStorage.setItem('portfolio-visited', 'true');
    setShowHelp(false);
  };

  const handleNotebookOpen = () => {
    setNotebookOpen(true);
  };

  const handleNotebookClose = () => {
    setNotebookOpen(false);
    setCurrentPage(0);
  };

  const handleMusicToggle = () => {
    setIsPlaying(!isPlaying);
  };

  if (isMobile) {
    return <MobileWarning />;
  }

  return (
    <main className="w-full h-screen bg-[#0a0a0a] canvas-container">
        
      <Canvas
        shadows
        camera={{
          position: CAMERA.initialPosition,
          fov: CAMERA.fov,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]} 
      >
        <Suspense fallback={null}>
          <Scene
            lampOn={lampOn}
            onLampPull={handleLampPull}
            notebookOpen={notebookOpen}
            onNotebookOpen={handleNotebookOpen}
            currentPage={currentPage}
            isPlaying={isPlaying}
            onMusicToggle={handleMusicToggle}
          />
        </Suspense>
      </Canvas>

      
      <LoadingScreen />

      
      {showHelp && !lampOn && (
        <HelpOverlay onDismiss={() => setShowHelp(false)} />
      )}

      
      {lampOn && notebookOpen && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 bg-black/60 backdrop-blur-md rounded-full px-6 py-3">
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="p-2 text-white/80 hover:text-white disabled:text-white/30 transition-colors"
          >
            ← Prev
          </button>
          <span className="text-white/70 text-sm min-w-[80px] text-center">
            {currentPage === 0 && 'About'}
            {currentPage === 1 && 'Projects'}
            {currentPage === 2 && 'Skills'}
            {currentPage === 3 && 'Contact'}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
            disabled={currentPage === 3}
            className="p-2 text-white/80 hover:text-white disabled:text-white/30 transition-colors"
          >
            Next →
          </button>
          <div className="w-px h-6 bg-white/20" />
          <button
            onClick={handleNotebookClose}
            className="px-3 py-1 text-sm text-white/60 hover:text-white transition-colors"
          >
            ✕ Close
          </button>
        </div>
      )}

      
      <AudioControls
        isPlaying={isPlaying}
        onToggle={handleMusicToggle}
        volume={volume}
        onVolumeChange={setVolume}
        isMuted={isMuted}
        onMuteToggle={() => setIsMuted(!isMuted)}
      />
    </main>
  );
}
