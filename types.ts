
export enum HealthStatus {
  HEALTHY = 'Healthy',
  WARNING = 'Warning',
  CRITICAL = 'Critical',
}

export enum SensorType {
  TEMPERATURE = 'Temperature',
  HEART_RATE = 'Heart Rate',
  ACTIVITY = 'Activity',
  CO2 = 'CO2',
  NH3 = 'NH3',
  HUMIDITY = 'Humidity',
}

export interface LivestockData {
  id: string;
  tagId: string;
  type: 'Cow' | 'Pig' | 'Chicken';
  temperature: number;
  heartRate: number;
  activityLevel: number; // 0-100
  weight: number;
  status: HealthStatus;
  lastUpdate: string;
  location: { x: number; y: number };
}

export interface LivestockHistoryPoint {
  time: string;
  temperature: number;
  heartRate: number;
  activity: number;
}

export interface EnvironmentData {
  timestamp: string;
  temperature: number;
  humidity: number;
  co2: number;
  nh3: number;
}

export interface Alert {
  id: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  source: string;
  type: 'AI_DETECTION' | 'SENSOR_THRESHOLD' | 'SYSTEM';
}

export type DeviceStatus = 'Online' | 'Offline' | 'Maintenance' | 'Error';

export interface Device {
  id: string;
  name: string;
  type: 'Sensor' | 'Camera' | 'Gateway' | 'Server' | 'Controller';
  model: string;
  location: string;
  status: DeviceStatus;
  batteryLevel?: number; // percentage, null if wired
  lastPing: string;
  installDate: string;
  firmware: string;
  maintenanceDue?: string; // ISO Date
  issues?: string[];
}

export interface Expert {
  id: string;
  name: string;
  role: 'Veterinarian' | 'Biosecurity Specialist';
  specialization: string;
  status: 'Online' | 'Busy' | 'Offline';
  rating: number;
  imageUrl: string;
}

export interface Consultation {
  id: string;
  expertId: string;
  expertName: string;
  date: string;
  subject: string;
  status: 'Resolved' | 'In Progress' | 'Pending Review';
  diagnosis?: string;
  protocol?: string[]; // Steps for the farmer to take
  attachedData: string; // e.g., "Cow #1024 Video + Vitals"
}
