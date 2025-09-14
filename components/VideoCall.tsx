
import React, { useEffect, useRef, useState } from 'react';
import { Doctor, View } from '../types';
import { Button } from './common/Button';

interface VideoCallProps {
  doctor: Doctor;
  setView: (view: View) => void;
}

const ControlButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string; }> = ({ onClick, children, className = '' }) => (
    <button onClick={onClick} className={`p-3 rounded-full transition-colors ${className}`}>
        {children}
    </button>
);

export const VideoCall: React.FC<VideoCallProps> = ({ doctor, setView }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
      } catch (error) {
        console.error("Error accessing media devices.", error);
        alert("Could not access your camera and microphone. Please check your browser permissions.");
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (streamRef.current) {
        streamRef.current.getAudioTracks().forEach(track => track.enabled = !track.enabled);
    }
  };

  const toggleCamera = () => {
    setIsCameraOff(!isCameraOff);
    if (streamRef.current) {
        streamRef.current.getVideoTracks().forEach(track => track.enabled = !track.enabled);
    }
  };

  const handleEndCall = () => {
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
    }
    setView('dashboard');
  };

  return (
    <div className="relative w-full h-screen bg-slate-900 text-white flex flex-col">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        {/* Doctor's Video */}
        <div className="relative w-full h-full bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
          <img src={doctor.imageUrl} alt={doctor.name} className="w-32 h-32 rounded-full object-cover"/>
          <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-lg">
            <p>{doctor.name}</p>
          </div>
        </div>

        {/* User's Video */}
        <div className="relative w-full h-full bg-slate-800 rounded-lg overflow-hidden">
          <video ref={userVideoRef} autoPlay playsInline className={`w-full h-full object-cover ${isCameraOff ? 'hidden' : ''}`}></video>
          {isCameraOff && <div className="w-full h-full flex items-center justify-center text-slate-400">Camera is off</div>}
          <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-lg">
            <p>You</p>
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center">
        <div className="bg-slate-800/70 backdrop-blur-sm rounded-full p-2 flex items-center space-x-4">
          <ControlButton onClick={toggleMute} className={isMuted ? 'bg-red-600' : 'bg-slate-600 hover:bg-slate-500'}>
            {isMuted ? 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l-2.25 2.25M19.5 12l2.25-2.25M12 18.75a6 6 0 0 0 6-6v-1.5a6 6 0 0 0-6-6v1.5a6 6 0 0 0-6 6v1.5a6 6 0 0 0 6 6Z" /></svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5a6 6 0 0 0-6-6v1.5a6 6 0 0 0-6 6v1.5a6 6 0 0 0 6 6Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" /></svg>
            }
          </ControlButton>
          <ControlButton onClick={toggleCamera} className={isCameraOff ? 'bg-red-600' : 'bg-slate-600 hover:bg-slate-500'}>
            {isCameraOff ? 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25v-9a2.25 2.25 0 012.25-2.25h15A2.25 2.25 0 0121.75 7.5v9a2.25 2.25 0 01-2.25 2.25h-5.25" /></svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" /></svg>
            }
          </ControlButton>
          <Button onClick={handleEndCall} variant="danger" className="rounded-full !px-6 !py-3">End Call</Button>
        </div>
      </div>
    </div>
  );
};
