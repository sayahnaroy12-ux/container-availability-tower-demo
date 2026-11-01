export type ContainerStatus = 'Available' | 'Expected' | 'Reserved' | 'Unavailable' | 'In transit';

export type PortInventory = {
  name: string;
  country: string;
  available: number;
  expected: number;
  reserved: number;
  unavailable: number;
  sevenDayDemand: number;
};

export type PipelineContainer = {
  id: string;
  size: '20 ft' | '40 ft';
  status: ContainerStatus;
  origin: string;
  currentPort: string;
  nextPort: string;
  eta: string;
  note: string;
};

export const demoPorts: PortInventory[] = [
  { name: 'Rotterdam', country: 'Netherlands', available: 42, expected: 18, reserved: 44, unavailable: 16, sevenDayDemand: 34 },
  { name: 'Singapore', country: 'Singapore', available: 16, expected: 34, reserved: 32, unavailable: 14, sevenDayDemand: 28 },
  { name: 'Los Angeles', country: 'United States', available: 28, expected: 12, reserved: 30, unavailable: 14, sevenDayDemand: 20 },
];

export const demoContainers: PipelineContainer[] = [
  { id: 'MSCU 481205-7', size: '40 ft', status: 'Available', origin: 'Shanghai', currentPort: 'Singapore', nextPort: 'Singapore', eta: 'Available now', note: 'Ready for customer allocation' },
  { id: 'MAEU 209438-1', size: '40 ft', status: 'Expected', origin: 'Rotterdam', currentPort: 'At sea', nextPort: 'Singapore', eta: 'In 18 hours', note: 'Vessel arrival; customs release pending' },
  { id: 'TGHU 716052-4', size: '20 ft', status: 'Reserved', origin: 'Los Angeles', currentPort: 'Rotterdam', nextPort: 'Rotterdam', eta: 'Available Nov 2', note: 'Held for confirmed customer booking' },
  { id: 'MSCU 135770-9', size: '40 ft', status: 'In transit', origin: 'Singapore', currentPort: 'At sea', nextPort: 'Los Angeles', eta: 'Nov 3, 08:00', note: 'On vessel; tracking milestone received' },
  { id: 'MAEU 808641-2', size: '20 ft', status: 'Unavailable', origin: 'Rotterdam', currentPort: 'Los Angeles', nextPort: 'Los Angeles', eta: 'Nov 5 (estimate)', note: 'Inspection hold; release date unconfirmed' },
  { id: 'TGHU 392164-8', size: '40 ft', status: 'Available', origin: 'Singapore', currentPort: 'Rotterdam', nextPort: 'Rotterdam', eta: 'Available now', note: 'Ready for customer allocation' },
  { id: 'MSCU 614972-0', size: '20 ft', status: 'Expected', origin: 'Los Angeles', currentPort: 'At sea', nextPort: 'Rotterdam', eta: 'Nov 4, 14:30', note: 'Vessel arrival; customs release pending' },
  { id: 'MAEU 550183-6', size: '40 ft', status: 'Reserved', origin: 'Singapore', currentPort: 'Los Angeles', nextPort: 'Los Angeles', eta: 'Available Nov 1', note: 'Held for confirmed customer booking' },
];
