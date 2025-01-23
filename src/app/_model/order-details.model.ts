import { OrderQuantity } from "./order-quantity.model";

export interface OrderDetails{
    userFullName: String,
	userFullAdd: String,
	userContNumber: String,
	userAltContNumber: String,
	quantityList: OrderQuantity[];
}