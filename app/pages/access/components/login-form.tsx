import type {ChildrenElement} from "~/pages/access/components/children-element";

export const LoginForm = ({ children }: ChildrenElement) => {
    return (<form method={"POST"}>{children}</form>);
};
