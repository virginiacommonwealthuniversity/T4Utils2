// Export
module.exports = () => {
    let today = new Date(),
        month = leftPad(today.getMonth() + 1),
        day =   leftPad(today.getDate()),
        year =  today.getFullYear();
    return year + '.' + month + '.' + day;
    function leftPad(int) {
        return int < 10 ? '0' + int : int;
    }
};
