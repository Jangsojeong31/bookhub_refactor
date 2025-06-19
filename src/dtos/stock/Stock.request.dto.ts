//src/dtos/stock/Stock.request.dto.ts
import { StockActionType } from "@/apis/enums/StockActionType";

export interface StockUpdateRequestDto{
  type : StockActionType;
  employeeId: {id: number};
  bookIsbn : {id: string};
  branchId : {id: number};
  amount : number;
  description: string;
}