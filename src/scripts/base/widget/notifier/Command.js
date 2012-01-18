Object.declare('base.widget.notifier.Command');

base.widget.notifier.Command = function ()
{
    base.widget.Command.call(this);
};

Object.extend(base.widget.notifier.Command, base.widget.Command);

var _p = base.widget.notifier.Command.prototype;

_p.execute = function (notification)
{
    var $document = notification.getBody(),
        $component,
        viewComponent,
        mediator;

    // Create async-alerts if not present (developers sometimes are lazy! =P)
    if ( ! $document.find("#async-alerts").length) {
        $document.find('body').append('<ul id="async-alerts" class="ninja"></ul>');
    }

    $component    = $document.find("#async-alerts");
    viewComponent = new base.widget.notifier.ViewComponent($component);
    mediator      = new base.widget.notifier.Mediator(viewComponent);

    this.getFacade().registerMediator(mediator);
};