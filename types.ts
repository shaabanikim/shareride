import React from 'react';

export interface User {
  name: string;
  avatarUrl: string;
}

export interface Ride {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  multiplier: number;
  capacity: string;
}

export interface Trip {
    rider: User;
    pickup: string;
    destination: string;
    fare: number;
}
