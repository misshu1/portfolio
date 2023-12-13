import { Route, Routes as BrowserRoutes } from 'react-router-dom';
import { Routes } from './Routes';
import { Home } from '../pages';

export function PublicRoutes() {
  return (
    <BrowserRoutes>
      <Route path={Routes.HOME} element={<Home />}>
        <Route path={Routes.CONTACT} element={<div>Routes.CONTACT</div>} />
        <Route path={Routes[401]} element={<div>Routes[401]</div>} />
        <Route path={Routes[500]} element={<div>Routes[500]</div>} />
        <Route path={Routes[404]} element={<div>Routes[404]</div>} />
      </Route>
    </BrowserRoutes>
  );
}
