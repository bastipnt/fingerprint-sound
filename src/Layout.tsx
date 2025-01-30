import { type ReactNode } from "react";
import { Link } from "wouter";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <nav className="text-surface fixed top-0 left-0 flex flex-row gap-2 p-4">
        <Link to="/" className={(active) => (active ? "active" : "")}>
          Home
        </Link>{" "}
        |
        <Link to="/stories" className={(active) => (active ? "active" : "")}>
          Info
        </Link>
      </nav>
      <main className="box-border flex h-screen w-screen flex-col items-center gap-8">
        {children}
      </main>
    </>
  );
};

export default Layout;
