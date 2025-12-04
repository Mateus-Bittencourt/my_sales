import AppError from '@shared/erros/AppError'
import { NextFunction, Request, Response } from 'express'

export default class ErrorHandleMiddleware {
  public static handleError(
    error: Error,
    _request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
  ) {
    console.error(`\nError message: ${error.message}\n`)
    if (process.env.NODE_ENV === 'development')
      console.error(`Error stack: ${error.stack}\n`)

    if (error instanceof SyntaxError && error.message.includes('JSON'))
      return response.status(400).json({
        type: 'error',
        message: 'Invalid JSON format. Please check your request body.',
      })

    if (error instanceof AppError)
      return response
        .status(error.statusCode)
        .json({ type: 'error', message: error.message })

    return response
      .status(500)
      .json({ type: 'error', message: 'Internal server error.' })
  }
}
