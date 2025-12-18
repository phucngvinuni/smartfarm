
import { LivestockData, EnvironmentData, Alert, HealthStatus, LivestockHistoryPoint, Device, Expert, Consultation } from '../types';

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

    const types: ('Cow' | 'Pig' | 'Chicken')[] = ['Cow', 'Pig', 'Chicken'];
    const animalType = types[Math.floor(Math.random() * types.length)];

    return {
      id: `animal-${i}`,
      tagId: `VN-${1000 + i}`,
      type: animalType,
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

export const getLivestockHistory = (animalId: string): LivestockHistoryPoint[] => {
    // Generate 24 hours of data
    const history: LivestockHistoryPoint[] = [];
    const now = new Date();
    
    // Base values based on a "healthy" cow, randomness added later
    let baseTemp = 38.5;
    let baseHR = 70;
    
    for (let i = 23; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 60 * 60 * 1000);
        const hour = date.getHours();
        
        // Activity is lower at night (22:00 - 05:00)
        let isNight = hour >= 22 || hour <= 5;
        let activity = isNight ? 10 + Math.random() * 10 : 40 + Math.random() * 60;
        
        // HR correlates slightly with activity
        let hr = baseHR + (activity / 10) + (Math.random() * 10 - 5);
        
        // Temp fluctuates slightly during day
        let temp = baseTemp + (isNight ? -0.2 : 0.3) + (Math.random() * 0.4 - 0.2);

        history.push({
            time: `${hour}:00`,
            temperature: parseFloat(temp.toFixed(1)),
            heartRate: Math.round(hr),
            activity: Math.round(activity)
        });
    }
    return history;
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

export const generateDevices = (): Device[] => {
  return [
    {
      id: 'gw-01',
      name: 'Main LoRaWAN Gateway',
      type: 'Gateway',
      model: 'Kerlink Wirnet iStation',
      location: 'Central Tower',
      status: 'Online',
      lastPing: 'Just now',
      installDate: '2023-01-15',
      firmware: 'v4.2.1',
      issues: []
    },
    {
      id: 'srv-01',
      name: 'Edge AI Server',
      type: 'Server',
      model: 'NVIDIA Jetson Orin',
      location: 'Control Room',
      status: 'Online',
      lastPing: '2 ms ago',
      installDate: '2023-03-20',
      firmware: 'Ubuntu 22.04 LTS',
      issues: []
    },
    {
      id: 'cam-01',
      name: 'Barn A - Feed Lane',
      type: 'Camera',
      model: 'Hikvision AI Pro',
      location: 'Barn A',
      status: 'Online',
      lastPing: '12 sec ago',
      installDate: '2023-02-10',
      firmware: 'v5.5.8',
      maintenanceDue: '2025-11-01',
      issues: []
    },
    {
      id: 'cam-02',
      name: 'Barn B - Isolation',
      type: 'Camera',
      model: 'Hikvision AI Pro',
      location: 'Barn B',
      status: 'Online',
      lastPing: '15 sec ago',
      installDate: '2023-02-10',
      firmware: 'v5.5.8',
      maintenanceDue: '2025-11-01',
      issues: []
    },
    {
      id: 'cam-03',
      name: 'Pasture Overview',
      type: 'Camera',
      model: 'Axis P1455-LE',
      location: 'Pasture North',
      status: 'Offline',
      lastPing: '4 hours ago',
      installDate: '2023-06-05',
      firmware: 'v10.12.1',
      maintenanceDue: '2025-10-25',
      issues: ['Signal Loss', 'Check Power Supply']
    },
    {
      id: 'sen-env-a1',
      name: 'Barn A Multi-Sensor 1',
      type: 'Sensor',
      model: 'Dragino LHT65',
      location: 'Barn A - Zone 1',
      status: 'Online',
      batteryLevel: 82,
      lastPing: '5 min ago',
      installDate: '2023-05-12',
      firmware: 'v1.8',
      issues: []
    },
    {
      id: 'sen-env-a2',
      name: 'Barn A Multi-Sensor 2',
      type: 'Sensor',
      model: 'Dragino LHT65',
      location: 'Barn A - Zone 2',
      status: 'Online',
      batteryLevel: 12,
      lastPing: '5 min ago',
      installDate: '2023-05-12',
      firmware: 'v1.8',
      maintenanceDue: '2025-10-30',
      issues: ['Low Battery']
    },
    {
      id: 'sen-env-b1',
      name: 'Barn B NH3 Monitor',
      type: 'Sensor',
      model: 'Milesight AM319',
      location: 'Barn B - Center',
      status: 'Maintenance',
      batteryLevel: 45,
      lastPing: '20 min ago',
      installDate: '2023-08-01',
      firmware: 'v2.1',
      maintenanceDue: '2025-10-24', // Today/Overdue
      issues: ['Sensor Calibration Required']
    },
    {
      id: 'sen-soil-p1',
      name: 'Pasture Soil Moisture',
      type: 'Sensor',
      model: 'SenseCAP S2104',
      location: 'Pasture South',
      status: 'Online',
      batteryLevel: 91,
      lastPing: '30 min ago',
      installDate: '2024-01-10',
      firmware: 'v1.2',
      issues: []
    },
    {
      id: 'ctrl-fan-a',
      name: 'Barn A Ventilation Controller',
      type: 'Controller',
      model: 'Siemens PLC S7-1200',
      location: 'Barn A Utility',
      status: 'Online',
      lastPing: '1 min ago',
      installDate: '2022-11-15',
      firmware: 'v4.5',
      issues: []
    },
    {
      id: 'ctrl-water-main',
      name: 'Main Water Pump Controller',
      type: 'Controller',
      model: 'Espressif ESP32 Custom',
      location: 'Pump House',
      status: 'Error',
      lastPing: '2 min ago',
      installDate: '2023-09-09',
      firmware: 'v2.0-beta',
      maintenanceDue: '2025-10-26',
      issues: ['Flow Rate Error', 'Check Valve']
    },
  ];
};

export const mockExperts: Expert[] = [
  {
    id: 'exp-1',
    name: 'Dr. Sarah Nguyen',
    role: 'Veterinarian',
    specialization: 'Large Animal Medicine',
    status: 'Online',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'exp-2',
    name: 'Dr. Michael Chen',
    role: 'Biosecurity Specialist',
    specialization: 'Epidemiology & Farm Safety',
    status: 'Online',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'exp-3',
    name: 'Dr. Emily Watson',
    role: 'Veterinarian',
    specialization: 'Poultry Health',
    status: 'Busy',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200'
  }
];

export const mockConsultations: Consultation[] = [
  {
    id: 'cons-102',
    expertId: 'exp-2',
    expertName: 'Dr. Michael Chen',
    date: '2025-10-25 09:30 AM',
    subject: 'Abnormal NH3 Spike in Barn A',
    status: 'Resolved',
    attachedData: 'Env Sensor Log #402',
    diagnosis: 'Ventilation failure causing ammonia buildup.',
    protocol: [
        'Immediate: Open side curtains manually.',
        'Reset Fan Controller A (Error code 503).',
        'Schedule sensor recalibration.'
    ]
  },
  {
    id: 'cons-101',
    expertId: 'exp-1',
    expertName: 'Dr. Sarah Nguyen',
    date: '2025-10-24 02:15 PM',
    subject: 'Cow #1024 Lameness Check',
    status: 'Resolved',
    attachedData: 'Video Clip #291 + Gait Analysis',
    diagnosis: 'Early stage foot rot confirmed.',
    protocol: [
        'Isolate Cow #1024 to Barn B.',
        'Administer antibiotic treatment (Oxytetracycline).',
        'Clean and disinfect Barn A flooring.'
    ]
  },
  {
    id: 'cons-103',
    expertId: 'exp-1',
    expertName: 'Dr. Sarah Nguyen',
    date: '2025-10-26 10:00 AM',
    subject: 'Pig #502 Lethargy',
    status: 'In Progress',
    attachedData: 'Thermal Cam Img + Vitals',
    diagnosis: 'Pending lab results.',
    protocol: [
        'Monitor temperature every 4 hours.',
        'Ensure access to clean water.'
    ]
  }
];
