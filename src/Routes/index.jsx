
import LayoutDefault from '../Components/Layout/LayoutDefault';
import LayoutService from '../Components/Layout/LayoutService';
import LayoutIntroduce from '../Components/Layout/LayoutIntroduce';
import LayoutBookNow from './../Components/Layout/LayoutBookNow/index';
import LayoutLookUp from './../Components/Layout/LayoutLookup/index';
import LayoutContact from './../Components/Layout/LayoutContact/index';
import Error from '../Components/Layout/Page/Error';

export const routes = [
  {
    path: '/',
    element: <LayoutDefault />,

  },
  
  {
    path: '/service',
    element: <LayoutService />,
  },
  {
    path: '/introduce',
    element: <LayoutIntroduce />,
  },
  {
    path: '/contact',
    element: <LayoutContact />,
  },
  {
    path: '/lookup',
    element: <LayoutLookUp />,
  },
  {
    path: '/booknow',
    element: <LayoutBookNow />,
  },
  {
    path: '*',
    element: <Error/>,
  }
];

