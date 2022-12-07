import _ from 'lodash';
export function foo() {
    return _.map([1, 2, 3], n => n * 2);
}
await new Promise(resolve => setTimeout(resolve, 1000));
