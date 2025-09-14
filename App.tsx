
import React, { useState } from 'react';
import { View, Doctor, User } from './types';
import { Dashboard } from './components/Dashboard';
import { DoctorsList } from './components/DoctorsList';
import { DoctorProfile } from './components/DoctorProfile';
import { ChatRoom } from './components/ChatRoom';
import { VideoCall } from './components/VideoCall';
import { SymptomChecker } from './components/SymptomChecker';
import { Header } from './components/Header';
import { Login } from './components/auth/Login';
import { doctors as mockDoctors } from './data/mockData';
import { UserProfile } from './components/UserProfile';
import { PastAppointments } from './components/PastAppointments';
import { Subscription } from './components/Subscription';
import { Pharmacy } from './components/Pharmacy';

const App: React.FC = () => {
  const [view, setView] = useState<View>('login');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(mockDoctors[0]);
  const [user, setUser] = useState<User | null>(null);

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setView('doctorProfile');
  };

  const loggedInUser: User = {
      id: 'user-123',
      name: 'Alex Doe',
      email: 'alex.doe@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?u=alexdoe',
      subscription: 'premium',
  };

  const renderContent = () => {
    if (!user) {
      return <Login onLogin={() => { 
          setUser(loggedInUser); 
          setView('dashboard'); 
        }} />;
    }

    switch (view) {
      case 'dashboard':
        return <Dashboard setView={setView} user={user} onSelectDoctor={handleSelectDoctor}/>;
      case 'doctors':
        return <DoctorsList doctors={mockDoctors} onSelectDoctor={handleSelectDoctor} />;
      case 'doctorProfile':
        if (selectedDoctor) {
          return <DoctorProfile doctor={selectedDoctor} setView={setView} />;
        }
        return <DoctorsList doctors={mockDoctors} onSelectDoctor={handleSelectDoctor} />; // Fallback
      case 'chat':
        if (selectedDoctor) {
          return <ChatRoom doctor={selectedDoctor} user={user} setView={setView} />;
        }
        return <Dashboard setView={setView} user={user} onSelectDoctor={handleSelectDoctor} />; // Fallback
      case 'videoCall':
        if (selectedDoctor) {
          return <VideoCall doctor={selectedDoctor} setView={setView} />;
        }
        return <Dashboard setView={setView} user={user} onSelectDoctor={handleSelectDoctor} />; // Fallback
      case 'symptomChecker':
        return <SymptomChecker setView={setView} />;
      case 'pastAppointments':
        return <PastAppointments setView={setView} onSelectDoctor={handleSelectDoctor}/>;
      case 'userProfile':
        return <UserProfile user={user} setView={setView} />;
       case 'subscription':
        return <Subscription setView={setView} />;
      case 'pharmacy':
        return <Pharmacy setView={setView} />;
      default:
        return <Dashboard setView={setView} user={user} onSelectDoctor={handleSelectDoctor}/>;
    }
  };

  if (!user) {
      return <Login onLogin={() => { setUser(loggedInUser); setView('dashboard'); }} />;
  }

  return (
    <div className="bg-slate-100 min-h-screen font-sans">
      <Header user={user} setView={setView} onLogout={() => { setUser(null); setView('login'); }} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
