var popup;


function popupManager() {
  this.default_colors = {
    'freeShippingUnder49': '#f1f1f1',
    'freeShippingAbove49': '#f1f1f1',
    'paidShipping': false,
    'noShipping': false,
  };

  this.init();
}

popupManager.prototype = {
  init: function () {
    this.getAllSettings();

    $('section.settings .options select').on('change', function () {
      $(this).parent().find('div.color').css('background-color', this.value);
      var name = this.name;
      var value = {
        'bg': this.value,
        'text': ($(this).find(':selected').data('text')) ? true : false,
      };
      var save = {};
      save[name] = value;
      chrome.storage.sync.set(save);
    });
    
    $('section.settings .options input.onoffswitch-checkbox').on('change', function () {
      var name = this.id;
      var value = {
        'enabled': $(this).is(':checked')
      };
      var save = {};
      save[name] = value;
      chrome.storage.sync.set(save);
    });
  },

  getAllSettings: function () {
    var __this = this;
    $('section.settings .options select').each(function () {
      var name = this.name,
        _this = $(this);
      chrome.storage.sync.get(name, function (obj) {
        var bg_color = null, text_color = null;
        console.log(obj);
        if (obj[name]) {
          bg_color = obj[name].bg;
          text_color = obj[name].text;
        } else {
          bg_color = __this.default_colors[name];
        }
        console.log('bg_color = '+bg_color);
        if (obj) {
          _this.find('option[value="' + bg_color + '"]').prop('selected', true);
          if (bg_color) {
            var color = (text_color) ? '#ffffff' : '';
            _this.parent().find('div.color').css({ 'background-color': bg_color, 'color': color });
          }
        }
      });
    });

    
			var settings_tracking_orders_name = 'tracking_information_orders_page';

      chrome.storage.sync.get(settings_tracking_orders_name, function (obj) {
        try {
          if(obj[settings_tracking_orders_name]) {
            console.log('tracking history: '+obj[settings_tracking_orders_name].enabled);
            if(obj[settings_tracking_orders_name].enabled != true) {
              $('#'+settings_tracking_orders_name).prop('checked',false);
            }
          }
        } catch(e) {
  
        }
      });
  }
};




$(document).ready(function () {
  popup = new popupManager();
});
