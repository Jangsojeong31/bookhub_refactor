import { DisplayType } from "@/apis/enums/DisplayType";


export interface LocationCreateResponseDto{
         bookTitle : string;
        floor : string;
        hall : string;
        section: string;
        displayType : DisplayType;
  }

  export interface LocationResponseDto{
    type: ReactNode;
    locationId : number;
    bookTitle: string;
    floor: string;
  }

  export interface LocationDetailResponseDto{
    locationId : number;
    bookTitle: string;
    floor : string;
    hall: string;
    section: string;
    type : DisplayType;
    note : string;
  }

  export interface LocationUpdateResponseDto{
    bookTitle : string;
    floor : string;
    gall : string;
    section : string;
    type : DisplayType;
  }