import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import { Request, Response } from 'express';

@Middleware({ type: 'after' })
export default class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: Error, request: Request, response: Response) {
        response.status(500).json({
            type: typeof error,
            name: error.name,
            message: error.message,
        });
    }
}
