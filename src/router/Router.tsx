import { BrowserRouter } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';

export function Router() {
  return (
    <BrowserRouter>
      <PublicRoutes />
    </BrowserRouter>
  );
}
