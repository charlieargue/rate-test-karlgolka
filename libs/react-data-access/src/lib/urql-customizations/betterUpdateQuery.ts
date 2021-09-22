import { Cache, QueryInput } from '@urql/exchange-graphcache';

export function betterUpdateQuery<Result, Query>(
    // NOTE: this way you can pass in two generics, the result, and the query... and it returns a PROPERLY TYPED FUNCTION! 
    // THX: Ben Awad 14-hr course
    // TODO: get rid of these any
    cache: Cache,
    qi: QueryInput,
    result: any,
    fn: (r: Result, q: Query) => Query) {
    return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}
