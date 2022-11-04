/* eslint-disable @typescript-eslint/no-empty-function */
import { Get, JsonController, Render } from 'routing-controllers';

@JsonController('/')
export class IndexController {
    @Get('')
    @Render('index')
    index() {}

    @Get('about')
    @Render('about')
    about() {}
}
