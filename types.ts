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
