import jwt from 'jsonwebtoken'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { AuthenticationConfig } from '../config/authentication.config'
import { AuthenticationError, InvalidServiceTokenError } from '../errors/app-errors'
import { ErrorHandlerService } from './error-handler.service'

export class AuthenticationService {
    public static authenticate(serviceToken: string): string {
        if (serviceToken === AuthenticationConfig.serviceToken) {
            const token = jwt.sign(
                {}, 
                AuthenticationConfig.serviceToken, 
                { expiresIn: AuthenticationConfig.jwtExpirySeconds }
            )

            return token
        }

        throw new InvalidServiceTokenError()
    }

    public static authorize(): RequestHandler {
        return (request: Request, response: Response, next: NextFunction): void => {
            try {
                const authorizationHeader = request.headers['authorization']
                const authorizationHeaderSections = authorizationHeader.split('Bearer ')
                const token = authorizationHeaderSections[1]

                jwt.verify(token, AuthenticationConfig.serviceToken)
            
                next()
            } catch {
                const error = new AuthenticationError()
                ErrorHandlerService.handleError(response, error)
            }
        }
    }
}
