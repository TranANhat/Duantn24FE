import { useRoutes } from "react-router-dom";
import { routes } from './../../Routes/index';
import ScrollToTop from './../ScrollToTop/index';
import ErrorBoundary from './ErrorBoundary.jsx';  // Import ErrorBoundary
export default function AllRoutes() {
  const element = useRoutes(routes);

  return (
    <ErrorBoundary>
      <ScrollToTop />
      {element}
      </ErrorBoundary>
  );
}
