const passportJwt = require('passport-jwt');
const ExtractJwt  = passportJwt.ExtractJwt;

let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'myN3wsFInaLPr0j3ct';

module.exports = jwtOptions;
