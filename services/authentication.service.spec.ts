import { AuthenticationConfig } from '../config/authentication.config'
import { AuthenticationError } from '../errors/app-errors'
import { AuthenticationService } from './authentication.service'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import * as sinon from 'sinon'
import { ErrorHandlerService } from './error-handler.service'

describe('test AuthenticationService', () => {
    describe('test authenticate', () => {
        beforeAll(() => {
            AuthenticationConfig.serviceToken = 'dummy-service-token'
            AuthenticationConfig.jwtExpirySeconds = 60
        })

        it('should return a token if the provided secret is valid', () => {
            const token = AuthenticationService.authenticate(AuthenticationConfig.serviceToken)

            expect(token).toBeTruthy()
        })

        it('should throw an authentication error if the provided secret is invalid', () => {
            try {
                AuthenticationService.authenticate('something-random')
                fail('should have thrown an error')
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error).toBeInstanceOf(AuthenticationError)
            }
        })
    })
    
    describe('test authorize', () => {
        const authorizeMiddleware = AuthenticationService.authorize()
        let mockNextFunction: sinon.SinonStub
        let mockResponse: Partial<Response>
        let mockRequest: Partial<Request>
        const mockServiceToken = 'abc'
        const mockValidAuthToken = jwt.sign({}, mockServiceToken)
        const mockInvalidAuthToken = jwt.sign({}, 'random-secret')

        let handleErrorStub: sinon.SinonStub

        beforeEach(() => {
            handleErrorStub = sinon.stub(ErrorHandlerService, 'handleError')

            mockResponse = { status: sinon.stub().returns({ send: sinon.stub() }) }
            mockRequest = { headers: { authorization: `Bearer ${mockValidAuthToken}` } }
            mockNextFunction = sinon.stub()

            AuthenticationConfig.serviceToken = mockServiceToken
        })

        afterEach(() => {
            handleErrorStub.restore()
        })

        it('should call the next method if the authentication token is valid', () => {
            authorizeMiddleware(
                mockRequest as Request, 
                mockResponse as Response,
                mockNextFunction
            )

            expect(mockNextFunction.callCount).toEqual(1)
        })

        it('should return an authentication error if the authorization header is missing', () => {
            mockRequest = { headers: {} }

            authorizeMiddleware(
                mockRequest as Request, 
                mockResponse as Response,
                mockNextFunction
            )

            expect(mockNextFunction.callCount).toEqual(0)
            expect(handleErrorStub.callCount).toEqual(1)
        })

        it('should return an authentication error if the token is invalid', () => {
            mockRequest = { headers: { authorization: `Bearer ${mockInvalidAuthToken}` } }

            authorizeMiddleware(
                mockRequest as Request, 
                mockResponse as Response,
                mockNextFunction
            )

            expect(mockNextFunction.callCount).toEqual(0)
            expect(handleErrorStub.callCount).toEqual(1)
        })
    })
})
