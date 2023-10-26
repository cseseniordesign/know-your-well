const samlify = require('samlify') ;
const fs = require('fs');
const validator = require('@authenio/samlify-node-xmllint');

samlify.setSchemaValidator(validator);

// Configure identity provider from metadata, currently using https://samltest.id/ as idp
const idp = samlify.IdentityProvider({
    metadata: fs.readFileSync(__dirname + '/../metadata/testidp.xml'),
    wantLogoutRequestSigned: true
});

// Configure service provider from this app's metadata
const sp = samlify.ServiceProvider({
    metadata: fs.readFileSync(__dirname + '/../metadata/sp.xml')
});

// Creates idp and sp objects
const assignEntity = (req, res, next) => {
    req.idp = idp;
    req.sp = sp;

    return next();
};

module.exports = assignEntity;

//adapted code from https://github.com/authenio/react-samlify/blob/d36744c53f979e376b6380ae5368dd1ed70172a4/middleware/index.ts