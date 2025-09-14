import React from 'react';
import { View } from '../types';
import { Button } from './common/Button';
import { Card } from './common/Card';

interface SubscriptionProps {
    setView: (view: View) => void;
}

export const Subscription: React.FC<SubscriptionProps> = ({ setView }) => {
    return (
        <div className="space-y-6">
            <Button onClick={() => setView('dashboard')} variant="secondary">&larr; Back to Dashboard</Button>
            <h1 className="text-3xl font-bold text-slate-800">Subscription Plans</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-8">
                    <h2 className="text-2xl font-bold text-teal-600">Basic Plan</h2>
                    <p className="text-4xl font-extrabold my-4">$29<span className="text-lg font-medium text-slate-500">/mo</span></p>
                    <ul className="space-y-2 text-slate-600">
                        <li>✓ Unlimited Chat with Doctors</li>
                        <li>✓ Symptom Checker Access</li>
                        <li>✗ 24/7 Video Call Priority</li>
                        <li>✗ Prescription Discounts</li>
                    </ul>
                    {/* FIX: Added onClick prop to satisfy ButtonProps type requirement. */}
                    <Button onClick={() => {}} variant="secondary" className="w-full mt-6">Current Plan</Button>
                </Card>
                <Card className="p-8 border-2 border-teal-600">
                     <h2 className="text-2xl font-bold text-teal-600">Premium Plan</h2>
                    <p className="text-4xl font-extrabold my-4">$49<span className="text-lg font-medium text-slate-500">/mo</span></p>
                    <ul className="space-y-2 text-slate-600">
                        <li>✓ Unlimited Chat with Doctors</li>
                        <li>✓ Symptom Checker Access</li>
                        <li>✓ 24/7 Video Call Priority</li>
                        <li>✓ Prescription Discounts</li>
                    </ul>
                    {/* FIX: Added onClick prop to satisfy ButtonProps type requirement. */}
                    <Button onClick={() => {}} className="w-full mt-6">Upgrade to Premium</Button>
                </Card>
            </div>
        </div>
    );
};