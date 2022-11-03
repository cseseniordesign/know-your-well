import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Well } from "./components/Well";
import { EditWell } from "./components/EditWell";
import { EditLog } from "./components/EditLog";
import { PreField } from "./components/PreField";
import { Field } from "./components/Field";
import { Lab } from "./components/Lab";
import { ViewWell } from "./components/ViewWell";
import { ViewField } from "./components/ViewField";
import { ViewLab } from "./components/ViewLab";





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
    {
        path: '/ViewWell',
        element: <ViewWell />
    },
    {
        path: '/ViewField',
        element: <ViewField />
    },
    {
        path: '/ViewLab',
        element: <ViewLab />
    },
];

export default AppRoutes;
