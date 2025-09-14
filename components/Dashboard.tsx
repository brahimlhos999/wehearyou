
import React from 'react';
import { Doctor, User, View } from '../types';
import { Button } from './common/Button';
import { Card } from './common/Card';
import { appointments, doctors } from '../data/mockData';

interface DashboardProps {
  user: User;
  setView: (view: View) => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, setView, onSelectDoctor }) => {
  const upcomingAppointment = appointments.find(a => a.status === 'Upcoming');

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">Welcome back, {user.name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-700">Symptom Checker</h2>
            <p className="text-slate-500 mt-2">Not feeling well? Get a quick analysis of your symptoms.</p>
          </div>
          <Button onClick={() => setView('symptomChecker')} className="mt-4">Check Symptoms</Button>
        </Card>

        <Card className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-700">Find a Doctor</h2>
            <p className="text-slate-500 mt-2">Browse specialists and book your next appointment.</p>
          </div>
          <Button onClick={() => setView('doctors')} variant="secondary" className="mt-4">Browse Doctors</Button>
        </Card>
        
        {upcomingAppointment && (
          <Card className="p-6 bg-teal-50">
            <h2 className="text-xl font-semibold text-slate-700">Upcoming Appointment</h2>
            <div className="mt-4 text-slate-600">
              <p><strong>Dr. {upcomingAppointment.doctor.name}</strong></p>
              <p>{upcomingAppointment.doctor.specialty}</p>
              <p>{upcomingAppointment.date} at {upcomingAppointment.time}</p>
              <p>{upcomingAppointment.type}</p>
            </div>
             <Button onClick={() => {
                onSelectDoctor(upcomingAppointment.doctor);
                setView(upcomingAppointment.type === 'Chat' ? 'chat' : 'videoCall')
             }} className="mt-4 w-full">Join Now</Button>
          </Card>
        )}
      </div>

       <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Your Doctors</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.slice(0, 3).map(doc => (
                 <Card key={doc.id} className="p-4 flex items-center space-x-4">
                     <img src={doc.imageUrl} alt={doc.name} className="w-16 h-16 rounded-full"/>
                     <div>
                         <h3 className="font-semibold">{doc.name}</h3>
                         <p className="text-sm text-slate-500">{doc.specialty}</p>
                         <Button onClick={() => onSelectDoctor(doc)} size="sm" variant="secondary" className="mt-2">View Profile</Button>
                     </div>
                 </Card>
            ))}
         </div>
       </div>

    </div>
  );
};
