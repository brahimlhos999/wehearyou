
import React from 'react';
import { Doctor, View } from '../types';
import { Button } from './common/Button';
import { Card } from './common/Card';

interface DoctorProfileProps {
  doctor: Doctor;
  setView: (view: View) => void;
}

export const DoctorProfile: React.FC<DoctorProfileProps> = ({ doctor, setView }) => {
  return (
    <div>
        <Button onClick={() => setView('doctors')} variant="secondary" className="mb-6">
            &larr; Back to Doctors
        </Button>
        <Card className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
                <img src={doctor.imageUrl} alt={doctor.name} className="w-32 h-32 rounded-full object-cover" />
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-slate-800">{doctor.name}</h1>
                    <p className="text-lg text-teal-600 font-semibold">{doctor.specialty}</p>
                    <div className="flex items-center mt-2">
                        <span className="text-yellow-500">{'★'.repeat(Math.round(doctor.rating))}{'☆'.repeat(5 - Math.round(doctor.rating))}</span>
                        <span className="ml-2 text-slate-600">{doctor.rating}</span>
                    </div>
                    <p className="mt-4 text-slate-600">{doctor.bio}</p>

                    <div className="mt-6">
                        <h3 className="font-semibold text-slate-700">Languages</h3>
                        <p className="text-slate-600">{doctor.languages.join(', ')}</p>
                    </div>

                    <div className="mt-6">
                        <h3 className="font-semibold text-slate-700">Availability</h3>
                        <div className="flex gap-2 mt-2">
                            {doctor.availability.map(day => <span key={day} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">{day}</span>)}
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <Button onClick={() => setView('chat')}>Start Chat</Button>
                        <Button onClick={() => setView('videoCall')} variant="secondary">Start Video Call</Button>
                    </div>
                </div>
            </div>
        </Card>
    </div>
  );
};
