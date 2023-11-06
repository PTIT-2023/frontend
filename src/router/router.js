import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import localStorageHelper from '../helpers/localStorageHelper';

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: routes
})

router.beforeEach((to, from, next) => {
  return guardRoute(to, from, next);
});

// Function responsible to check if user is authenticated or not
function guardRoute(to, from, next) {
  if (!localStorageHelper.isUserAuthenticated()) {
    // Case where user is not logged
    console.log("auth::guardRoute() NOT authenticated for route:", to.name);

    if (to.name === "signin" || to.name === "signup" || to.name === "forgot" || to.name === "reset") {
      // user is not logged so signin and signup routes are availables
      next();
    } else {
      // all others routes are redirected to signin
      next("/signin");
    }
  } else {
    // There is a jwt token, user is logged
    console.log("auth::guardRoute() user is logged: ", to.name);

    // User is logged so signin and signup routes are not availables and redirected to home page
    if (to.name === "signin" || to.name === "signup" || to.name === "forgot" || to.name === "reset") {
      next('/')
    } else {
      // All others routes are availables
      next();
    }
  }
}

export default router
