import ModularAuthCollection from '@services/modular-auth/ModularAuthCollection';
import { Controller, Get, Response } from '@decorators/express';
import * as e from 'express';

@Controller('/')
export class IndexController {
    @Get('/')
    index(@Response() res: e.Response) {
        res.render('index', {
            modularAuths: ModularAuthCollection.asArray,
        });
    }

    @Get('/about')
    async about(@Response() res: e.Response) {
        res.render('about');
    }
}
