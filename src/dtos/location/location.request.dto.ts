import { DisplayType } from "@/apis/enums/DisplayType";



  export interface LocationCreateRequestDto{
    bookIsbn : string;
    floor : string;
    hall : string;
    section: string;
    displayType : DisplayType;
    note? : string;
  }

  export interface LocationUpdateRequestDto{
    floor?: string;
    hall? : string;
    section? : string;
    displayType? : DisplayType |'';
    note? : string;
    
  }