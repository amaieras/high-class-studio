var highclassApp = angular.module("highclassApp", ["ngRoute", "ui.bootstrap", "ui.bootstrap.datetimepicker", "firebase", "firebase.ref", "firebase.auth"]).config(["$routeProvider", "SECURED_ROUTES", function(a, b, c) {
    a.whenAuthenticated = function(c, d) {
        return d.resolve = d.resolve || {}, d.resolve.user = ["Auth", function(a) {
            return a.$requireSignIn()
        }], a.when(c, d), b[c] = !0, a
    }
}]).config(["$routeProvider", function(a) {
    a.when("/", {
        templateUrl: "templates/app/index.html",
        controller: "AppController"
    }).whenAuthenticated("/programari", {
        templateUrl: "admin/programari/index.html",
        controller: "AppointmentController",
        controllerAs: "appointCtrl"
    }).when("/login", {
        templateUrl: "templates/login/index.html",
        controller: "LoginController",
        controllerAs: "loginCtrl"
    }).when("/faq", {
        templateUrl: "templates/faq/index.html",
        controller: "AppController"
    // }).when("/partners", {
    //     templateUrl: "templates/partners/index.html",
    //     controller: "AppController"
    }).when("/contact", {
        templateUrl: "templates/contact/index.html"
    }).when("/photo-gallery", {
        templateUrl: "templates/photo-gallery/index.html"
    }).when("/video-gallery", {
        templateUrl: "templates/video-gallery/index.html"
    }).when("/terms-of-service", {
        templateUrl: "templates/terms-of-service/index.html"
    }).otherwise({
        redirectTo: "/"
    })
}]).run(["$rootScope", "$location", "Auth", "SECURED_ROUTES", "loginRedirectPath", function(a, b, c, d, e) {
    a.$on("$routeChangeError", function(a, c, d, f) {
        "AUTH_REQUIRED" === f && b.path(e)
    }), a.$on("$routeChangeSuccess", function(a, b, c) {
        window.scrollTo(0, 0)
    })
}]).constant("SECURED_ROUTES", {});
