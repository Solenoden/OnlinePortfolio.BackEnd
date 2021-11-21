import { Express, Request, Response } from 'express'
import { ErrorHandlerService } from '../services/error-handler.service'
import { AuthenticationService } from '../services/authentication.service'

export function registerRoutes(app: Express): void {
    app.post('/api/v1/authenticate', authenticateClient)
}

function authenticateClient(request: Request, response: Response): void {
    const body = request.body as { serviceToken: string }

    try {
        const jwt = AuthenticationService.authenticate(body.serviceToken)

        response.status(200).send({ authenticationToken: jwt })
    } catch (error) {
        ErrorHandlerService.handleError(response, error)
    }
}
