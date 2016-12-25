const electron = require('electron')
const Menu = electron.Menu
const shell = electron.shell

module.exports = function() {
  var template = [
    {
      label: 'MixerBox Desktop',
      submenu: [
        { label: 'About MixerBox Desktop', role: 'about' },
        { type: 'separator' },
        { label: 'Services', role: 'services', submenu: [] },
        { type: 'separator' },
        { label: 'Hide MixerBox Desktop', accelerator: 'Command+H', role: 'hide' },
        { label: 'Hide Others', accelerator: 'Command+Alt+H', role: 'hideothers' },
        { label: 'Show All', role: 'unhide' },
        { type: 'separator' },
        { label: 'Quit',
          accelerator: 'Command+Q',
          click: function() {
            electron.app.quit();
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: function(item, win) {
            if (win) win.reload();
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: function(item, win) {
            if (win) win.setFullScreen(!win.isFullScreen());
          }
        },
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'Report Issues...',
          click: function() {
            shell.openExternal('https://github.com/pcwu/mixerbox-desktop/issues');
          }
        },
        {
          label: 'MixerBox Desktop\'s Page',
          click: function() {
            shell.openExternal('https://github.com/pcwu/mixerbox-desktop');
          }
        },
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};
