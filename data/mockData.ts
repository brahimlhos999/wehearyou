
import { Doctor, Appointment, User, Pharmacy } from '../types';

export const doctors: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Chen',
    specialty: 'Cardiologist',
    imageUrl: 'https://i.pravatar.cc/150?u=doc1',
    availability: ['Mon', 'Wed', 'Fri'],
    bio: 'Dr. Chen is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She is passionate about preventative care.',
    rating: 4.9,
    languages: ['English', 'Mandarin'],
    location: 'San Francisco, CA',
  },
  {
    id: 'doc-2',
    name: 'Dr. Ben Carter',
    specialty: 'Dermatologist',
    imageUrl: 'https://i.pravatar.cc/150?u=doc2',
    availability: ['Tue', 'Thu'],
    bio: 'Dr. Carter specializes in both medical and cosmetic dermatology. He is known for his patient-centric approach and attention to detail.',
    rating: 4.8,
    languages: ['English', 'Spanish'],
    location: 'Miami, FL',
  },
  {
    id: 'doc-3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    imageUrl: 'https://i.pravatar.cc/150?u=doc3',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    bio: 'With a friendly and warm demeanor, Dr. Rodriguez has been providing comprehensive care for children of all ages for over a decade.',
    rating: 5.0,
    languages: ['English'],
    location: 'Chicago, IL',
  },
];

export const user: User = {
  id: 'user-123',
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatarUrl: 'https://i.pravatar.cc/150?u=alexdoe',
  subscription: 'premium',
};

export const appointments: Appointment[] = [
    {
        id: 'apt-1',
        doctor: doctors[0],
        date: '2024-08-15',
        time: '10:00 AM',
        type: 'Video Call',
        status: 'Upcoming'
    },
    {
        id: 'apt-2',
        doctor: doctors[2],
        date: '2024-07-20',
        time: '02:30 PM',
        type: 'Chat',
        status: 'Completed'
    },
    {
        id: 'apt-3',
        doctor: doctors[1],
        date: '2024-06-10',
        time: '11:00 AM',
        type: 'Video Call',
        status: 'Completed'
    }
];

export const pharmacies: Pharmacy[] = [
  {
    id: 'ph-1',
    name: 'City Health Pharmacy',
    address: '123 Main St, Anytown, USA',
    distance: '0.5 miles',
    hours: '9 AM - 9 PM'
  },
  {
    id: 'ph-2',
    name: 'Wellness Drugstore',
    address: '456 Oak Ave, Anytown, USA',
    distance: '1.2 miles',
    hours: '8 AM - 10 PM'
  }
];
