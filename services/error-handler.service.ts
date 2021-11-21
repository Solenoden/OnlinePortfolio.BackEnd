import { HttpError, UnexpectedError } from '../errors/app-errors'
import { Response } from 'express'

export class ErrorHandlerService {
    /* istanbul ignore next */
    public static handleError(response: Response, error: any): void {
        if (error && error instanceof HttpError) {
            response.statusCode = error.statusCode
            response.send({ error: error, errorMessage: error.message })
            return
        }

        const unexpectedError = new UnexpectedError(error)
        response.statusCode = unexpectedError.statusCode
        response.send({ error: unexpectedError, errorMessage: unexpectedError.message })
    }
}
