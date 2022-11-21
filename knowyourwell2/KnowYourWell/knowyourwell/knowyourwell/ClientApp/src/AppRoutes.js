import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { AboutProject } from "./components/AboutProject";
import { Well } from "./components/Well";
import { EditWell } from "./components/EditWell";
import { EditLog } from "./components/EditLog";
import { WellInfo } from "./components/WellInfo";
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
    path: '/AboutProject',
    element: <AboutProject />
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
        path: '/WellInfo',
        element: <WellInfo />
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
