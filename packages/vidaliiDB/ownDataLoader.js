function dataLoader() {
    var time = [1]
    var keys = []
    const resolve = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved')
            }, 0);
        });
    }
    return {
        load: async (key) => {
            keys.push(key)
            console.log('calling');
            var result = await resolve();
            console.log(result);
            return keys
        }
    }
}


async function inGraph() {
    var firstDataLoader = dataLoader()
    var uno = await firstDataLoader.load(1)
    var dos = await firstDataLoader.load(2)
    console.log('uno:', uno)
    console.log('dos:', dos)
}
inGraph()