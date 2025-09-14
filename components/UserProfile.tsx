import React from 'react';
import { User, View } from '../types';
import { Button } from './common/Button';
import { Card } from './common/Card';

interface UserProfileProps {
    user: User;
    setView: (view: View) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, setView }) => {
    return (
        <div className="max-w-2xl mx-auto">
             <Button onClick={() => setView('dashboard')} variant="secondary" className="mb-6">
                &larr; Back to Dashboard
            </Button>
            <Card className="p-8">
                <div className="flex items-center space-x-6">
                    <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full"/>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">{user.name}</h1>
                        <p className="text-slate-500">{user.email}</p>
                    </div>
                </div>
                <div className="mt-8 border-t pt-6 space-y-4">
                    <div>
                        <h3 className="font-semibold text-slate-700">Subscription Plan</h3>
                        <p className="text-slate-600 capitalize">{user.subscription}</p>
                        <Button onClick={() => setView('subscription')} size="sm" variant="secondary" className="mt-2">Manage Subscription</Button>
                    </div>
                     <div>
                        <h3 className="font-semibold text-slate-700">Past Appointments</h3>
                        <Button onClick={() => setView('pastAppointments')} size="sm" variant="secondary" className="mt-2">View History</Button>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-700">AI Pharmacy</h3>
                        <Button onClick={() => setView('pharmacy')} size="sm" variant="secondary" className="mt-2">Ask AI Pharmacy</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};