export type UserRole = 
  | 'receptionist'
  | 'doctor'
  | 'nurse'
  | 'pharmacist'
  | 'lab_technician'
  | 'accountant'
  | 'admin';

export interface Patient {
  id: string;
  uhid: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  address: string;
  registeredAt: Date;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  dateTime: Date;
  status: 'scheduled' | 'checked-in' | 'in-progress' | 'completed' | 'cancelled';
}

export interface QueueItem {
  id: string;
  patientId: string;
  patientName: string;
  uhid: string;
  waitingSince: Date;
  status: 'waiting' | 'in-consult';
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  uhid: string;
  medicines: {
    name: string;
    dosage: string;
    quantity: number;
  }[];
  status: 'pending' | 'dispensed';
  prescribedAt: Date;
}

export interface LabTest {
  id: string;
  patientId: string;
  patientName: string;
  uhid: string;
  testName: string;
  status: 'pending' | 'sample-collected' | 'completed';
  orderedAt: Date;
  result?: string;
}

export interface BedInfo {
  id: string;
  number: string;
  ward: string;
  status: 'free' | 'occupied' | 'discharge-requested';
  patientId?: string;
  patientName?: string;
}

export interface NursingTask {
  id: string;
  patientId: string;
  patientName: string;
  bedNumber: string;
  task: string;
  dueAt: Date;
  status: 'pending' | 'completed';
}

export interface Vitals {
  temperature: number;
  pulse: number;
  bp: string;
  spo2: number;
  recordedAt: Date;
}

export interface Bill {
  id: string;
  patientId: string;
  patientName: string;
  uhid: string;
  items: {
    description: string;
    amount: number;
    category: 'consultation' | 'pharmacy' | 'lab' | 'bed';
  }[];
  total: number;
  insuranceAmount?: number;
  status: 'pending' | 'paid' | 'partial';
}
