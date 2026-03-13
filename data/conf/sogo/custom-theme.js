/* EXAMPLE - EXAMPLE - EXAMPLE - EXAMPLE - EXAMPLE - EXAMPLE - EXAMPLE
(function() {
  'use strict';
  angular.module('SOGo.Common')
    .config(configure)

  configure.$inject = ['$mdThemingProvider'];
  function configure($mdThemingProvider) {
    var greyMap = $mdThemingProvider.extendPalette('grey', {
      '200': 'F5F5F5',
      '300': 'E5E5E5',
      '1000': '4C566A'
    });
    var greenCow = $mdThemingProvider.extendPalette('green', {
      '600': 'E5E5E5'
    });
    $mdThemingProvider.definePalette('frost-grey', greyMap);
    $mdThemingProvider.definePalette('green-cow', greenCow);
    $mdThemingProvider.theme('default')
      .primaryPalette('green-cow', {
        'default': '400',
        'hue-1': '400',
        'hue-2': '600',
        'hue-3': 'A700'
      })
      .accentPalette('green', {
        'default': '600',
        'hue-1': '300',
        'hue-2': '300',
        'hue-3': 'A700'
      })
      .backgroundPalette('frost-grey');
    $mdThemingProvider.generateThemesOnDemand(false);
  }
})();
 */



//--- This is a simple example kept for archive
// Only switching to a specific palette without changing anything else
// Material doc adapted for for SOGo
// https://material.angularjs.org/latest/Theming/03_configuring_a_theme#configuring-a-theme
/*
(function() {
  'use strict';
  angular.module('SOGo.Common')
    .config(configure)

  configure.$inject = ['$mdThemingProvider'];
  function configure($mdThemingProvider) {

    // Pick a color pallete: 'indigo', 'teal', 'cyan', 'blue', 'light-freen' etc.
    // https://m1.material.io/style/color.html#color-color-palette
    var predominant_color = 'blue-grey'

    $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('blue');

    $mdThemingProvider.generateThemesOnDemand(false);
  }
})();
*/



//--- Galae specific colors
(function() {
  'use strict';
  angular.module('SOGo.Common')
    .config(configure)

  configure.$inject = ['$mdThemingProvider'];
  function configure($mdThemingProvider) {

    // define Galae palette from SOGo "sogo-blue"
    const GALAE_LOGO_LIGHT = '219ebc';
    const GALAE_LOGO_MEDIUM = '4faacb'; // not in the Galae logo but between DARK and LIGHT
    const GALAE_LOGO_DARK = '8ecae6';
    var algooBlue = $mdThemingProvider.extendPalette('sogo-blue', {
      '100': GALAE_LOGO_DARK,
      '200': GALAE_LOGO_MEDIUM,
      '500': GALAE_LOGO_LIGHT,
      '600': GALAE_LOGO_LIGHT,
      '700' : 'ffffff',
    });
    $mdThemingProvider.definePalette('algoo-blue', algooBlue);

    // Pick a color palette: 'indigo', 'teal', 'cyan', 'blue', 'light-freen' etc.
    // https://m1.material.io/style/color.html#color-color-palette
    // SOGo defines some more palettes : sogo-blue, sogo-green, sogo-grey
    // See /usr/lib/GNUstep/SOGo/WebServerResources/js/Common.js
    var predominant_color = 'algoo-blue';

    $mdThemingProvider.theme('default')
      .primaryPalette(predominant_color, {
        'default': '200',  // background color of top toolbars
        'hue-1':   '100',  // week numbers in calendar
        'hue-2':   '100',  // background color of sidebar toolbar (user name and email)
        'hue-3':   '200',
      })
      .accentPalette(predominant_color, {
        'default': '100',  // background color of fab buttons and login screen
        'hue-1':   '700',  // background color of center list toolbar
        'hue-2':   '200',  // highlight color for selected mail and current day calendar
        'hue-3':   '500',  // new mail button hover color
      });

    $mdThemingProvider.generateThemesOnDemand(false);
  }
})();
