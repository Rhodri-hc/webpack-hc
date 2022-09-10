const fs = require("fs")

module.exports = function auth(mode){
    let authString = ''

    // user
    const userReadString = (mode & fs.constants.S_IRUSR) ? 'r' : '-';
    const userWriteString = (mode & fs.constants.S_IWUSR) ? 'w' : '-';
    const userExecuteString = (mode & fs.constants.S_IXUSR) ? 'x' : '-';
 
    // group
    const groupReadString = (mode & fs.constants.S_IRGRP) ? 'r' : '-';
    const groupWriteString = (mode & fs.constants.S_IWGRP) ? 'w' : '-';
    const groupExecuteString = (mode & fs.constants.S_IXGRP) ? 'x' : '-';
 
    // other
    const otherReadString = (mode & fs.constants.S_IROTH) ? 'r' : '-';
    const otherWriteString = (mode & fs.constants.S_IWOTH) ? 'w' : '-';
    const otherExecuteString = (mode & fs.constants.S_IXOTH) ? 'x' : '-';


    authString = userReadString + userWriteString + userExecuteString 
                +groupReadString + groupWriteString + groupExecuteString
                +otherReadString  + otherWriteString + otherExecuteString

    return authString;

}