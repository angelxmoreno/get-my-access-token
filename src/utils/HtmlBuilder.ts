import { isArray, isString } from 'lodash';

type HtmlBuilderAttributes = Record<string, unknown>;

type HtmlBuilderParams = {
    tag: string;
    attrs: HtmlBuilderAttributes;
    content: string[] | string | undefined;
};

type HtmlTagParams = Partial<HtmlBuilderAttributes & Omit<HtmlBuilderParams, 'tag' | 'attrs'>>;

const defaultHtmlBuilderParams: HtmlBuilderParams = {
    tag: 'div',
    attrs: {},
    content: undefined,
};
type TagFunc = (params: HtmlTagParams) => string;

const HtmlBuilder = (params: Partial<HtmlBuilderParams>): string => {
    const { tag, attrs, content } = {
        ...defaultHtmlBuilderParams,
        ...params,
    };
    const contentStr: string =
        content && isArray(content) ? content.join('\n') : content && isString(content) ? content : '';
    const attributes = Object.entries(attrs)
        .map(([k, v]) => (k === 'className' ? ['class', v] : [k, v]))
        .reduce((content, [k, v]) => {
            return content + `${k}="${v}" `;
        }, '')
        .trim();

    const prefix = attributes !== '' ? `<${tag} ${attributes}` : `<${tag}`;
    const suffix = contentStr ? `>${contentStr}</${tag}>` : ' />';
    return prefix + suffix;
};

const buildTagFunc = (tag: string, params: HtmlTagParams): string => {
    const { content, ...attrs } = params;

    return HtmlBuilder({ tag, attrs, content });
};

export const divTag: TagFunc = params => buildTagFunc('div', params);
export const pTag: TagFunc = params => buildTagFunc('p', params);
export const labelTag: TagFunc = params => buildTagFunc('label', params);
export const inputTag: TagFunc = params => buildTagFunc('input', params);

export default HtmlBuilder;
