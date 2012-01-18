Object.declare('base.widget.Mediator');

base.widget.Mediator = function (mediatorName, view)
{
    org.puremvc.js.patterns.mediator.Mediator.call(this, mediatorName, view);

    this._notificationInterests = [];
    this._notificationHandlers = {};
}

Object.extend(base.widget.Mediator, org.puremvc.js.patterns.mediator.Mediator);

var _p = base.widget.Mediator.prototype;

_p.bind = function (eventName, callback, scope)
{
    scope = scope || this;

    if (this._notificationInterests.indexOf(eventName) === -1) {
        this._notificationInterests[this._notificationInterests.length] = eventName;
    }

    this._notificationHandlers[eventName] = Relegate.create(scope, callback);
};

_p.unbind = function (eventName)
{
    var eventIndex = this._notificationInterests.indexOf(eventName);

    if (eventIndex !== -1) {
        this._notificationInterests.splice(eventIndex, 1);

        this._notificationHandlers[eventName] = null;
        delete this._notificationHandlers[eventName];
    }
};

_p.listNotificationInterests = function ()
{
    return this._notificationInterests;
};

_p.handleNotification = function (notification)
{
    var notificationName = notification.getName();

    if (typeof this._notificationHandlers[notificationName] !== "undefined") {
        this._notificationHandlers[notificationName](notification);
    }
};