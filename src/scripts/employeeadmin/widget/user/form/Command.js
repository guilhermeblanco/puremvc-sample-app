Object.declare('employeeadmin.widget.user.form.Command');

employeeadmin.widget.user.form.Command = function ()
{
    base.widget.Command.call(this);
};

Object.extend(employeeadmin.widget.user.form.Command, base.widget.Command);

var _p = employeeadmin.widget.user.form.Command.prototype;

_p.execute = function (notification)
{
    var $document     = notification.getBody(),
        viewComponent = new employeeadmin.widget.user.form.ViewComponent($document.find('#user-add')),
        mediator      = new employeeadmin.widget.user.form.Mediator(viewComponent);

    // Since proxies may be used by mediators, they are registered first
    // Here I should have a Factory for EntityProxies, avoiding duplications
    this._facade.registerProxy(
        new base.widget.EntityProxy('User', { endpoint: '/rest/v1/user/' })
    );

    this._facade.registerMediator(mediator);
};