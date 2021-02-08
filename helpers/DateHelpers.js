const DateHelpers = {
    weekDays: ["日","月","火","水","木","金","土"],
    getTodayString: () => {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1 ;
        let date = today.getDate();
        let day = DateHelpers.weekDays[today.getDay()];
        let todayString = String( year ) + "年 " + String( month ) + "月 " + String( date ) + "日 " + String( day ) + "曜日";
        
        return todayString;
    },
    getTomorrowString: () => {
        let tomorrow = new Date();
        tomorrow.setDate( tomorrow.getDate() + 1 );
        let year = tomorrow.getFullYear();
        let month = tomorrow.getMonth() + 1 ;
        let date = tomorrow.getDate();
        let day = DateHelpers.weekDays[tomorrow.getDay()];
        let tomorrowString = String( year ) + "年 " + String( month ) + "月 " + String( date ) + "日 " + String( day ) + "曜日";
        
        return tomorrowString;
    }
};

export default DateHelpers;
