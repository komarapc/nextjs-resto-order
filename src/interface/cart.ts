import type { ItemProps } from "@/interface/item";

export interface CartProps {
  id?: string;
  order_quantity?: number;
  item?: ItemProps;
}
