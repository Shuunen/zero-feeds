// Generated by CoffeeScript 1.7.1
var Param,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Param = require('../models/zfparam');

module.exports.all = function(req, res) {
  return Param.all(function(err, params) {
    var errorMsg, found, newParam, newParams, param, paramName, paramsNames, _i, _j, _k, _len, _len1, _len2, _ref;
    if (err != null) {
      console.log(err);
      errorMsg = "Server error occured while retrieving data.";
      return res.send({
        error: true,
        msg: errorMsg
      });
    } else {
      paramsNames = ["cozy-bookmarks-name", "show-new-links"];
      for (_i = 0, _len = params.length; _i < _len; _i++) {
        param = params[_i];
        if (!(_ref = param.paramId, __indexOf.call(paramsNames, _ref) >= 0)) {
          param.destroy();
        }
      }
      if (params.length < paramsNames.length) {
        newParams = [];
        for (_j = 0, _len1 = paramsNames.length; _j < _len1; _j++) {
          paramName = paramsNames[_j];
          found = false;
          for (_k = 0, _len2 = params.length; _k < _len2; _k++) {
            param = params[_k];
            if (param.name === paramsNames) {
              found = true;
              newParams.push(param);
            }
          }
          if (!found) {
            if (paramName === "cozy-bookmarks-name") {
              newParam = new Param({
                paramId: "cozy-bookmarks-name",
                name: "Cozy bookmarks application name",
                value: ""
              });
            } else {
              newParam = new Param({
                paramId: "show-new-links",
                name: "Display only new links",
                value: true
              });
            }
            Param.create(newParam);
            newParams.push(newParam);
          }
        }
        return res.send(newParams);
      } else {
        return res.send(params);
      }
    }
  });
};

module.exports.update = function(req, res) {
  console.log(req.params);
  return Param.find(req.params.id, function(err, param) {
    console.log(param);
    if ((err != null) || (param == null)) {
      return res.send({
        error: true,
        msg: "Param not found"
      }, 404);
    } else {
      ['value'].forEach(function(field) {
        if (field === 'value') {
          if (req.body[field] != null) {
            return param[field] = req.body[field];
          }
        }
      });
      return param.update(req.params, function(err) {
        if (err) {
          console.log(err);
          return res.send({
            error: 'Cannot update param'
          }, 500);
        } else {
          return res.send(param);
        }
      });
    }
  });
};
