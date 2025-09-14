
import React from 'react';
import { Doctor, View } from '../types';
import { appointments } from '../data/mockData';
import { Button } from './common/Button';
import { Card } from './common/Card';

interface PastAppointmentsProps {
    setView: (view: View) => void;
    onSelectDoctor: (doctor: Doctor) => void;
}

export const PastAppointments: React.FC<PastAppointmentsProps> = ({ setView, onSelectDoctor }) => {
    const pastAppointments = appointments.filter(a => a.status !== 'Upcoming');
    
    return (
        <div className="space-y-6">
             <Button onClick={() => setView('dashboard')} variant="secondary" className="mb-6">
                &larr; Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-slate-800">Appointment History</h1>
            <div className="space-y-4">
            {pastAppointments.map(appt => (
                <Card key={appt.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img src={appt.doctor.imageUrl} alt={appt.doctor.name} className="w-12 h-12 rounded-full"/>
                        <div>
                            <p className="font-semibold">{appt.doctor.name}</p>
                            <p className="text-sm text-slate-500">{appt.date} - {appt.type}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 text-sm rounded-full ${appt.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {appt.status}
                        </span>
                        <Button onClick={() => onSelectDoctor(appt.doctor)} size="sm" variant="secondary">Book Again</Button>
                    </div>
                </Card>
            ))}
            </div>
        </div>
    );
};
