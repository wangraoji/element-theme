import router from './router'
import store from './store'
import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
let NProgress = require("nprogress");
import 'nprogress/nprogress.css' // progress bar style



const whiteList = ['/login'] // no redirect whitelist
NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()

    // 判断有没有topken
    const hasToken = store.getters.token;
    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            // NProgress.done()
        } else {
            next()
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            // next(`/login?redirect=${to.path}`)
            next({ path: '/login' })
            // console.log(2);
            // NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})



