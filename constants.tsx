import React from 'react';
import { Ride } from './types';

export const RIDE_OPTIONS: Ride[] = [
  {
    id: 'shareride-moto',
    name: 'Motorcycle',
    description: 'Quick, affordable solo trips',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.35 6.04C18.67 4.57 16.98 4 15 4h-1.42c-.44 0-.85.22-1.08.59L10 9H6c-1.1 0-2 .9-2 2v3c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-2h2.28l2.05-3.08c.23-.37.64-.59 1.08-.59H15c.69 0 1.21.31 1.47.76l1 2c.26.45.78.74 1.36.74h2.17c.55 0 1-.45 1-1v-3c0-1.1-.9-2-2-2h-1.65z"/>
        <circle cx="6.5" cy="17.5" r="2.5"/>
        <circle cx="16.5" cy="17.5" r="2.5"/>
      </svg>
    ),
    multiplier: 0.8,
    capacity: '1',
  },
  {
    id: 'shareride-x',
    name: 'Connect',
    description: 'Affordable, everyday rides',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
      </svg>
    ),
    multiplier: 1,
    capacity: '1-4',
  },
  {
    id: 'shareride-xl',
    name: 'ShareRide XL',
    description: 'For groups up to 6',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 18V8c0-1.1-.9-2-2-2h-4.28c-.4-.9-1.24-1.55-2.22-1.72L12 4l-1.5 1.5L9 4l-1.5 1.5L6 4l-1.5 1.5L3 4l-1.5 1.5L0 4v2l1.5-1.5L3 6l1.5-1.5L6 6l1.5-1.5L9 6l1.5-1.5L12 6l1.5-1.5L15 6l1.28.35c.98.17 1.82.82 2.22 1.72H20c1.1 0 2 .9 2 2v10h2v-2h-2zm-4 0H4V8h16v10zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </svg>
    ),
    multiplier: 1.5,
    capacity: '1-6',
  },
  {
    id: 'shareride-comfort',
    name: 'Comfort',
    description: 'Newer cars, extra legroom',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.57 10.43c-1.22-2.38-3.53-4.08-6.23-4.41V4h-4v2.02c-2.7.33-5.01 2.03-6.23 4.41-1.07 2.09-.72 4.67.93 6.49.95 1.04 2.22 1.75 3.65 2.02V22h6v-3.06c1.43-.27 2.7-.98 3.65-2.02 1.65-1.82 2-4.4 1.02-6.49zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
      </svg>
    ),
    multiplier: 1.25,
    capacity: '1-4',
  },
  {
    id: 'shareride-black',
    name: 'ShareRide Premium',
    description: 'Premium rides, professional drivers',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.58 7.19l-1.1-3.48c-.28-.86-1.06-1.46-1.98-1.46H5.5c-.93 0-1.7.6-1.98 1.46L2.42 7.19C2.15 8.05 2.5 9 3.33 9H20.7c.82 0 1.17-.95.88-1.81zM4.12 10l-.09.32c-.38 1.34.6 2.68 1.98 2.68H6v6c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-6h4v6c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-6h1.99c1.38 0 2.36-1.34 1.98-2.68l-.09-.32H4.12z" />
      </svg>
    ),
    multiplier: 2.0,
    capacity: '1-4',
  },
];