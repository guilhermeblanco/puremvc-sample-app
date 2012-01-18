Object.declare('base.ApplicationFacade');

base.ApplicationFacade = function ()
{
    org.puremvc.js.patterns.facade.Facade.call(this);

    this._token = null;
};

Object.extend(base.ApplicationFacade, org.puremvc.js.patterns.facade.Facade);

var _p = base.ApplicationFacade.prototype;

_p.startup = function (body)
{
    this.sendNotification('startup', body);
};