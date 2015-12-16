'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Diseases Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/diseases',
      permissions: '*'
    }, {
      resources: '/api/diseases/:diseaseId',
      permissions: '*'
    }]
  }, {

    //User permissions are set to '*' due to the definition of users having admin defined as a boolean
    roles: ['user'],
    allows: [{
      resources: '/api/diseases',
      permissions: '*'
    }, {
      resources: '/api/diseases/:diseaseId',
      permissions: '*'
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/diseases',
      permissions: ['get']
    }, {
      resources: '/api/diseases/:diseaseId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Diseases Policy Allows
 */
exports.isAllowed = function (req, res, next) {

  var roles = (req.user) ? req.user.roles : ['guest'];


  // If a disease is being processed and the current user created it then allow any manipulation
  if (req.disease && req.disease.id === req.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred.
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
