import { type ReactNode } from "react";
import { Link } from "wouter";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> <Link to="/stories">Info</Link>
      </nav>
      <main className="box-border flex h-screen w-screen flex-col gap-8">{children}</main>
    </>
  );
};

export default Layout;
