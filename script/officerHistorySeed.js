const pastOfficers = [
    {startYear: 1948, endYear: 1949, President: 'D.C.Burger, W9MYK', VicePresident: 'Frank Golder, W9AAM', Secretary: 'Craig Allen, W9IHT', Treasurer: 'Alice Newcomb, W9QMS', Custodian: 'Unknown'},
    {startYear: 1949, endYear: 1950, President: 'D.C.Burger, W9MYK', VicePresident: 'Unknown', Secretary: 'Unknown', Treasurer: 'Robert E. Edson, W9EHK', Custodian: 'Unknown'},
    
    {startYear: 1950, endYear: 1951, President: 'Unknown', VicePresident: 'Unknown', Secretary: 'Unknown', Treasurer: 'Unknown', Custodian: 'Unknown'},
    {startYear: 1951, endYear: 1952, President: 'Unknown', VicePresident: 'Unknown', Secretary: 'Unknown', Treasurer: 'Unknown', Custodian: 'Unknown'},
    {startYear: 1952, endYear: 1953, President: 'Earl Kesselhuth, W9RQC', VicePresident: 'Unknown', Secretary: 'Unknown', Treasurer: 'Unknown', Custodian: 'Unknown'},
    {startYear: 1953, endYear: 1954, President: 'Unknown', VicePresident: 'Unknown', Secretary: 'Charles Alson, W9AZS', Treasurer: 'Unknown', Custodian: 'Unknown'},
    {startYear: 1954, endYear: 1955, President: 'Unknown', VicePresident: 'Unknown', Secretary: 'Unknown', Treasurer: 'Unknown', Custodian: 'Unknown'},
    {startYear: 1955, endYear: 1956, President: 'Unknown', VicePresident: 'Unknown', Secretary: 'Unknown', Treasurer: 'Unknown', Custodian: 'Unknown'},
    {startYear: 1956, endYear: 1957, President: 'Unknown', VicePresident: 'Unknown', Secretary: 'Unknown', Treasurer: 'Unknown', Custodian: 'Unknown'},
    {startYear: 1957, endYear: 1958, President: 'Wilber Cummings, W9FQ', VicePresident: 'Unknown', Secretary: 'Unknown', Treasurer: 'Unknown', Custodian: 'Unknown'},
    {startYear: 1958, endYear: 1959, President: 'Richard Manning, W9BUW', VicePresident: 'Pete Mason, K9HGL', Secretary: 'LeRoy Moderow, W9NPO', Treasurer: 'William Franz, K9KYE', Custodian: 'Unknown'},
    {startYear: 1959, endYear: 1960, President: 'Wilber Cummings, W9FQ', VicePresident: 'Unknown', Secretary: 'Edgar Porter, KN9SZT', Treasurer: 'Win Russell, W9RFS', Custodian: 'Unknown'},
    
    {startYear: 1960, endYear: 1961, President: 'Unknown', VicePresident: 'Unknown', Secretary: 'Unknown', Treasurer: 'Unknown', Custodian: 'Unknown'},
    {startYear: 1961, endYear: 1962, President: 'Win Russell, W9RFS', VicePresident: 'Richard Manning, W9BUW', Secretary: 'Richard Frazier, W9GOX', Treasurer: 'LeRoy Moderow, W9NPO', Custodian: 'Unknown'},
    {startYear: 1962, endYear: 1963, President: 'Win Russell, W9RFS', VicePresident: 'Unknown', Secretary: 'Unknown', Treasurer: 'Unknown', Custodian: 'Unknown'},
    {startYear: 1963, endYear: 1964, President: 'Unknown', VicePresident: 'Unknown', Secretary: 'Unknown', Treasurer: 'Unknown', Custodian: 'Unknown'},
    {startYear: 1964, endYear: 1965, President: 'Sanford Bear, WA9JXT', VicePresident: 'Roger Anderson, Jr., K9WTU', Secretary: 'E.L. Hanna, W9NWK', Treasurer: 'Win Russell, W9RFS', Custodian: 'Harry Eckland, W9SKX'},
    {startYear: 1965, endYear: 1966, President: 'Mark Potter, W9FBD', VicePresident: 'Dave Spensley, W9BOI', Secretary: 'E.L. Hanna, W9NWK', Treasurer: 'Win Russell, W9RFS', Custodian: 'Harry Eckland, W9SKX'},
    {startYear: 1966, endYear: 1967, President: 'Dave Spensley, W9BOI', VicePresident: 'Ken Bourne, W6HK', Secretary: 'E.L. Hanna, W9NWK', Treasurer: 'Win Russell, W9RFS', Custodian: 'Harry Eckland, W9SKX'},
    {startYear: 1967, endYear: 1968, President: 'Ken Bourne, W6HK', VicePresident: 'John Stockberger, W9THI', Secretary: 'E.L. Hanna, W9NWK', Treasurer: 'Bill Lester, WA9FGP', Custodian: 'Harry Eckland, W9SKX'},
    {startYear: 1968, endYear: 1969, President: 'Bill Lester, WA9FGP', VicePresident: 'Don Eddy, WA9ORK', Secretary: 'Roger Gilchrist, WA9MZY', Treasurer: 'Mark Potter, W9FBD', Custodian: 'Harry Eckland, W9SKX'},
    {startYear: 1969, endYear: 1970, President: 'Steve Pittges, WA9SSO', VicePresident: 'Ray Norberg, W9PYG', Secretary: 'Roger Gilchrist, WA9MZY', Treasurer: 'Mark Potter, W9FBD', Custodian: 'Unknown'},

    {startYear: 1970, endYear: 1971, President: 'John Stockberger, W9THI', VicePresident: 'Paul Johnson, W9OPD', Secretary: 'Dan Weiss, W9YQJ', Treasurer: 'Bill Lester, WA9FGP', Custodian: 'Larry Shaw, W9OKI'},
    {startYear: 1971, endYear: 1972, President: 'Larry Shaw, W9OKI', VicePresident: 'Paul Elarde, WB9BWK', Secretary: 'Don Eddy, WA9ORK', Treasurer: 'Ralph Sanders, W9GDM', Custodian: 'Harry Boettcher, K9EIU'},
    {startYear: 1972, endYear: 1973, President: 'William Rambow, WB9AVD', VicePresident: 'Al Budlong, WA9SZW', Secretary: 'Paul Sexauer, W9JTO', Treasurer: 'Werner Zoglauer, WB9CLV', Custodian: 'Harry Boettcher, K9EIU'},
    {startYear: 1973, endYear: 1974, President: 'Joe Harmon, WB9HIP', VicePresident: 'Tom Bridges, WB9ICR', Secretary: 'Harmon Barnard, WB9ICQ', Treasurer: 'Norm Volle, WN9HTI', Custodian: 'William Rambow, WB9AVD'},
    {startYear: 1974, endYear: 1975, President: 'Paul Sexauer, WA9JTO', VicePresident: 'Greg Chartrand, WA9EYY', Secretary: 'Bob Valgren, W9IPH', Treasurer: 'Al Grout, W9QDC', Custodian: 'Werner Zoglauer, WB9CLV'},
    {startYear: 1975, endYear: 1976, President: 'Sterling Warner, WB9PEQ', VicePresident: 'Bill Thompson, WA9WXC', Secretary: 'John Bryant, K9QLS', Treasurer: 'Frank Maren, WB9EOR', Custodian: 'Bob Sawinski, WB9LXA'},
    {startYear: 1976, endYear: 1977, President: 'Doug Totel, W9NJM', VicePresident: 'Ray Rhude, WB9KPV', Secretary: 'Bill Jackson, WB9FVD', Treasurer: 'Pete Hughes, WB9EHZ', Custodian: 'John Grotto, WB9NLQ'},
    {startYear: 1977, endYear: 1978, President: 'Greg Chartrand, WA9EYY', VicePresident: 'Dawn Chartrand, WB9TNM', Secretary: 'Carol Bourne, WA9NEJ', Treasurer: 'Jan Shillington, N9YL', Custodian: 'Oran Hiscox, WB9JJL'},
    {startYear: 1978, endYear: 1979, President: 'Joe Baima, WB9TTE', VicePresident: 'Al Santini, WB9PWM', Secretary: 'Marge Kelly, WB9TCP', Treasurer: 'Jerry Werner, WB9WBN', Custodian: 'Oran Hiscox, WB9JJL'},
    {startYear: 1979, endYear: 1980, President: 'Jim Osborne, WB9YRO', VicePresident: 'Jerry Werner, WB9WBN', Secretary: 'John Broughton, WB9VGJ', Treasurer: 'Bob Yoder, WD9GSU', Custodian: 'Oran Hiscox, WB9JJL'},
    
    {startYear: 1980, endYear: 1981, President: 'Joe Baima, WB9TT E', VicePresident: 'Tom Shillington, WB9OKL', Secretary: 'John Broughton, WB9VGJ', Treasurer: 'Bob Yoder, WD9GSU', Custodian: 'Oran Hiscox, WB9JJL'},
    {startYear: 1981, endYear: 1982, President: 'John Broughton, WB9VGJ', VicePresident: 'John Bryant, K9QLS', Secretary: 'Tom Benner, KA9ILQ', Treasurer: 'Bill Coons, KD9I', Custodian: 'Greg Chartland, WA9EYY'},
    {startYear: 1982, endYear: 1983, President: 'Bill Coons, KD9I', VicePresident: 'Tom Benner, KA91LQ', Secretary: 'Ray Grundy, N9CIB', Treasurer: 'Sue Coles, KA9LAZ', Custodian: 'Marc Stancy, WB9MAI'},
    {startYear: 1983, endYear: 1984, President: 'Art Lang, KR9K', VicePresident: 'Gene (Mac) McAleer, N9DUW', Secretary: 'Ray Grundy, N9CIB', Treasurer: 'Dick Manning, W9BUW', Custodian: 'Marc Stancy, WB9MAI'},
    {startYear: 1984, endYear: 1985, President: 'Art Lang, KR9K', VicePresident: 'Gene (Mac) McAleer, N9DUW', Secretary: 'Bob Schlotzer, N9CVA', Treasurer: 'Dick Manning, W9BUW', Custodian: 'Marc Stancy, WB9MAI'},
    {startYear: 1985, endYear: 1986, President: 'Gene (Mac) McAleer, N9DUW', VicePresident: 'Roberto Beltramelli, WD9FXC', Secretary: 'Terry Pelkola, KW0L', Treasurer: 'Dick Manning, W9BUW', Custodian: 'Marc Stancy, WB9MAI'},
    {startYear: 1976, endYear: 1987, President: 'Gene (Mac) McAleer, N9DUW', VicePresident: 'Dick Manning, W9BUW', Secretary: 'Nick Andrews, K9GVN', Treasurer: 'Ed Hungness, W0RJW', Custodian: 'Bob Satterfield, KA9TGP'},
    {startYear: 1987, endYear: 1988, President: 'Roberto Beltramelli, WD9FXC', VicePresident: 'John Kaufman, K9KEU', Secretary: 'Norman Dank, WD9GIQ', Treasurer: 'Ed Hungness, W0RJW', Custodian: 'Bob Satterfield, KA9TGP'},
    {startYear: 1988, endYear: 1989, President: 'Roberto Beltramelli, WD9FXC', VicePresident: 'Carl Schow, N9GZR', Secretary: 'John Jansinsian, NZ9K', Treasurer: 'Ted Southworth, KA9WFG', Custodian: 'Bob Satterfield, KA9TGP'},
    {startYear: 1989, endYear: 1990, President: 'Marty Kennedy, KA9RCC', VicePresident: 'Carl Schow, N9GZR', Secretary: 'Bob Fairbairn, N9HFW', Treasurer: 'Ted Southworth, KA9WFG', Custodian: 'Bob Satterfield, KA9TGP'},
    
    {startYear: 1990, endYear: 1991, President: 'Marty Kennedy, KA9RCC', VicePresident: 'Pat Byrne, K9JAU', Secretary: 'Carl Schow, N9GZR', Treasurer: 'Dan Hoelker, KA9MHK', Custodian: 'Bob Satterfield, N9IPP'},
    {startYear: 1991, endYear: 1992, President: 'Pat Byrne, K9JAU', VicePresident: 'Michael Ryan, N9JEQ', Secretary: 'Marty Kennedy, KA9RCC', Treasurer: 'Dan Hoelker, KA9MHK', Custodian: 'Bob Satterfield, N9IPP'},
    {startYear: 1992, endYear: 1993, President: 'Pat Byrne, K9JAU', VicePresident: 'Michael Ryan, N9JEQ', Secretary: 'Marty Kennedy, KA9RCC', Treasurer: 'Donald Motz, N9NYX', Custodian: 'Bill Ponall, KA9WLS'},
    {startYear: 1993, endYear: 1994, President: 'Michael Ryan, N9JEQ', VicePresident: 'Tom Churchill, WD9DAU', Secretary: 'Bruce Sabalasky, KD9XT', Treasurer: 'Donald Motz, N9NYX', Custodian: 'Bill Ponall, KA9WLS'},
    {startYear: 1994, endYear: 1995, President: 'David Bullen, N9PWC', VicePresident: 'Dave Rickerson, WB9NKL', Secretary: 'Pat Byrne, K9JAU', Treasurer: 'John Cheney, N9MWF', Custodian: 'Bill Ponall, KA9WLS'},
    {startYear: 1995, endYear: 1996, President: 'Susan Hensel, AA9MO', VicePresident: 'Peter Barr, KF9NR', Secretary: 'Jim Knutson, KD0AV', Treasurer: 'John Cheney, N9MWF', Custodian: 'Don Drake, K9VGN'},
    {startYear: 1996, endYear: 1997, President: 'Susan Hensel, AA9MO', VicePresident: 'Peter Barr, KF9NR', Secretary: 'Ron Hensel, K9ZZE', Treasurer: 'John Cheney, N9MWF', Custodian: 'Don Drake, K9VGN'},
    {startYear: 1997, endYear: 1998, President: 'Victoria Keith, KA9OEB', VicePresident: 'Gary Henle, N9VLL', Secretary: 'Ron Rateno, N0EPT', Treasurer: 'John Cheney, N9MWF', Custodian: 'Tom Wilson, N9OKQ'},
    {startYear: 1998, endYear: 1999, President: 'Wayne Kiser, KF9JC', VicePresident: 'Steven Grade, N9TPK', Secretary: 'Ruth Kwarta, KA9RZG', Treasurer: 'John Truitt, W9LQL', Custodian: 'Tom Wilson, N9OKQ'},
    {startYear: 1999, endYear: 2000, President: 'Wayne Kiser, KF9JC', VicePresident: 'Janie Gallina, KB9RTQ', Secretary: 'Ruth Kwarta, KA9RZG', Treasurer: 'John Truitt, W9LQL', Custodian: 'Kurt Rubin, KB9RTO'},
    
    {startYear: 2000, endYear: 2001, President: 'Joe Lefebvre, N9WRO', VicePresident: 'Janie Gallina, AE9JG', Secretary: 'Robert Mitilieri, N9EF', Treasurer: 'John Truitt, W9LQL', Custodian: 'Kurt Rubin, KB9RTO'},
    {startYear: 2001, endYear: 2002, President: 'Joe Lefebvre, N9WRO', VicePresident: 'Chris Cieslak, KC9L', Secretary: 'Robert Mitilieri, N9EF', Treasurer: 'Kim Weiss, N9XE', Custodian: 'Kurt Rubin, KB9RTO'},
    {startYear: 2002, endYear: 2003, President: 'Bob Fairbairn, KE9A', VicePresident: 'Steve Petersen, N9OA', Secretary: 'Robert Mitilieri, N9EF', Treasurer: 'Kim Weiss, N9XE', Custodian: 'Roberto Beltramelli, WA9E'},
    {startYear: 2003, endYear: 2004, President: 'Mike Wolff, AB9AX', VicePresident: 'Steve Petersen, N9OA', Secretary: 'Robert Mitilieri, N9EF', Treasurer: 'Jack Feldman, KA9HEL', Custodian: 'Roberto Beltramelli, WA9E'},
    {startYear: 2004, endYear: 2005, President: 'Mike Wolff, AB9AX', VicePresident: 'Steve Petersen, N9OA', Secretary: 'Mary James Plantz, K9GAL', Treasurer: 'Jack Feldman, KA9HEL', Custodian: 'Roberto Beltramelli, WA9E'},
    {startYear: 2005, endYear: 2006, President: 'Peter Richey, N9HDW', VicePresident: 'Bruce Plantz, K9OZ', Secretary: 'Mary James Plantz, K9GAL', Treasurer: 'Ken Kwasniewski, N9HQ', Custodian: 'Kurt Rubin, KB9RTO'},
    {startYear: 2006, endYear: 2007, President: 'Don Motz Jr., N9NYX', VicePresident: 'Bruce Plantz, K9OZ', Secretary: 'Todd Carr, KC9HKN', Treasurer: 'Ken Kwasniewski, N9HQ', Custodian: 'Bob Krueger, W9BK'},
    {startYear: 2007, endYear: 2008, President: 'Don Motz Jr., N9NYX', VicePresident: 'Peter Maziuk, KB9KZO', Secretary: 'Todd Carr, KC9HKN', Treasurer: 'Ken Kwasniewski, N9HQ', Custodian: 'Bob Krueger, W9BK'},
    {startYear: 2008, endYear: 2009, President: 'Mark Potter, W9UZ', VicePresident: 'John Siepmann, N9NA', Secretary: 'Steve Peterson, N9OA', Treasurer: 'Ken Kwasniewski, N9HQ', Custodian: 'Bob Krueger, W9BK'},
    {startYear: 2009, endYear: 2010, President: 'Mark Potter, W9UZ', VicePresident: 'John Faber, WT9Y', Secretary: 'Steve Peterson, N9OA', Treasurer: 'Ken Kwasniewski, N9HQ', Custodian: 'Bob Krueger, W9BK'},
    
    {startYear: 2010, endYear: 2011, President: 'Steve Peterson, N9OA', VicePresident: 'John Faber, WT9Y', Secretary: 'Kevin Oleniczak, AB9RN', Treasurer: 'Ken Kwasniewski, N9HQ', Custodian: 'Bruce Dillingham, KA0DSF'},
    {startYear: 2011, endYear: 2012, President: 'Steve Peterson, N9OA', VicePresident: 'Joe Grosshauser, K9JWG', Secretary: 'Kevin Oleniczak, AB9RN', Treasurer: 'Ken Kwasniewski, N9HQ', Custodian: 'Bruce Dillingham, KA0DSF'},
    {startYear: 2012, endYear: 2013, President: 'Steve Peterson, N9OA', VicePresident: 'Mary Tuohy, KC9IJO', Secretary: 'Kevin Oleniczak, AB9RN', Treasurer: 'Ken Kwasniewski, N9HQ', Custodian: 'Dale Kwarta, NJ9E'},
    {startYear: 2013, endYear: 2014, President: 'Kevin Oleniczak, AB9RN', VicePresident: 'Peter Richey, N9HDW', Secretary: 'Ken Kwasniewski, N9HQ', Treasurer: 'Carol Schroeder, KB9FYL', Custodian: 'Dale Kwarta, NJ9E'},
    {startYear: 2014, endYear: 2015, President: 'Kevin Oleniczak, AB9RN', VicePresident: 'Peter Richey, N9HDW', Secretary: 'Ken Kwasniewski, N9HQ', Treasurer: 'Carol Schroeder, KB9FYL', Custodian: 'Dale Kwarta, NJ9E'},
    {startYear: 2015, endYear: 2016, President: 'Michael Wilson, N0MO', VicePresident: 'Timothy Wheeler, KC9YFI', Secretary: 'Ken Kwasniewski, N9HQ', Treasurer: 'Carol Schroeder, KB9FYL', Custodian: 'Dale Kwarta, NJ9E'},
    {startYear: 2016, endYear: 2017, President: 'Al Sawyer, K9ILF', VicePresident: 'Timothy Wheeler, KC9YFI', Secretary: 'Ken Kwasniewski, N9HQ', Treasurer: 'Carol Schroeder, KB9YFL', Custodian: 'Dale Kwarta, NJ9E'},
    {startYear: 2017, endYear: 2018, President: 'Al Sawyer, K9ILF', VicePresident: 'Michael Bauer, W7GW', Secretary: 'Ken Kwasniewski, N9HQ', Treasurer: 'Carol Schroeder, KB9YFL', Custodian: 'Dale Kwarta, NJ9E'},
    {startYear: 2018, endYear: 2019, President: 'Steve Jirsa, KB9RCO', VicePresident: 'Mark Spoo, N9VDQ', Secretary: 'Ken Kwasniewski, N9HQ', Treasurer: 'Carol Schroeder, KB9FYL', Custodian: 'Mike Wilson, N0MO'},
    {startYear: 2019, endYear: 2020, President: 'Steve Jirsa, KB9RCO', VicePresident: 'John Cheney, N9MWF', Secretary: 'Ken Kwasniewski, N9HQ', Treasurer: 'Carol Schroeder, KB9FYL', Custodian: 'Mike Wilson, N0MO'},

    {startYear: 2020, endYear: 2021, President: 'Scott DeSantis, KB9VRW', VicePresident: 'John Cheney, N9MWF', Secretary: 'Ken Kwasniewski, N9HQ', Treasurer: 'Carol Schroeder, KB9FYL', Custodian: 'Mike Wilson, N0MO'}

]

			
module.exports = {
    pastOfficers
}