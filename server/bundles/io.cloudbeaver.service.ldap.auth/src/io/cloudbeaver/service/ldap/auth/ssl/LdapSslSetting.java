package io.cloudbeaver.service.ldap.auth.ssl;

public class LdapSslSetting {
    private final boolean isEnable;
    private final String sslCert;

    public LdapSslSetting(boolean isEnable, String sslCert) {
        this.isEnable = isEnable;
        this.sslCert = sslCert;
    }

    public boolean isEnable() {
        return isEnable;
    }

    public String getSslCert() {
        return sslCert;
    }
}
