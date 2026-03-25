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
// Using SOGo code in UI/WebServerResources/js/Common.js
/*
(function() {
  'use strict';
  angular.module('SOGo.Common')
    .config(configure)

  configure.$inject = ['$mdThemingProvider'];
  function configure($mdThemingProvider) {
    var predominant_color = 'sogo-blue';

    $mdThemingProvider.theme('default')
      .primaryPalette(predominant_color)
      .accentPalette(predominant_color)
//      .primaryPalette(predominant_color, { default: '900', 'hue-1': '400', 'hue-2': '800', 'hue-3': 'A700' })
//      .accentPalette(predominant_color, { default: '500', 'hue-1': 'A100', 'hue-2': '300', 'hue-3': 'A700' })
      .backgroundPalette('sogo-grey');
//      .backgroundPalette(predominant_color);
    $mdThemingProvider.generateThemesOnDemand(false);
  }
})();
 */



//--- Galae specific colors v2
(function () {
  'use strict'
  angular.module('SOGo.Common')
    .config(configure)

  configure.$inject = ['$mdThemingProvider']

  function configure ($mdThemingProvider) {

    // New Galae palettes
    // possible values: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, A100, A200, A400, A700
    // the lowest the value the brighter
    // See https://m1.material.io/style/color.html#color-color-palette
    // WARNING: 700 is used for calendar day view time foreground color
    $mdThemingProvider.definePalette('sogo-galae-lighter-with-a100-fafafa-like-original', {
      50: 'eaf6fa',
      100: 'd5eaf0',
      200: 'bcdbe4',
      300: 'a0ccd7',
      400: '80bac8',
      500: '65aabc',
      600: '509eb2',
      700: '3b92a8',
      800: '28879f',
      900: '177d97',
      A100: 'f0fbfd',
      A200: '5bd8f0',
      A400: '00bed6',
      A700: '009fb5',
      contrastDefaultColor: 'dark',
      contrastLightColors: ['500', '600', '700', '800', '900'],
    });

    // Pick a color palette: 'indigo', 'teal', 'cyan', 'blue', 'light-freen' etc.
    // https://m1.material.io/style/color.html#color-color-palette
    // SOGo defines some more palettes: sogo-blue, sogo-green, sogo-grey
    // See /usr/lib/GNUstep/SOGo/WebServerResources/js/Common.js
    var predominant_color = 'sogo-galae-lighter-with-a100-fafafa-like-original'

    $mdThemingProvider.theme('default')
      .primaryPalette(predominant_color, {
        default: '900', // background color of top toolbars
        'hue-1': '400', // week numbers in calendar
        'hue-2': '800', // background color of sidebar toolbar (user name and email)
        'hue-3': 'A700'
      })
      .accentPalette(predominant_color, {
        default: '500',  // background color of fab buttons and login screen
        'hue-1': 'A100', // background color of center list toolbar
        'hue-2': '300',  // highlight color for selected mail and current day calendar
        'hue-3': 'A700'  // new mail button hover color
      })
      .backgroundPalette('sogo-grey')

    $mdThemingProvider.generateThemesOnDemand(false)
  }
})()
