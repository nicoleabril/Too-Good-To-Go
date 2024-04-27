import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import '../styles/breadcrumb.css'
function DynamicBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumb aria-label="breadcrumb" className="custom-breadcrumb">
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const separator = isLast ? null : <span className="separator">&#9658;</span>; // Flecha hacia la derecha
  
        return (
          <React.Fragment key={name}>
            <Breadcrumb.Item
              linkAs={isLast ? Link : undefined}
              linkProps={isLast ? { to: routeTo } : undefined}
              active={isLast}
            >
              {name}
            </Breadcrumb.Item>
            {separator}
          </React.Fragment>
        );
      })}
    </Breadcrumb>
  );
  
  
}

export default DynamicBreadcrumb;
