import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return <main className="box-border flex h-screen w-screen flex-col gap-8">{children}</main>;
};

export default Layout;
