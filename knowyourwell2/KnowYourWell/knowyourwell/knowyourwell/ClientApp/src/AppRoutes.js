import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Well } from "./components/Well";
import { EditWell } from "./components/EditWell";
import { EditLog } from "./components/EditLog";
import { PreField } from "./components/PreField";
import { Field } from "./components/Field";
import { Lab } from "./components/Lab";






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
    {
    path: '/EditWell',
    element: <EditWell />
    },
    {
        path: '/EditLog',
        element: <EditLog />
    },
    {
        path: '/PreField',
        element: <PreField />
    },
    {
        path: '/Field',
        element: <Field />
    },
    {
        path: '/Lab',
        element: <Lab />
    },

];

export default AppRoutes;
