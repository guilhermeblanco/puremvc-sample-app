Object.declare('base.widget.ViewComponent');

base.widget.ViewComponent = function (component)
{
    org.puremvc.js.patterns.observer.Notifier.call(this);

    this._component = component;
}

Object.extend(base.widget.ViewComponent, org.puremvc.js.patterns.observer.Notifier);

var _p = base.widget.ViewComponent.prototype;

_p.getComponent = function ()
{
    return this._component;
};