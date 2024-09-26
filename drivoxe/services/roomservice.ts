// services/roomService.ts
import axios from 'axios';
import { Car , CreateRoomDto, Room, UpdateRoomDto} from '../config/types';

const API_URL = 'http://localhost:4000';
const API_UR = 'https://auction-backend-o2l7.onrender.com';


export const fetchFilterOptions = async (): Promise<Partial<Record<keyof Car, string[]>>> => {
  try {
    const rooms = await getRooms();
    const makes = new Set<string>();
    const models = new Set<string>();
    const years = new Set<number>();
    const energys=  new Set<string>;
    const fiscal_powers=  new Set<string>;
    const power_ch_ins=  new Set<string>;
    const categorys=  new Set<string>;
    const transmissions=  new Set<string>;
    const colors=  new Set<string>;
    const providers=  new Set<string>;
    const marketPrices= new Set<number>();
    const startingPrices= new Set<number>();
    const participationFees= new Set<number>();
    // Add more sets for other attributes

    rooms.forEach((room: Room) => {
      makes.add(room.car.make);
      models.add(room.car.model);
      years.add(room.car.year);
      energys.add(room.car.energy);
      fiscal_powers.add(room.car.fiscal_power);
      power_ch_ins.add(room.car.power_ch_in);
      categorys.add(room.car.category);
      transmissions.add(room.car.transmission);
      colors.add(room.car.color);
      providers.add(room.car.provider);
      marketPrices.add(room.car.marketPrice);
      startingPrices.add(room.car.startingPrice);
      participationFees.add(room.car.participationFees);
      // Add more attributes as needed
    });

    return {
      make: Array.from(makes),
      model: Array.from(models),
      year: Array.from(years).map(String),
      energy: Array.from(energys),
      fiscal_power: Array.from(fiscal_powers),
      power_ch_in: Array.from(power_ch_ins),
      category: Array.from(categorys),
      transmission: Array.from(transmissions),
      color: Array.from(colors),
      provider: Array.from(providers),
      marketPrice: Array.from(marketPrices).map(String),
      startingPrice: Array.from(startingPrices).map(String),
      participationFees: Array.from(participationFees).map(String),
      // Convert years to strings
      // Add more attributes as needed
    };
  } catch (error) {
    throw new Error('Error fetching filter options: ' + error);
  }
};


export const getRooms = async () => {
  try {
    const response = await axios.get(`${API_URL}/rooms`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching rooms: ' + error  );
  }
};

export const getRoomById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching room: '  );
  }
};



