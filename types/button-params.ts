import type { HtmlType } from "enums/html-type";
import {Colors} from "../enums/colors";

export interface ButtonParams {
    buttonContent: string;
    buttonType: HtmlType;
    name: string;
    onClickFunction?: () => any;
    styles: {
        bg_color: Colors;
        bg_hover: Colors;
        font_color: Colors;
    }
}
