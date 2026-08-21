import productImage from "@/assets/order-product.jpg";

export type OrderStepState = "done" | "current" | "pending";

export interface OrderStep {
  id: string;
  title: string;
  detail: string;
  state: OrderStepState;
}

export interface Order {
  orderId: string;
  reference: string;
  status: string;
  orderDate: string;
  orderTime: string;
  product: {
    title: string;
    type: string;
    variant?: string;
    image: string;
    quantity: number;
    price: number;
    episodes: number;
    accessNote: string;
  };
  pricing: {
    subtotal: number;
    discount: number;
    total: number;
  };
  payment: {
    method: string;
    paymentId: string | null;
    transactionId: string | null;
    amount: number;
    date: string;
    source: string;
  };
  steps: OrderStep[];
}

export const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const order: Order = {
  orderId: "AM-1071421266-1908-21392",
  reference: "AM-1071421266",
  status: "Completed",
  orderDate: "19 Aug 2026",
  orderTime: "12:00 AM",
  product: {
    title: "The Midnight Letters",
    type: "Digital audio story",
    variant: "Full season · 12 episodes",
    image: productImage,
    quantity: 1,
    price: 254,
    episodes: 12,
    accessNote: "Available in your library",
  },
  pricing: {
    subtotal: 299,
    discount: 45,
    total: 254,
  },
  payment: {
    method: "UPI",
    paymentId: null,
    transactionId: null,
    amount: 254,
    date: "19 Aug 2026 · 12:00 AM",
    source: "Mini App Checkout",
  },
  steps: [
    {
      id: "confirmed",
      title: "Order Confirmed",
      detail: "19 Aug 2026 · 12:00 AM",
      state: "done",
    },
    {
      id: "added",
      title: "Product Added",
      detail: "Permanent access granted",
      state: "done",
    },
    {
      id: "ready",
      title: "Ready to Access",
      detail: "All 12 episodes are ready to play",
      state: "current",
    },
  ],
};
