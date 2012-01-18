(function($) {
    $.fn.serializeJSON = function () {
        var serialized = $(this).serializeArray(),
            json = {},
            i, iLength, matches, j, jLength,
            curScope, key;

        for (i = 0, iLength = serialized.length; i < iLength; i++) {
            matches   = serialized[i]['name'].match(/([^\[\]\s]+)|(\[\])/g);
            curScope  = json;

            for (j = 0, jLength = matches.length; j < jLength; j += 1) {
                key = matches[j];

                if (key === '[]') {
                    key = curScope.length;
                }

                if (j === jLength - 1) {
                    break;
                }

                if (typeof curScope[key] === 'undefined') {
                    curScope[key] = (matches[j + 1] === '[]' || /^[0-9]+$/.test(matches[j + 1])) ? [] : {};
                }

                curScope = curScope[key];
            }

            curScope[key] = serialized[i]['value'];
        }

        return json;
    };
})(jQuery);