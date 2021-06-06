import { syncMethods } from './syncMethods'
import my = AliMiniProgram.my

type ParamType<T> = T extends (option: infer P) => any ? P : T
// @ts-ignore
type SuccessCallback<T> = NonNullable<ParamType<T>>['success']
type SuccessResultType<T> = ParamType<SuccessCallback<T>>

// @ts-ignore
type FailCallback<T> = NonNullable<ParamType<T>>['fail']
type FailResultType<T> = ParamType<FailCallback<T>>

type My = my
// 异步 key
type MyAsyncFunctionKeys = {
  [K in keyof My]: Required<ParamType<My[K]>> extends { success: any }
    ? K
    : never
}[keyof My]

// 同步 key
type MySyncFunctionKeys = {
  [K in keyof My]: Required<ParamType<My[K]>> extends { success: any }
    ? never
    : K
}[keyof My]

export type myPAsync = {
  [P in MyAsyncFunctionKeys]: (
    option?: ParamType<My[P]>
  ) => Promise<
    [undefined, SuccessResultType<My[P]>] | [FailResultType<My[P]>, undefined]
  >
}

// todo option 可选不是很完美，最好
export type myPSync = {
  [P in MySyncFunctionKeys]: (option?: ParamType<My[P]>) => ReturnType<My[P]>
}

function _promisify(fn: Function) {
  if (typeof fn !== 'function') return fn
  type paramType = ParamType<typeof fn>
  return async (args: paramType) =>
    await new Promise((resolve, reject) => {
      fn(
        Object.assign(args, {
          success: (res: any) => {
            resolve([void 0, res])
          },
          fail: (err: any) => resolve([err, void 0])
        })
      )
    })
}

export function promisifyAll(my: My): myPAsync & myPSync {
  const myp: any = {}
  ;(Object.keys(my) as Array<keyof My>).forEach(key => {
    const fn = my[key]
    if (typeof fn === 'function') {
      if (syncMethods.includes(key)) {
        // 同步方法（手动配置）
        myp[key] = fn
      } else {
        // 默认异步方法
        type paramType = ParamType<typeof fn>
        myp[key] = async (args: paramType) => {
          // 异步方法，不考虑是否有回调，直接返回promise 值
          // return _promisify(fn)(args)
          return new Promise((resolve, reject) => {
            // @ts-ignore
            fn(
              Object.assign(args, {
                success: (res: any) => {
                  resolve([undefined, res])
                },
                fail: (err: any) => resolve([err, undefined])
              })
            )
          })
        }
      }
    }
  })
  return myp
}

// export const promisify = _promisify
