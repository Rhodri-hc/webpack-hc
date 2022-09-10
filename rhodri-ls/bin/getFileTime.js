module.exports = function getFileTime(stat){
    const { birthtimeMs, size } = stat;

    const birth = new Date(birthtimeMs);

    const birthDateString = `${birth.getFullYear()}/${birth.getMonth() + 1}/${birth.getDate()}  ${birth.getHours()}:${birth.getMinutes()}   ${size ? size : "  "}`;



    return  birthDateString;
}