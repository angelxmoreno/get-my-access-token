import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import { Request, Response } from 'express';

@Middleware({ type: 'after' })
export default class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: Error, request: Request, response: Response) {
        const errorBody = {
            type: typeof error,
            name: error.name,
            message: error.message,
            stack: error.stack ? error.stack.split('\r') : '',
        };
        console.error(errorBody);
        if (!response.headersSent) {
            response.status(500).json();
        }
    }
}
