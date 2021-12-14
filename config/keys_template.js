module.exports = {
    accounts: {
        admins: ["admin@example.com"],
        operators: ["operator@example.com"],
        domain: "example.com"
    }, twilio: {
        accountSid: 'sid',
        authToken: "token",
        messagingServiceSid: "sid",
        phoneNumbers: [
            "+12345678910"
        ]
    },
    google: {
        clientId: "id",
        clientSecret: "secret",
        callbackURL: "/auth/google/callback"
    },
    session: {
        secret: "secret"
    }
}
