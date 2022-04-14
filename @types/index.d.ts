interface Base {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface Customer extends Base {
  name: string;
  phoneNumber: string;
}

interface Invoice extends Base {
  customer_id: string;
  customer?: Customer;
  item: string;
  totalAmount: number;
  dueDate: Date;
  paymentFrequency: string;
  numberOfPayments: number;
}
