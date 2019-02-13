# from backend import app, context, PORT
from backend import app
# from OpenSSL import SSL

# context = SSL.Context(SSL.SSLv23_METHOD)
# context.use_privatekey_file("/etc/letsencrypt/live/trysmartcanvas.de/privkey.pem;")
# context.use_certificate_file("/etc/letsencrypt/live/trysmartcanvas.de/fullchain.pem;")
if __name__ == "__main__":
    app.run()
    # app.run(host="127.0.0.1", port=int(PORT), ssl_context='adhoc')
    # app.run(host="127.0.0.1", port=int(PORT), ssl_context='adhoc')
