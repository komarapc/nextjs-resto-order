import { CartProps } from "./cart";

export interface OrderProps {
  id?: string;
  order_date?: string;
  order_status?: "waiting payment" | "on process" | "done";
  order_total?: number;
  order_items?: CartProps[];
  customer?: {
    name?: string;
    phone?: string;
  };
}
