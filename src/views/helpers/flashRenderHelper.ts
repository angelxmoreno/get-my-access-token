import { divTag } from '@utils/HtmlBuilder';
import { SafeString } from 'handlebars';
import get from 'lodash/get';
const flashRenderHelper = context => {
    const flashMessages = get(context, ['data', 'root', 'flashMessages'], []);
    const htmlOutput = flashMessages
        .map(({ type, message }) => {
            let alertType = type;
            switch (type) {
                case 'error':
                    alertType = 'danger';
            }

            return { type: alertType, message };
        })
        .map(({ type, message }) =>
            divTag({
                className: `alert alert-${type}`,
                role: 'alert',
                content: message,
            }),
        )
        .join('\n');

    return new SafeString(htmlOutput);
};

export default flashRenderHelper;
