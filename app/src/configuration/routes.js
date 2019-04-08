import loadable from '@loadable/component';
import '@tg-resources/fetch-runtime';
import { buildUrlCache, RenderChildren, resolvePath } from 'tg-named-routes';

import App from 'containers/AppShell';
import PageNotFound from 'views/PageNotFound';

import obtainTokenWatcher from 'sagas/auth/obtainTokenSaga';
import logoutWorker from 'sagas/auth/logoutSaga';
import createParrotWatcher from 'sagas/parrots/createParrot';
import deleteParrotWatcher from 'sagas/parrots/deleteParrot';
import fetchUserParrots from 'sagas/parrots/fetchUserParrots';
import activateLanguage from 'sagas/user/activateLanguage';
import fetchUserDetails from 'sagas/user/fetchUserDetails';
import signupWatcher from 'sagas/auth/signupSaga';
import forgotPasswordWatcher from 'sagas/auth/forgotPasswordSaga';
import resetPasswordWatcher from 'sagas/auth/resetPasswordSaga';

const CreateParrot = loadable(() => import('views/CreateParrot'));
const ParrotsList = loadable(() => import('views/ParrotsList'));

const Home = loadable(() => import('views/Home'));

const LoginView = loadable(() => import('views/auth/Login'));
const SignupView = loadable(() => import('views/auth/Signup'));
const ForgotPasswordView = loadable(() => import('views/auth/ForgotPassword'));
const ResetPasswordView = loadable(() => import('views/auth/ResetPassword'));


const NotFoundRoute = {
    name: '404',
    path: '*',
    component: PageNotFound,
};

const routes = [
    {
        component: App,
        initial: [
            fetchUserDetails,
        ],
        watcher: [
            activateLanguage,
        ],
        routes: [
            {
                path: '/',
                exact: true,
                name: 'landing',
                component: Home,
            },
            {
                path: '/auth',
                name: 'auth',
                component: RenderChildren,
                routes: [
                    {
                        path: '/auth/login',
                        exact: true,
                        name: 'login',
                        component: LoginView,
                        watcher: obtainTokenWatcher,
                    },
                    {
                        path: '/auth/signup',
                        exact: true,
                        name: 'signup',
                        component: SignupView,
                        watcher: signupWatcher,
                    },
                    {
                        path: '/auth/forgot-password',
                        exact: true,
                        name: 'forgot-password',
                        component: ForgotPasswordView,
                        watcher: forgotPasswordWatcher,
                    },
                    {
                        path: '/auth/reset-password/:token',
                        exact: true,
                        name: 'reset-password',
                        component: ResetPasswordView,
                        watcher: resetPasswordWatcher,
                    },
                    {
                        path: '/auth/logout',
                        exact: true,
                        name: 'logout',
                        component: () => null,
                        initial: logoutWorker,
                    },
                    NotFoundRoute,
                ],
            },
            {
                path: '/parrots/create',
                exact: true,
                name: 'create-parrots',
                component: CreateParrot,
                watcher: [
                    createParrotWatcher,
                ],
            },
            {
                path: '/parrots/',
                exact: true,
                name: 'parrots-list',
                component: ParrotsList,
                initial: [
                    fetchUserParrots,
                ],
                watcher: [
                    deleteParrotWatcher,
                ],
            },
            NotFoundRoute,
        ],
    },
];


buildUrlCache(routes);


/**
 * Resolve url name to valid path.
 *   Also known as `resolveUrl` or `reverseUrl`.
 *
 * Providing query string can be done with object or string.
 * Caveat with string is that it should be formatted correctly e.g `foo=bar` or `foobar`
 *
 * @param name URL name
 * @param [kwargs=null] URL parameters
 * @param [query=null] URL query string
 * @param [state=null] URL state object to pass to next url
 * @returns URL matching name and kwargs
 */
export const urlResolve = resolvePath;

export default routes;
