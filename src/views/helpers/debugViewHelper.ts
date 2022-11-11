import hbs from 'handlebars';

const debugViewHelper = (data: unknown) => {
    return new hbs.SafeString('<pre>' + JSON.stringify(data, null, 4) + '</pre>');
};

export default debugViewHelper;
