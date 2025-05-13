package io.cloudbeaver.service.ldap.auth.ssl;

import java.io.IOException;
import java.net.InetAddress;
import java.net.Socket;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;

/**
 * This class implementation correspond JNDI api.
 * Intention is creating isolated ssl socket factory for each user, not for general keystore
 */
public class LdapSslSocketFactory extends SSLSocketFactory {
    private static final ThreadLocal<SSLSocketFactory> tlsFactory = new ThreadLocal<>();

    public static void setContextFactory(SSLContext ctx) {
        tlsFactory.set(ctx.getSocketFactory());
    }

    //this method is called by internal api
    public static SSLSocketFactory getDefault() {
        SSLSocketFactory factory = tlsFactory.get();
        if (factory == null) {
            throw new IllegalStateException("No SSLContext set in current thread");
        }
        return factory;
    }

    public String[] getDefaultCipherSuites() {
        return getDefault().getDefaultCipherSuites();
    }

    public String[] getSupportedCipherSuites() {
        return getDefault().getSupportedCipherSuites();
    }

    public Socket createSocket(Socket s, String h, int p, boolean a) throws IOException {
        return getDefault().createSocket(s, h, p, a);
    }

    public Socket createSocket(String h, int p) throws IOException {
        return getDefault().createSocket(h, p);
    }

    public Socket createSocket(String h, int p, InetAddress l, int lp) throws IOException {
        return getDefault().createSocket(h, p, l, lp);
    }

    public Socket createSocket(InetAddress h, int p) throws IOException {
        return getDefault().createSocket(h, p);
    }

    public Socket createSocket(InetAddress h, int p, InetAddress l, int lp) throws IOException {
        return getDefault().createSocket(h, p, l, lp);
    }
}
