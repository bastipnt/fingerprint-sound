import { type ReactNode } from "react";
import { Link } from "wouter";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <nav className="fixed top-0 left-0 flex flex-row gap-2 p-2 backdrop-blur-sm">
        <Link to="/" className={(active) => (active ? "active" : "")}>
          Home
        </Link>{" "}
        |
        <Link to="/stories" className={(active) => (active ? "active" : "")}>
          Info
        </Link>
      </nav>
      <main className="box-border flex h-screen w-screen flex-col gap-8">{children}</main>
    </>
  );
};

export default Layout;
