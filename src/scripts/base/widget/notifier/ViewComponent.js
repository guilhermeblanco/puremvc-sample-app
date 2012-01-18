Object.declare('base.widget.notifier.ViewComponent');

base.widget.notifier.ViewComponent = function (component)
{
    base.widget.ViewComponent.call(this, component);
};

Object.extend(base.widget.notifier.ViewComponent, base.widget.ViewComponent);

/* @const Allowed message types */
base.widget.notifier.ViewComponent.ALLOWED_TYPES = ["success", "error", "message"];

var _p = base.widget.notifier.ViewComponent.prototype;

/* @var integer Timeout for hiding a message */
_p._hideTimeout = 5000;

/* @var integer Timeout for hiding a message after it being focused */
_p._hideTimeoutAfterFocus = 2000;

/**
 * Show a message
 *
 * @param message
 * @param type
 */
_p.showMessage = function (message, type)
{
    var $component     = this.getComponent(),
        $messageWindow;

    if ( ! $component.find("li").length) {
        $component.removeClass('ninja');
    }

    $messageWindow = this._createMessage(message, type);

    $component.prepend($messageWindow);

    $messageWindow.fadeTo(250, 0.9);
};

/**
 * Hide an specific message
 *
 * @param $messageWindow
 */
_p.hideMessage = function ($messageWindow)
{
    var $component = this.getComponent();

    clearTimeout($messageWindow.data('timer'));

    $messageWindow.slideUp(250, function() {
        $messageWindow.remove();

        if( ! $component.find("li").length) {
            $component.addClass('ninja');
        }
    });
};

/**
 * Create a message item
 *
 * @param message
 * @param type
 *
 * @return jQuery
 */
_p._createMessage = function (message, type)
{
    var $messageWindow,
        timer,
        that = this;

    if ($.inArray(type, base.widget.notifier.ViewComponent.ALLOWED_TYPES) < 0) {
        type = "message";
    }

    // Create jQuery-fied HTML portion
    $messageWindow = $("<li class='" + type + "' style='display: none;' />")
        .html(message)
        .append("<a href='#' title='Dismiss this message' class='close-bt'>Dismiss</a>");

    $messageWindow.find(".close-bt").click(function () {
        that.hideMessage($messageWindow);

        return false;
    });

    // Hiding message timeout
    timer = setTimeout(function () {
        that.hideMessage($messageWindow);
    }, that._hideTimeout);

    $messageWindow.data('timer', timer);

    // Hiding focused message timeout redefinition
    $messageWindow
        .mouseover(function () {
            clearTimeout(timer);
        })
        .mouseout(function () {
            timer = setTimeout(function() {
                that.hideMessage($messageWindow);
            }, that._hideTimeoutAfterFocus);

            $messageWindow.data('timer', timer);
        });

    return $messageWindow;
};