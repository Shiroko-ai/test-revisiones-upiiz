export type ButtonType = "submit" | "reset" | "button";
export interface Action {
    value: string;
    type: ButtonType;
    url?: string;
    onClick?: () => void;
}