Object.declare('base.widget.notifier.Mediator');

base.widget.notifier.Mediator = function (view)
{
    base.widget.Mediator.call(this, 'NotifierMediator', view);
}

Object.extend(base.widget.notifier.Mediator, base.widget.Mediator);

var _p = base.widget.notifier.Mediator.prototype;

_p.onRegisterInitialize = function ()
{
    this.bind('NOTIFY_MESSAGE', this._onNotifyMessage, this);
};

_p._onNotifyMessage = function (notification)
{
    var body = notification.getBody(),
        type = notification.getType();

    this.getViewComponent().showMessage(body, type);
};