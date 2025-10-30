import type {ChildrenElement} from "~/pages/access/components/children-element";
import {Colors} from "../../../../enums/colors";

export const LoginForm = ({ children }: ChildrenElement) => {
    return (<form>{children}</form>);
};
