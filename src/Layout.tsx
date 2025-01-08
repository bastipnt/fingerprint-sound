import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <main className="box-border flex w-screen flex-col items-center justify-center gap-8 p-8">
      {children}
    </main>
  );
};

export default Layout;
