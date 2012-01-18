Object.declare('base.widget.EntityProxy');

base.widget.EntityProxy = function (proxyName, data)
{
    org.puremvc.js.patterns.proxy.Proxy.call(this, proxyName, data);
};

Object.extend(base.widget.EntityProxy, org.puremvc.js.patterns.proxy.Proxy);

var _p = base.widget.EntityProxy.prototype;

_p.filter = function (criteria, callbacks)
{
    // Prepare an AJAX request here

    return this._executeRequest('FILTER', criteria, callbacks);
};

_p.get = function (id, callbacks)
{
    // Prepare an AJAX request here

    return this._executeRequest('RETRIEVE', id, callbacks);
};

_p.remove = function (id, callbacks)
{
    // Prepare an AJAX request here

    return this._executeRequest('REMOVE', id, callbacks);
};

_p.post = function (data, callbacks)
{
    // Prepare an AJAX request here

    return this._executeRequest('ADD', data, callbacks);
};

_p.put = function (data, callbacks)
{
    // Prepare an AJAX request here

    return this._executeRequest('UPDATE', data, callbacks);
};

_p._executeRequest = function (notificationAction, data, callbacks)
{
    var proxyNameUpperCased = this.getProxyName().toUpperCase(),
        facade              = this.getFacade();

    notificationAction = proxyNameUpperCased + '_' + notificationAction;

    // Make AJAX request here

    return (function ()
    {
        var body = {
            response: data
        };

        if (callbacks && typeof callbacks['success'] === 'function') {
            callbacks.success(body);
        }

        facade.sendNotification(notificationAction + '_SUCCESS', body, 'success');
    })();
};