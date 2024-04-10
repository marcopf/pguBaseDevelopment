import { FormControl } from "@angular/forms";

export type FormControlObjectType = {
    [key: string]: FormControl;
}

export type DynamicFormType = {
    id: string,
    label: string,
    type: string,
    required: boolean
    options?: string [] | undefined,
    controls?: string[],
    value: string,
    disabled: boolean
}

export type GenericObject = {
    [key:string]: any
}
  
export type Pagination = {
    size: number,
    page: number,
    totalElements: number,
    numberOfPages: number,
    retrievedElements: number
}

export type TableConfig = {
    incomingDataLink: string | null;
    outgoingDataLink: string | null;
    type: "link" | "button" | null;
    text: string | null,
    hasCheckBox: boolean
}

export type AllLanguages = {
    [key: string]: GenericObject
  }