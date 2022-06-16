import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-center pt-5">
        <nav>
          <Link to="/" className="font-medium text-5xl">
            Zoo
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Layout;
