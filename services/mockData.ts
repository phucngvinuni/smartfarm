import { LivestockData, EnvironmentData, Alert, HealthStatus } from '../types';

export const generateLivestockData = (count: number): LivestockData[] => {
  return Array.from({ length: count }, (_, i) => {
    const isSick = Math.random() > 0.85;
    const isCritical = isSick && Math.random() > 0.7;
    
    let status = HealthStatus.HEALTHY;
    if (isCritical) status = HealthStatus.CRITICAL;
    else if (isSick) status = HealthStatus.WARNING;

    // Define zones for better visual distribution on the map
    // 0: Barn A (Top Left), 1: Barn B (Top Right), 2: Pasture (Bottom)
    const zone = Math.random() > 0.6 ? 2 : (Math.random() > 0.5 ? 1 : 0);
    
    let x, y;
    if (zone === 0) { // Barn A area
        x = 12 + Math.random() * 21; // 12% to 33%
        y = 12 + Math.random() * 26; // 12% to 38%
    } else if (zone === 1) { // Barn B area
        x = 67 + Math.random() * 21; // 67% to 88%
        y = 12 + Math.random() * 26; // 12% to 38%
    } else { // Pasture area
        x = 12 + Math.random() * 76; // 12% to 88%
        y = 57 + Math.random() * 31; // 57% to 88%
    }

    return {
      id: `animal-${i}`,
      tagId: `VN-${1000 + i}`,
      type: 'Cow',
      temperature: 38 + (Math.random() * 1.5) + (isSick ? 1.5 : 0),
      heartRate: 60 + Math.floor(Math.random() * 20) + (isSick ? 20 : 0),
      activityLevel: isSick ? Math.floor(Math.random() * 30) : 50 + Math.floor(Math.random() * 50),
      weight: 500 + Math.floor(Math.random() * 100),
      status,
      lastUpdate: new Date().toLocaleTimeString(),
      location: { x, y }
    };
  });
};

export const generateEnvironmentHistory = (): EnvironmentData[] => {
  const data: EnvironmentData[] = [];
  const now = new Date();
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600 * 1000);
    data.push({
      timestamp: `${time.getHours()}:00`,
      temperature: 25 + Math.sin(i / 5) * 5 + Math.random(),
      humidity: 60 + Math.cos(i / 5) * 10 + Math.random() * 5,
      co2: 400 + Math.random() * 100 + (i % 24 > 8 && i % 24 < 18 ? 200 : 0), // Higher during day
      nh3: 10 + Math.random() * 5,
    });
  }
  return data;
};

export const mockAlerts: Alert[] = [
  {
    id: '1',
    severity: 'high',
    message: 'Abnormal behavior detected: Cow #1005 shows signs of lameness (YOLOv8 Analysis)',
    timestamp: '10:42 AM',
    source: 'AI Camera 02',
    type: 'AI_DETECTION'
  },
  {
    id: '2',
    severity: 'medium',
    message: 'NH3 concentration in Area C Barn 2 exceeded warning threshold (28ppm)',
    timestamp: '10:30 AM',
    source: 'Env Sensor C2',
    type: 'SENSOR_THRESHOLD'
  },
  {
    id: '3',
    severity: 'medium',
    message: 'Body temperature of Cow #1012 is high (39.8°C)',
    timestamp: '09:15 AM',
    source: 'Ear Tag Sensor',
    type: 'SENSOR_THRESHOLD'
  },
  {
    id: '4',
    severity: 'low',
    message: 'Blockchain data synchronization completed',
    timestamp: '08:00 AM',
    source: 'System',
    type: 'SYSTEM'
  }
];