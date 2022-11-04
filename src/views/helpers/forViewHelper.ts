import {HelperOptions} from 'handlebars';

const forViewHelper = (from: number, to: number, incr: number, block: HelperOptions) => {
    let accum = '';
    for (let i = from; i < to; i += incr) {
        accum += block.fn(i);
    }

    return accum;
}

export default forViewHelper;