import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes, { RouteOptions } from 'routes';

const renderRoutes = (routess?: RouteOptions) => {
  return (
    <>
      {Object.entries(routess ?? {}).map(([route, options]) => (
        <Route key={route} path={route} element={options.element}>
          {options.children && renderRoutes(options.children)}
        </Route>
      ))}
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>{renderRoutes(routes)}</Routes>
    </BrowserRouter>
  );
};

export default App;
