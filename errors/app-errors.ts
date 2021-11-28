/* istanbul ignore file */

export class HttpError implements Error {
    name: string
    message: string
    statusCode: number

    constructor(message: string, statusCode: number) {
        this.name = this.constructor.name
        this.message = message
        this.statusCode = statusCode
    }
}

export class AuthenticationError extends HttpError {
    constructor() {
        super('Unauthorized: Please provide a valid authentication token.', 401)
    }
}

export class UnexpectedError extends HttpError {
    constructor(public originalError: any) {
        super('An unexpected error occurred. Please try again later.', 500)
    }
}
