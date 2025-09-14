
import React from 'react';
import { Doctor } from '../types';
import { Button } from './common/Button';
import { Card } from './common/Card';

interface DoctorsListProps {
  doctors: Doctor[];
  onSelectDoctor: (doctor: Doctor) => void;
}

export const DoctorsList: React.FC<DoctorsListProps> = ({ doctors, onSelectDoctor }) => {
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold text-slate-800">Find a Doctor</h1>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="p-6 text-center">
            <img src={doctor.imageUrl} alt={doctor.name} className="w-24 h-24 rounded-full mx-auto" />
            <h2 className="mt-4 text-xl font-semibold text-slate-800">{doctor.name}</h2>
            <p className="text-slate-500">{doctor.specialty}</p>
            <p className="mt-2 text-sm text-slate-600">{doctor.location}</p>
            <Button onClick={() => onSelectDoctor(doctor)} className="mt-4">
              View Profile
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
