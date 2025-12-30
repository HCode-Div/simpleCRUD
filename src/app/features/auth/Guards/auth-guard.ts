import { AuthServices } from './../services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _authServices = inject(AuthServices);
  const id = inject(PLATFORM_ID);
  const _router = inject(Router);

  if (isPlatformBrowser(id)) {
    if (_authServices.isLoggedIn()) {
      return true;
    } else {
      _router.navigate(['/login']);
      return false;
    }
  } else {
    return false;
  }
};
