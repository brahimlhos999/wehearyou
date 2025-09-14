export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  availability: string[];
  bio: string;
  rating: number;
  languages: string[];
  location: string;
}

export type View = 'dashboard' | 'doctors' | 'doctorProfile' | 'chat' | 'videoCall' | 'symptomChecker' | 'pastAppointments' | 'userProfile' | 'subscription' | 'pharmacy' | 'login';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'doctor' | 'system' | 'ai';
  timestamp: Date;
}

export interface Appointment {
  id:string;
  doctor: Doctor;
  date: string;
  time: string;
  type: 'Chat' | 'Video Call';
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

export interface User {
  id:string;
  name: string;
  email: string;
  avatarUrl: string;
  subscription: 'free' | 'premium';
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  distance: string;
  hours: string;
}