let cities = [
    { arabic: "القاهرة", english: "Cairo" },
    { arabic: "الجيزة", english: "Giza" },
    { arabic: "الإسكندرية", english: "Alexandria" },
    { arabic: "الشرقية", english: "Sharqia" },
    { arabic: "الدقهلية", english: "Dakahlia" },
    { arabic: "البحيرة", english: "Beheira" },
    { arabic: "المنوفية", english: "Monufia" },
    { arabic: "القليوبية", english: "Qalyubia" },
    { arabic: "الغربية", english: "Gharbia" },
    { arabic: "كفر الشيخ", english: "Kafr El Sheikh" },
    { arabic: "الفيوم", english: "Faiyum" },
    { arabic: "بني سويف", english: "Beni Suef" },
    { arabic: "المنيا", english: "Minya" },
    { arabic: "أسيوط", english: "Assiut" },
    { arabic: "سوهاج", english: "Sohag" },
    { arabic: "قنا", english: "Qena" },
    { arabic: "الأقصر", english: "Luxor" },
    { arabic: "أسوان", english: "Aswan" },
    { arabic: "البحر الأحمر", english: "Red Sea" },
    { arabic: "مرسى مطروح", english: "Matrouh" },
    { arabic: "السويس", english: "Suez" },
    { arabic: "بورسعيد", english: "Port Said" },
    { arabic: "الإسماعيلية", english: "Ismailia" },
    { arabic: "شمال سيناء", english: "North Sinai" },
    { arabic: "جنوب سيناء", english: "South Sinai" },
    { arabic: "الوادي الجديد", english: "New Valley" }
];

for (let city of cities) {
    const content = `
    <option >${city.arabic}</option>
    `
    document.getElementById("cities-select").innerHTML += content;
}


document.getElementById("cities-select").addEventListener("change", function () {

    document.getElementById("city-name").innerHTML = this.value;
    let cityName = "";
    for(let city of cities)
    {
        if(city.arabic == this.value)
        {
            cityName = city.english;
        }
    }
    getPrayersTimings(cityName);

    // alert(this.value);
})


function getPrayersTimings(cityName) {
    
    let params = {
        country: "Eg",
        city: cityName
    }

    axios.get("https://api.aladhan.com/v1/timingsByCity", {
        params: params
    }).then((response) => {
        const timings = response.data.data.timings;
        fillTimeForPrayer("fajr-time", timings.Fajr);
        fillTimeForPrayer("sunrise-time", timings.Sunrise);
        fillTimeForPrayer("dhurh-time", timings.Dhuhr);
        fillTimeForPrayer("asr-time", timings.Asr);
        fillTimeForPrayer("sunset-time", timings.Sunset);
        fillTimeForPrayer("isha-time", timings.Isha);

        const readableDate = response.data.data.date.readable;
        const weekDay = response.data.data.date.hijri.weekday.ar;

        let date = readableDate + " " + weekDay;
        document.getElementById("date").innerHTML = date;

        // console.log(response.data.data.timings.Fajr);
    }).catch((error) => {
        // console.log(error);
    })

}


getPrayersTimings("cairo");



function fillTimeForPrayer(id, time) {
    document.getElementById(id).innerHTML = time;
}



