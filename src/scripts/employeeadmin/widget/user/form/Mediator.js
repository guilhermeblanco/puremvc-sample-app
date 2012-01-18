Object.declare('employeeadmin.widget.user.form.Mediator');

employeeadmin.widget.user.form.Mediator = function (view)
{
    base.widget.Mediator.call(this, 'UserAddMediator', view);
}

Object.extend(employeeadmin.widget.user.form.Mediator, base.widget.Mediator);

var _p = employeeadmin.widget.user.form.Mediator.prototype;

_p.onRegisterInitialize = function ()
{
    this.bind('USER_ADD', this._onUserAdd, this);
    this.bind('USER_ADD_ERROR', this._onUserAddError, this);
    this.bind('USER_ADD_SUCCESS', this._onUserAddSuccess, this);
};

_p._onUserAdd = function (notification)
{
    var entityProxy = this.getFacade().retrieveProxy('User'),
        entity      = notification.getBody();

    entityProxy.post(entity);
};

_p._onUserAddError = function (notification)
{
    var message = 'There was an error adding User';

    this.getFacade().sendNotification('NOTIFY_MESSAGE', message, 'error');
};

_p._onUserAddSuccess = function (notification)
{
    var viewComponent = this.getViewComponent(),
        message = 'User added successfully';

    this.getFacade().sendNotification('NOTIFY_MESSAGE', message, 'success');

    viewComponent.resetForm();
};