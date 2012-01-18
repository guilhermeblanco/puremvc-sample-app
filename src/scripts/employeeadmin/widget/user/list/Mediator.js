Object.declare('employeeadmin.widget.user.list.Mediator');

employeeadmin.widget.user.list.Mediator = function (view)
{
    base.widget.Mediator.call(this, 'UserListMediator', view);
}

Object.extend(employeeadmin.widget.user.list.Mediator, base.widget.Mediator);

var _p = employeeadmin.widget.user.list.Mediator.prototype;

_p.onRegisterInitialize = function ()
{
    this.bind('USER_ADD_SUCCESS', this._onUserAddSuccess, this);

    this.bind('USER_REMOVE', this._onUserRemove, this);
    this.bind('USER_REMOVE_ERROR', this._onUserRemoveError, this);
    this.bind('USER_REMOVE_SUCCESS', this._onUserRemoveSuccess, this);
};

_p._onUserAddSuccess = function (notification)
{
    var viewComponent = this.getViewComponent(),
        user          = notification.getBody().response.user;

    viewComponent.addUser(user);
};

_p._onUserRemove = function (notification)
{
    var userProxy = this.getFacade().retrieveProxy('User'),
        user      = notification.getBody();

    userProxy.remove(user.name);
};

_p._onUserRemoveError = function (notification)
{
    var body    = notification.getBody(),
        message = 'There was an error removing user. Please try again.';

    this.getFacade().sendNotification('SHOW_UI_MESSAGE', message, 'error');
};

_p._onUserRemoveSuccess = function (notification)
{
    var body    = notification.getBody(),
        user    = body.response,
        message = 'The <strong>user was successfully removed</strong>.';

    this.getFacade().sendNotification('SHOW_UI_MESSAGE', message, 'success');

    this.getViewComponent().removeUser(user);
};