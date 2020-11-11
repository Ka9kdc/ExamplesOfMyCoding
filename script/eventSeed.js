//date/time is in grenish mean
// months are one less then standard notation -> January = 0, Decemeber = 11

const clubEvents = [
    {Name: 'Weekly Club Net', Start: new Date(2020, 10, 8, 20), End: new Date(2020, 10, 8, 20,30), Location: '145.310', Type: 'Net'},
    {Name: 'Weekly Club Net', Start: new Date(2020, 10, 15, 20), End: new Date(2020, 10, 15, 20,30), Location: '145.310', Type: 'Net'},
    {Name: 'Weekly Club Net', Start: new Date(2020, 10, 22, 20), End: new Date(2020, 10, 22, 20,30), Location: '145.310', Type: 'Net'},
    {Name: 'Weekly Club Net', Start: new Date(2020, 10, 29, 20), End: new Date(2020, 10, 29, 20,30), Location: '444.475', Type: 'Net'},
    {Name: 'Weekly Club Net', Start: new Date(2020, 11, 6, 20), End: new Date(2020, 11,6, 20,30), Location: '145.310', Type: 'Net'},
    {Name: 'Weekly Club Net', Start: new Date(2020, 11, 13, 20), End: new Date(2020, 11,13, 20,30), Location: '145.310', Type: 'Net'},
    {Name: 'Weekly Club Net', Start: new Date(2020, 11, 20, 20), End: new Date(2020, 11,20, 20,30), Location: '145.310', Type: 'Net'},
    {Name: 'Weekly Club Net', Start: new Date(2020, 11, 27, 20), End: new Date(2020, 11,27, 20,30), Location: '145.310', Type: 'Net'},
    {Name: 'Weather Net', Start: new Date(2020, 10, 10, 19), End: new Date(2020, 10, 10, 19, 15), Location: '444.475', Type: 'Net'},
    {Name: 'Weather Net', Start: new Date(2020, 10, 24, 19), End: new Date(2020, 10, 24, 19, 15), Location: '444.475', Type: 'Net'},
    {Name: 'Weather Net', Start: new Date(2020, 11, 8, 19), End: new Date(2020, 11, 8, 19, 15), Location: '444.475', Type: 'Net'},
    {Name: 'Weather Net', Start: new Date(2020, 11, 22, 19), End: new Date(2020, 11, 22, 19, 15), Location: '444.475', Type: 'Net'},
    {Name: 'Club Meeting', Start: new Date(2020, 10, 6, 19, 30), End: new Date(2020, 10, 6, 21, 30), Location: 'Zoom', Type: 'Club Meeting'},
    {Name: 'Club Meeting', Start: new Date(2021, 0, 8, 19, 30), End: new Date(2021, 0, 8, 21, 30), Location: 'Zoom', Type: 'Club Meeting'},
    {Name: 'Hamfest', Start: new Date(2021, 0, 17, 8), End: new Date(2021, 0, 17, 16), Location: 'Zoom', Type: 'Special CalendarEvent'},
    {Name: 'Weekly Club Net', Start: new Date(2021, 0, 3, 20), End: new Date(2021, 0, 3, 20,30), Location: '145.310', Type: 'Net'},
    {Name: 'Weekly Club Net', Start: new Date(2021, 0, 10, 20), End: new Date(2021, 0, 10, 20,30), Location: '145.310', Type: 'Net'},
    {Name: 'Weekly Club Net', Start: new Date(2021, 0, 17, 20), End: new Date(2021, 0, 17, 20,30), Location: '145.310', Type: 'Net'},
    {Name: 'Weekly Club Net', Start: new Date(2021, 0, 24, 20), End: new Date(2021, 0, 24, 20,30), Location: '145.310', Type: 'Net'},
    {Name: 'Weekly Club Net', Start: new Date(2021, 0, 31, 20), End: new Date(2021, 0, 31, 20,30), Location: '444.475', Type: 'Net'},    {Name: 'Weather Net', Start: new Date(2020, 10, 10, 19), End: new Date(2020, 10, 10, 19, 15), Location: '444.475', Type: 'Net'},
    {Name: 'Weather Net', Start: new Date(2021, 0, 12, 19), End: new Date(2021, 0, 12, 19, 15), Location: '444.475', Type: 'Net'},
    {Name: 'Weather Net', Start: new Date(2021, 0, 26, 19), End: new Date(2021,  0, 26, 19, 15), Location: '444.475', Type: 'Net'},
]

module.exports = clubEvents