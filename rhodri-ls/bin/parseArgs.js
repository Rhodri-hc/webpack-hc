module.exports = function parse(){
    const args = process.argv.slice(2)

    let isAll = false;
    let isList = false;

    args.forEach(argv => {
        if (argv.indexOf("a") >= 0) {
            isAll = true;
        }
        if (argv.indexOf("l") >= 0) {
            isList = true;
        }
    })

    return {
        args,
        isAll,
        isList
    }
}