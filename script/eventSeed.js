//date/time is in grenish mean
// months are one less then standard notation -> January = 0, Decemeber = 11

const clubEvents = [
    {Name: 'Weekly Club Net', Start: new Date(2020, 10, 8, 26), Location: '145.310', Type: 'Net'},
    {Name: 'Weekly Club Net', Start: new Date(2020, 10, 15, 26), Location: '145.310', Type: 'Net'},
    {Name: 'Weekly Club Net', Start: new Date(2020, 10, 22, 26), Location: '145.310', Type: 'Net'},
    {Name: 'Weekly Club Net', Start: new Date(2020, 10, 29, 26), Location: '444.475', Type: 'Net'},
    {Name: 'Weekly Club Net', Start: new Date(2020, 11, 6, 26), Location: '145.310', Type: 'Net'},
    {Name: 'Weekly Club Net', Start: new Date(2020, 11, 13, 26), Location: '145.310', Type: 'Net'},
    {Name: 'Weekly Club Net', Start: new Date(2020, 11, 20, 26), Location: '145.310', Type: 'Net'},
    {Name: 'Weekly Club Net', Start: new Date(2020, 11, 27, 26), Location: '145.310', Type: 'Net'},
    {Name: 'Weather Net', Start: new Date(2020, 10, 10, 25), Location: '444.475', Type: 'Net'},
    {Name: 'Weather Net', Start: new Date(2020, 10, 24, 25), Location: '444.475', Type: 'Net'},
    {Name: 'Weather Net', Start: new Date(2020, 11, 8, 25), Location: '444.475', Type: 'Net'},
    {Name: 'Weather Net', Start: new Date(2020, 11, 22, 25), Location: '444.475', Type: 'Net'},
    {Name: 'Club Meeting', Start: new Date(2020, 10, 6, 25, 30), Location: 'Zoom', Type: 'Club Meeting'},
    {Name: 'Club Meeting', Start: new Date(2021, 0, 8, 25, 30), Location: 'Zoom', Type: 'Club Meeting'},
    {Name: 'Hamfest', Start: new Date(2021, 0, 17, 15), Location: 'Zoom', Type: 'Special CalendarEvent'},
]

module.exports = clubEvents