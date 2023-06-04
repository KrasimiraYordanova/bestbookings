function hasUser() {
    return (req, res, next) => {
        if(req.user != undefined) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    };
}
 
function isGuest() {
    return (req, res, next) => {
        if(req.user != undefined) {
            res.redirect('/');
        } else {
            next();
        }
    };
}

function hasRole(role) {
    return (req, res, next) => {
        if(req.user == undefined || req.user.roles.includes(role) == false) {
            res.redirect('/login');
        } else {
            next();
        }
    };
}
// function hasRole(role) {
//     return (req, res, next) => {
//         if(req.user == undefined) {
//             return res.status(401).redirect('/login');
//         }
//         if(req.user.roles.includes(role) == false) {
//             return res.status(403).redirect('/login');
//         }
//         next();
//     };
// }

module.exports = {
    hasUser,
    isGuest
}