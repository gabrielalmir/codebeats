export function benchmark(_target: any, propertyName: any, descriptor: any = null) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
        const startedAt = new Date();
        const result = await originalMethod.apply(this, args);
        const endedAt = new Date();

        const timeInSeconds = (endedAt.getTime() - startedAt.getTime()) / 1000;

        console.log(`Benchmark ${propertyName} ->\n\tTime: ${timeInSeconds} seconds`)
        console.log(`\tStarted at: ${startedAt.toLocaleString()}. Ended at: ${endedAt.toLocaleString()}`)

        return result;
    };

    return descriptor;
}
