import { ValidationReport } from '@validators/ValidationReportBuilder';
import { divTag, labelTag, inputTag, pTag } from '@utils/HtmlBuilder';
import { SafeString } from 'handlebars';
import { extractParams } from './HelperType';

type FormFloatingInputOptions = {
    name: string;
    label: string;
    postData: object;
    errors: ValidationReport;
    disabled: boolean;
};

const formFloatingInputHelper = (...props) => {
    const [params] = extractParams<FormFloatingInputOptions>(
        {
            name: undefined,
            label: undefined,
            postData: {},
            errors: {},
            disabled: false,
        },
        props,
    );
    const name = params.name || '';
    const label = params.label || name;
    const postData = params.postData;
    const errors = params.errors;
    const disabled = params.disabled;

    const inputClasses =
        errors && errors[name] && errors[name].cssClass ? 'form-control ' + errors[name].cssClass : 'form-control';
    const value = postData && postData[name] ? postData[name] : '';
    const errorMessages = errors && errors[name] && errors[name].errorMessages ? errors[name].errorMessages : [];

    const inputTagOptions = {
        className: inputClasses,
        type: 'text',
        id: name,
        name,
        value,
        placeholder: label,
    };
    if (disabled) {
        inputTagOptions['disabled'] = disabled;
    }
    const inputTagHtml = inputTag(inputTagOptions);

    const labelTagHtml = labelTag({
        for: name,
        content: label,
    });

    const feedBackTagHtml =
        errorMessages && errorMessages.length > 0
            ? divTag({
                  className: 'invalid-feedback',
                  content: errorMessages.map(errorMessage => pTag({ content: errorMessage })),
              })
            : '';

    const html = divTag({ className: 'form-floating mb-3', content: [inputTagHtml, labelTagHtml, feedBackTagHtml] });

    return new SafeString(html);
};

export default formFloatingInputHelper;
