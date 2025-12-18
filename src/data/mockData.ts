import { Patient, Appointment, QueueItem, Prescription, LabTest, BedInfo, NursingTask, Bill } from '@/types/hospital';

export const mockPatients: Patient[] = [
  { id: '1', uhid: 'UHID-2024-001', name: 'John Smith', age: 45, gender: 'Male', phone: '555-0101', address: '123 Oak Street', registeredAt: new Date() },
  { id: '2', uhid: 'UHID-2024-002', name: 'Sarah Johnson', age: 32, gender: 'Female', phone: '555-0102', address: '456 Pine Avenue', registeredAt: new Date() },
  { id: '3', uhid: 'UHID-2024-003', name: 'Michael Brown', age: 58, gender: 'Male', phone: '555-0103', address: '789 Maple Drive', registeredAt: new Date() },
  { id: '4', uhid: 'UHID-2024-004', name: 'Emily Davis', age: 28, gender: 'Female', phone: '555-0104', address: '321 Elm Court', registeredAt: new Date() },
  { id: '5', uhid: 'UHID-2024-005', name: 'Robert Wilson', age: 67, gender: 'Male', phone: '555-0105', address: '654 Cedar Lane', registeredAt: new Date() },
];

export const mockDoctors = [
  { id: 'd1', name: 'Dr. Amanda Chen', specialty: 'General Medicine' },
  { id: 'd2', name: 'Dr. James Wilson', specialty: 'Cardiology' },
  { id: 'd3', name: 'Dr. Maria Garcia', specialty: 'Pediatrics' },
  { id: 'd4', name: 'Dr. David Lee', specialty: 'Orthopedics' },
];

export const mockAppointments: Appointment[] = [
  { id: 'a1', patientId: '1', patientName: 'John Smith', doctorId: 'd1', doctorName: 'Dr. Amanda Chen', dateTime: new Date(), status: 'scheduled' },
  { id: 'a2', patientId: '2', patientName: 'Sarah Johnson', doctorId: 'd2', doctorName: 'Dr. James Wilson', dateTime: new Date(), status: 'checked-in' },
  { id: 'a3', patientId: '3', patientName: 'Michael Brown', doctorId: 'd1', doctorName: 'Dr. Amanda Chen', dateTime: new Date(), status: 'in-progress' },
];

export const mockQueue: QueueItem[] = [
  { id: 'q1', patientId: '1', patientName: 'John Smith', uhid: 'UHID-2024-001', waitingSince: new Date(Date.now() - 15 * 60000), status: 'waiting' },
  { id: 'q2', patientId: '2', patientName: 'Sarah Johnson', uhid: 'UHID-2024-002', waitingSince: new Date(Date.now() - 25 * 60000), status: 'waiting' },
  { id: 'q3', patientId: '4', patientName: 'Emily Davis', uhid: 'UHID-2024-004', waitingSince: new Date(Date.now() - 8 * 60000), status: 'waiting' },
];

export const mockPrescriptions: Prescription[] = [
  { id: 'p1', patientId: '1', patientName: 'John Smith', uhid: 'UHID-2024-001', medicines: [{ name: 'Paracetamol', dosage: '500mg', quantity: 10 }, { name: 'Amoxicillin', dosage: '250mg', quantity: 14 }], status: 'pending', prescribedAt: new Date() },
  { id: 'p2', patientId: '3', patientName: 'Michael Brown', uhid: 'UHID-2024-003', medicines: [{ name: 'Metformin', dosage: '500mg', quantity: 30 }], status: 'pending', prescribedAt: new Date() },
];

export const mockLabTests: LabTest[] = [
  { id: 'l1', patientId: '1', patientName: 'John Smith', uhid: 'UHID-2024-001', testName: 'Complete Blood Count', status: 'pending', orderedAt: new Date() },
  { id: 'l2', patientId: '2', patientName: 'Sarah Johnson', uhid: 'UHID-2024-002', testName: 'Chest X-Ray', status: 'sample-collected', orderedAt: new Date() },
  { id: 'l3', patientId: '5', patientName: 'Robert Wilson', uhid: 'UHID-2024-005', testName: 'ECG', status: 'completed', orderedAt: new Date(), result: 'Normal sinus rhythm' },
];

export const mockBeds: BedInfo[] = [
  { id: 'b1', number: 'W1-101', ward: 'Ward 1', status: 'free' },
  { id: 'b2', number: 'W1-102', ward: 'Ward 1', status: 'occupied', patientId: '3', patientName: 'Michael Brown' },
  { id: 'b3', number: 'W1-103', ward: 'Ward 1', status: 'occupied', patientId: '5', patientName: 'Robert Wilson' },
  { id: 'b4', number: 'W1-104', ward: 'Ward 1', status: 'discharge-requested', patientId: '1', patientName: 'John Smith' },
  { id: 'b5', number: 'W2-201', ward: 'Ward 2', status: 'free' },
  { id: 'b6', number: 'W2-202', ward: 'Ward 2', status: 'occupied', patientId: '2', patientName: 'Sarah Johnson' },
  { id: 'b7', number: 'W2-203', ward: 'Ward 2', status: 'free' },
  { id: 'b8', number: 'W2-204', ward: 'Ward 2', status: 'free' },
];

export const mockNursingTasks: NursingTask[] = [
  { id: 'n1', patientId: '3', patientName: 'Michael Brown', bedNumber: 'W1-102', task: 'Give Paracetamol 500mg', dueAt: new Date(Date.now() + 30 * 60000), status: 'pending' },
  { id: 'n2', patientId: '5', patientName: 'Robert Wilson', bedNumber: 'W1-103', task: 'Check Blood Pressure', dueAt: new Date(Date.now() + 60 * 60000), status: 'pending' },
  { id: 'n3', patientId: '2', patientName: 'Sarah Johnson', bedNumber: 'W2-202', task: 'Change IV Drip', dueAt: new Date(Date.now() + 15 * 60000), status: 'pending' },
  { id: 'n4', patientId: '1', patientName: 'John Smith', bedNumber: 'W1-104', task: 'Prepare discharge documents', dueAt: new Date(Date.now() + 120 * 60000), status: 'pending' },
];

export const mockBills: Bill[] = [
  { id: 'bill1', patientId: '1', patientName: 'John Smith', uhid: 'UHID-2024-001', items: [{ description: 'OPD Consultation', amount: 500, category: 'consultation' }, { description: 'CBC Test', amount: 350, category: 'lab' }, { description: 'Medicines', amount: 250, category: 'pharmacy' }, { description: 'Bed Charges (3 days)', amount: 3000, category: 'bed' }], total: 4100, status: 'pending' },
  { id: 'bill2', patientId: '3', patientName: 'Michael Brown', uhid: 'UHID-2024-003', items: [{ description: 'Specialist Consultation', amount: 800, category: 'consultation' }, { description: 'ECG', amount: 500, category: 'lab' }], total: 1300, insuranceAmount: 1000, status: 'partial' },
];

export const inventoryItems = [
  { id: 'inv1', name: 'Paracetamol 500mg', stock: 250, unit: 'tablets' },
  { id: 'inv2', name: 'Amoxicillin 250mg', stock: 8, unit: 'capsules' },
  { id: 'inv3', name: 'Metformin 500mg', stock: 180, unit: 'tablets' },
  { id: 'inv4', name: 'Omeprazole 20mg', stock: 95, unit: 'capsules' },
  { id: 'inv5', name: 'Insulin Regular', stock: 5, unit: 'vials' },
];

export const analyticsData = {
  revenue: { today: 45200, week: 312500, month: 1245000 },
  patients: { today: 42, week: 285, month: 1120 },
  bedOccupancy: 62,
  avgWaitTime: 18,
  pendingBills: 23,
};
