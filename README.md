# alipay-mini-api-promise


## 介绍
支付宝小程序 api（my） 转成 promise 数组形式，使用友好。

## 安装

```bash
npm install alipay-mini-api-promise
```

## 使用

```typescript
import { promisifyAll } from 'alipay-mini-api-promise'
const myP = promisifyAll(my)

async function test() {
  const [err,res] = await myP.scan({ type: 'qr' })
  return data
}
```

## 使用注意

1.未处理 my.ap 下面的api，建议直接使用 my.ap 的形式
2.部分回调形式的监听回调的 api ，建议使用原始形式，如 `my.onGyroscopeChange`

## 最佳实践
app.ts 引入
```typescript
// app.ts
import { promisifyAll } from 'alipay-mini-api-promise'
const myP = promisifyAll(my)

App({
  globalData: {myP}
})
```

封装 utils 文件

```typescript
myP = getApp().globalData
export { myP }
```

页面使用:
```typescript
import { myP } from 'utils'
myP.scan({ type: 'qr' })
```

## todo
* [ ] my.ap 的校验实现

* [ ] myP 挂载到 my.$p 下面，方便调用

## 感谢
[wechat-miniprogram/miniprogram-api-promise](https://github.com/wechat-miniprogram/miniprogram-api-promise)

## 贡献
 [issue](https://github.com/Yaob1990/alipay-mini-api-promise/issues)。

## LICENSE

MIT
