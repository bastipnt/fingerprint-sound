import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => <main>{children}</main>;

export default Layout;
