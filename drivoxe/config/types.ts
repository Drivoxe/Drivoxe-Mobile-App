// types.ts
export interface Car {
    id: number;
    year: number;
    make: string;
    model: string;
    mileage: number;
    energy: string;
    fiscal_power: string;
    power_ch_in: string;
    transmission: string;
    color: string;
    description: string;
    provider: string;
    marketPrice: number;
    startingPrice: number;
    participationFees: number;
    imagePath?: string[];
  }
  
  export interface Room {
    id: number;
    name: string;
    car: Car;
    startDate: string; // Use string if date is returned as a string
  }
  