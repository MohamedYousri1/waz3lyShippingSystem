import { InveItems } from "./InveItems";
import { IProduct } from "./product";

export interface IInventory{
    name:string;
    address:string;
    phone:string;
    extentionArea:string;
    epmloyeeOfInve:string;
    amountsOfItems:InveItems[];
}