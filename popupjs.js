define('popupjs', ['jquery'], function ($) {
    return {
        popupContainer: null,
        popupBox: null,
        okCallback: null,
        beforeFunc: null,
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
        before: function (f) {
            if (typeof f == 'function') {
                this.beforeFunc = f;
            }
        },
        show: function (data, cb) {
            var self = this;
            if (data && self.popupBox.length > 0) {
                self.popupBox.html(data);
                if (typeof cb == 'function') {
                    self.okCallback = cb;
                } else {
                    self.popupContainer.on('click', function (e) {
                        if ($(e.target).hasClass('popup-container')) {
                            self.hide();
                        }
                    });
                }
                if (typeof self.beforeFunc == 'function') {
                    self.beforeFunc();
                }
                self.popupContainer.fadeIn();
            }
        },
        hide: function () {
            this.okCallback = null;
            this.beforeFunc = null;
            this.popupContainer.fadeOut();
            self.popupContainer.off('click');
        }
    };
});