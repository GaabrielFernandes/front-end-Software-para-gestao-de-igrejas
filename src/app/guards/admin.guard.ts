import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const adminGuard: CanMatchFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const departamento = localStorage.getItem('departamento');

  if (!token || token === 'null') {
    return router.parseUrl('/login');
  }

  if (departamento === 'ADMINISTRADOR') {
    return true;
  }

  return router.parseUrl('/dashboard');
};
