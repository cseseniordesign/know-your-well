import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Well } from "./components/Well";



const AppRoutes = [
  {
    index: true,
    element: <Login />
    },
    {
    path: '/Signup',
    element: <Signup />
    },
    {
    path: '/Well',
    element: <Well />
    },

];

export default AppRoutes;
