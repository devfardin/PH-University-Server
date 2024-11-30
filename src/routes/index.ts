import { Router } from 'express';
import { UserRouters } from '../modules/user/user.route';
import { StudentRoute } from '../modules/student/student.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouters,
  },
  {
    path: '/students',
    route: StudentRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
