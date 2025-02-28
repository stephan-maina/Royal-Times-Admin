export interface Drivers {
  id: number;
  name: string;
  amount?: string;
  paymentMethod?: string;
  date?: string;
  amountOwed?: string;
  imageSrc: string;
  completedrides?: number;
  rating?: string;
  ratingphoto?: string;
  transactionType?: "Rides" | "Deliveries";
  unsubmittedAmount?: string;
  limit?: string;
  activityStatus?: "Active" | "Inactive" | "Offline";
  pendingAmount?: string;
  lastPaymentDate?: string;
  [key: string]: unknown;
}

export interface Promotion {
  id: number;
  name: string;
  creationDate: string;
  discount: string;
  beneficiaries: number;
  completedRides: number;
  status: "Active" | "Inactive";
  validity: string;
}

export type SortColumnType = "amount" | "date" | "amountOwed" | "pendingAmount" | "lastPaymentDate" | "Active" | "Inactive" | "Offline" | "discount" | "beneficiaries" | "completedRides" | null;

export interface Column {
  header: string;
  accessor: keyof Promotion;
}