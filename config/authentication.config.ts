export const AuthenticationConfig = {
    serviceToken: process.env.SERVICE_TOKEN,
    jwtExpirySeconds: Number(process.env.JWT_EXPIRY_SECONDS),
}