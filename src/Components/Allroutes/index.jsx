import { useRoutes } from "react-router-dom";
import { routes } from './../../Routes/index';
import ScrollToTop from './../ScrollToTop/index';

export default function AllRoutes() {
  const element = useRoutes(routes);

  return (
    <>
      <ScrollToTop />
      {element}
    </>
  );
}
