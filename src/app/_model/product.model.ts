import { FileHandle } from "./file-handle.model";


export interface Product{
    productName: string,
    productDesc: string,
    prodActPrice: number,
    prodDisPrice: number,
    productImages: FileHandle[]
}