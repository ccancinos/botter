import { EnvContext } from '../common/EnvContext.js'
import { login } from '../common/login.js'

// TODO implement this when I can access the screen
async function main() {
  let steps = [
    login,
    selectMonotributo, // navega a otra página, hay que hacer el waitForNavigation
    selectPagar, //hay que mejorarle el xpath
  ]

  let context = new EnvContext()

  await context.init()
  
  for (let step of steps) {
    await step(context)
  }

  await context.end()
}

main()

