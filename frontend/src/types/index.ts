export interface Experience {
  id: string;
  title: string;
  description: string;
  location: string;
  image: string;
  price: number;
  availableDates: string[];
  slots: string[];
}

export interface Booking {
  id?: string;
  experienceId: string;
  name: string;
  email: string;
  date: string;
  slot: string;
  promoCode?: string;
}
