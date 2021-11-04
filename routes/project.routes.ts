/* istanbul ignore file */
import { Express, Request, Response } from 'express'
import { ProjectService } from '../services/project.service'

export function registerRoutes(app: Express): void {
    app.get('/api/v1/projects', getProjects)
}

function getProjects(request: Request, response: Response): void {
    ProjectService.getProjects().then(result => {
        response.status(200).send(result)
    }).catch(error => {
        response.status(400).send(error)
    })
}
