import webview

def say_hello():
    return "Hello from Python!"

window = webview.create_window("Study App", "index.html")
webview.start()
