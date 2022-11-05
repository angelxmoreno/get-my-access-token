/* eslint-disable @typescript-eslint/no-empty-function */
import { Get, JsonController, Render } from 'routing-controllers';
import ModularAuthCollection from '@services/modular-auth/ModularAuthCollection';

@JsonController('/')
export class IndexController {
    @Get('')
    @Render('index')
    index() {
        return {
            ModularAuthCollection,
        };
    }

    @Get('about')
    @Render('about')
    about() {}
}
