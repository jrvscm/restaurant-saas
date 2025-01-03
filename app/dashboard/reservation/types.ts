export interface Reservation {
  id: string;
  status: string;
  contactName: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  archived: boolean;
  phoneNumber: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  User: {
    email: string;
    fullName: string;
    phone: string;
  };
}
