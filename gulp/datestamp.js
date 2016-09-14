// Export
module.exports = function () {
    var today = new Date(),
        month = leftPad(today.getMonth() + 1),
        day = leftPad(today.getDate()),
        year = today.getFullYear();
    function leftPad(int) {return int < 10 ? '0' + int : int;}
    return year + '.' + month + '.' + day;
};
