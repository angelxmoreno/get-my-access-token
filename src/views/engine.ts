import { create } from 'express-handlebars';
import helpers from './helpers';
import { ConfigOptions } from 'express-handlebars/types';
import { Application } from 'express';

const layoutsDir = './src/views/templates/layouts';
const partialsDir = './src/views/templates/partials';
const viewsDir = './src/views/templates/pages';

const config: ConfigOptions = {
    helpers,
    extname: 'hbs',
    encoding: 'utf-8',
    layoutsDir,
    partialsDir,
    defaultLayout: 'main',
};

const hbs = create(config);

export const registerView = (app: Application) => {
    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');
    app.set('views', viewsDir);
};
