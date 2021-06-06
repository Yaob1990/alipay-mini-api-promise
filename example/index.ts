import { promisifyAll } from '../src'
const myP = promisifyAll(my)

async function test() {
  let data = await myP.scan({ type: 'qr' })
  if (data[1]) {
    data[1].barCode
  }

  let data1 = await myP.getAuthCode({ scopes: ['auth_base'] })
  if (data1[1]) {
    const a = data1[1]
  }
  let data2 = await myP.hideAllFavoriteMenu()

  myP.navigateBack({ delta: 3 })

  let data3 = myP.chooseCity({ showLocatedCity: true })

  return data
}
