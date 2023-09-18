export const executeSteps = async (steps, context) => {
    for (let step of steps) {
        await step(context)
    }
}
