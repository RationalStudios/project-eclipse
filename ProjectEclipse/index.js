const APP_PORT = 80;

console.log("Starting Window...");
    
const gi = require('node-gtk')
const Gtk = gi.require('Gtk', '3.0')
const WebKit2 = gi.require('WebKit2')

gi.startLoop()
Gtk.init()

const win = new Gtk.Window()

win.on('destroy', () => Gtk.mainQuit())
win.on('delete-event', () => false)

win.setDefaultSize(800, 600)
win.fullscreen();
//win.add(new Gtk.Label({ label: 'Hello Gtk+' }))


// WebKit2 browser wrapper
const webView = new WebKit2.WebView()

webView.loadUri(`http://localhost:${APP_PORT}/sharescr`);

win.add(webView);

win.showAll()
Gtk.main()