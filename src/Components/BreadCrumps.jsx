import { Link, useLocation } from "react-router-dom";

function BreadCrumps() {
  const location = useLocation();
  const currentLink = [];

  const crumbs = location.pathname
    .split("/")
    .filter(Boolean)
    .map((crumb, index, array) => {
      currentLink.push("/");
      const path = currentLink.join("");

      return (
        <div className="crumb" key={crumb}>
          <Link to={path}>{crumb}</Link>
          {index < array.length - 1 && <span className="separator"> > </span>}
        </div>
      );
    });

  return <div className="breadcrumbs flex gap-2 my-5"> {crumbs} </div>;
}

export default BreadCrumps;
