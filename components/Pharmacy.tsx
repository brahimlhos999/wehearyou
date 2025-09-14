import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { View } from '../types';
import { Button } from './common/Button';
import { Card } from './common/Card';
import { Spinner } from './common/Spinner';
import { getMedicationSuggestions, getMedicationInfoFromScan } from '../services/geminiService';
import { QrCodeIcon } from './icons';

interface PharmacyProps {
    setView: (view: View) => void;
}

type Tab = 'condition' | 'scan';

export const Pharmacy: React.FC<PharmacyProps> = ({ setView }) => {
    const [activeTab, setActiveTab] = useState<Tab>('condition');
    const [condition, setCondition] = useState('');
    const [country, setCountry] = useState('United States');
    const [isLoading, setIsLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState<string | null>(null);

    const handleConditionSubmit = async () => {
        if (!condition.trim()) return;
        setIsLoading(true);
        setAiResponse(null);
        const response = await getMedicationSuggestions(condition, country);
        setAiResponse(response);
        setIsLoading(false);
    };

    const handleScan = async () => {
        setIsLoading(true);
        setAiResponse(null);
        // This is a simulation. A real app would use a library like html5-qrcode.
        const simulatedScanData = 'UPC: 0300450424233 - Tylenol Extra Strength Caplets 500mg';
        alert(`Scanning simulated medication...\n\nData: ${simulatedScanData}`);
        const response = await getMedicationInfoFromScan(simulatedScanData);
        setAiResponse(response);
        setIsLoading(false);
    };

    const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'New Zealand'];

    const TabButton: React.FC<{tab: Tab, label: string}> = ({tab, label}) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === tab ? 'bg-teal-600 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <Button onClick={() => setView('dashboard')} variant="secondary" className="mb-6">
                &larr; Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-slate-800">AI Pharmacy Assistant</h1>

            <Card className="p-6">
                <div className="flex space-x-2 border-b pb-4 mb-6">
                    <TabButton tab="condition" label="Find by Condition" />
                    <TabButton tab="scan" label="Scan Medication" />
                </div>

                {activeTab === 'condition' && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-slate-700">Get Medication Suggestions</h2>
                        <div>
                            <label htmlFor="condition" className="block text-sm font-medium text-slate-700">Describe the condition or symptoms</label>
                            <textarea
                                id="condition"
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                                placeholder="e.g., 'headache and sinus pressure'"
                                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                rows={3}
                            />
                        </div>
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-slate-700">Your Country</label>
                            <select
                                id="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                            >
                                {countries.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <Button onClick={handleConditionSubmit} disabled={isLoading || !condition.trim()} className="w-full">
                            {isLoading ? 'Thinking...' : 'Get Suggestions'}
                        </Button>
                    </div>
                )}

                {activeTab === 'scan' && (
                    <div className="space-y-4 text-center">
                        <h2 className="text-xl font-semibold text-slate-700">Identify Medication from a Scan</h2>
                        <p className="text-slate-500">Scan a medication's QR code or barcode to learn more about it.</p>
                        <div className="flex justify-center">
                            <Button onClick={handleScan} disabled={isLoading} className="inline-flex items-center gap-2">
                                <QrCodeIcon />
                                {isLoading ? 'Analyzing...' : 'Simulate Scan'}
                            </Button>
                        </div>
                        <p className="text-xs text-slate-400">Note: This is a simulation for demo purposes.</p>
                    </div>
                )}
            </Card>

            {(isLoading || aiResponse) && (
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">AI Response</h3>
                    {isLoading && <Spinner />}
                    {aiResponse && (
                        <div className="prose prose-slate max-w-none">
                            <ReactMarkdown>{aiResponse}</ReactMarkdown>
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
};