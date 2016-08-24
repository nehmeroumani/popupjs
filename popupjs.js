define('popupjs', ['jquery'], function ($) {
    return {
        popupContainer: null,
        popupBox: null,
        okCallback: null,
        init: function (selector) {
            if (selector) {
                this.popupContainer = $(selector);
                if (this.popupContainer.length > 0) {
                    this.popupBox = this.popupContainer.find('.popup-box');
                    var self = this;
                    this.popupContainer.on('click', '.close-popup', function (e) {
                        e.preventDefault();
                        self.hide(400, function () {
                            self.okCallback = null;
                            self.popupBox.html('');
                        });
                    });
                    this.popupContainer.on('click', '.ok', function (e) {
                        e.preventDefault();
                        if (typeof self.okCallback == 'function') {
                            self.okCallback(self);
                        }
                    });
                }
            }
            return this;
        },
        show: function (data, cb) {
            var self = this;
            if (data && this.popupBox.length > 0) {
                self.popupBox.html(data);
                if (typeof cb == 'function') {
                    self.okCallback = cb;
                }
                self.popupContainer.fadeIn();
            }
        },
        hide: function () {
            this.popupContainer.fadeOut();
        }
    };
});