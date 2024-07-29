export interface Car {
  id: number;
  year: number;
  make: string;
  model: string;
  mileage: number;
  energy: string;
  fiscal_power: string;
  power_ch_in: string;
  category: string;
  transmission: string;
  color: string;
  description: string;
  provider: string;
  marketPrice: number;
  startingPrice: number;
  participationFees: number;
  imagePath?: string[];
}

export interface Auction {
  id: number;
  countdown: number;
  startingPrice: number;
  currentPrice: number;
  endTime?: Date; // Use optional chaining if endTime can be nullable
  auctionStatus: 'not_opened_yet' | 'ongoing' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Room {
  id: number;
  name: string;
  car: Car;
  startDate: string; // Use string if date is returned as a string
  auction: Auction; // Add the auction property
}


export interface User {
  id: number;
  name?: string;

  lastname?: string;

  email: string;

  password: string;

  phoneNumber?: string;

  address: string;

  role: string;

  verified: boolean;

  token?: string;

  resetToken?: string;

  resetTokenExpires?: Date;

  rooms?: Room[];

  bids?: Bid[];

  payments?: Payment[];
}
export interface Payment{
  id: string;

  
  cardNumber: string;

  
  expiryDate: string;

  
  cvv: string;

  user: User;

 
}
export interface Bid {
  id: number;

  bidder: User;

  auction: Auction;

  bidAmount: number;

}


