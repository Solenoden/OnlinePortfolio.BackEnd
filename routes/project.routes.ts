import { Express, Request, Response } from 'express'
import { ErrorHandlerService } from '../services/error-handler.service'
import { AuthenticationService } from '../services/authentication.service'
import { ProjectService } from '../services/project.service'

export function registerRoutes(app: Express): void {
    app.get('/api/v1/projects', AuthenticationService.authorize(), getProjects)
}

function getProjects(request: Request, response: Response): void {
    ProjectService.getProjects().then(result => {
        response.status(200).send(result)
    }).catch(error => {
        ErrorHandlerService.handleError(response, error)
    })
}
