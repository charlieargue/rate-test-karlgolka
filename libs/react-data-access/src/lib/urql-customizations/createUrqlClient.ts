import { devtoolsExchange } from '@urql/devtools'
import { Exchange, fetchExchange } from 'urql'
import { pipe, tap } from 'wonka' // part of urql!
import { cache } from './cache'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY

// thx: https://github.com/FormidableLabs/urql/issues/225
const errorExchange: Exchange = ({ forward }) => ops$ => {
    return pipe(
        forward(ops$),
        tap(({ error }) => {
            if (error !== undefined) {
                console.log(`🚀 ~ error`, error)
                // TODO: anytime there's an error in anything we run..
                // 🛡 sentry fire-and-forget CALL would go here!
                // NOTE: can't use HOOKS here, REDUX would be the goto solution for updating app state
            }
        })
    )
}

// -------------------
export const createUrqlClient = (ssrExchange: any) => ({

    url: NEXT_PUBLIC_API_URL,
    fetchOptions: () => ({ headers: { "x-api-key": NEXT_PUBLIC_API_KEY } }),
    exchanges: [
        devtoolsExchange,
        cache,
        errorExchange,
        ssrExchange,
        fetchExchange],
})