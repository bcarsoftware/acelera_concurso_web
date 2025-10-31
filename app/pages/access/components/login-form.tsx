import type {ChildrenElement} from "~/pages/access/components/children-element";

export const LoginForm = ({ children }: ChildrenElement) => {
    return (<form>{children}</form>);
};
