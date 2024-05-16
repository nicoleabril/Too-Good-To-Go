import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/breadcrumb.css';

function DynamicBreadcrumb() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const handleLinkClick = (e, isLast) => {
    e.preventDefault(); // Previene la navegación por defecto
    if (!isLast) {
      navigate(-1); // Navega a la página anterior si no es el último elemento
    }
  };

  return (
    <Breadcrumb aria-label="breadcrumb" className="custom-breadcrumb">
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={name}>
            <Breadcrumb.Item
              linkAs={!isLast ? Link : undefined}
              linkProps={{
                to: routeTo,
                onClick: (e) => handleLinkClick(e, isLast)
              }}
              active={isLast}
            >
              {name} &gt;
            </Breadcrumb.Item>
          </React.Fragment>
        );
      })}
    </Breadcrumb>
  );
}

export default DynamicBreadcrumb;
