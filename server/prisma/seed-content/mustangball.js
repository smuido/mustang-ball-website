// Historical staff and judge records for each past Mustang Ball, one
// export per year. Used by the Past Events page to fill in the details
// table for whichever year is selected.
//
// To add a new year once it's happened:
//   1. Copy the block for the most recent year below.
//   2. Change `year2026` to `year20XX` (the new year).
//   3. Fill in the names for each role, and remove any roles that don't
//      apply. You can also add new role names — whatever key you use
//      becomes the row label on the page automatically.
//   4. Set `resultsType` to 'PDF' or 'link', and `resultsFile` to the PDF
//      path or results URL.
//   5. Add a matching entry in pastEvents.js with the year's title and
//      dates so it shows up in the archive list.

export const year2007 = {
	chairmanOfJudges: ['Ava Kaye'],
	adjudicators: ['Nigel Clarke', 'Tom Hicks', 'Porfirio Landeros', 'Laetitia Santore', 'Alex Zagrean'],
	professionalShowcase: ['Porfirio Landeros', 'Laetitia Santore'],
	masterOfCeremonies: ['Linda Drake'],
	scrutineer: ['Ava Kaye'],
	competitionOrganizer: ['Christopher Ellwood'],
	financialCoordinator: ['Laurel Warwick'],
	registrars: ['Hallie Scott', 'Lea Shelton'],
	awardsCoordinator: ['Katie Bianchi'],
	fundraisingCoordinator: ['Audrey Long'],
	registrationCoordinator: ['Ashley Moraes'],
	housingCoordinator: ['Ember Jensen'],
	hospitalityCoordinator: ['Serena Clune'],
	competitionConsultant: ['Jessica Kao'],
	graphicDesign: ['Ilana Kellogg'],
	mediaRelations: ['Luis Anaya'],
	headDeckCaptain: ['Ryan Manus'],
    resultsType: 'PDF',
    resultsFile: 'src\\assets\\results\\2007_mustang_ball_results.pdf'
}

export const year2008 = {
	chairmanOfJudges: ['Rex Lewis'],
	adjudicators: ['Nigel Clarke', 'Aliona Proskurov', 'Leonidus Proskurov', 'Roberta Sun', 'Alex Zagrean'],
	professionalShowcase: ['Aliona Proskurov', 'Leonidus Proskurov'],
	masterOfCeremoniesAndDj: ['Wesley Acker'],
	scrutineer: ['Jessica Parra'],
	competitionOrganizer: ['Christopher Ellwood'],
	registrars: ['Laura LaGassa'],
	financialCoordinator: ['Eily Murphy'],
	awardsCoordinator: ['Hallie Scott'],
	hospitalityCoordinator: ['Danielle Sanzari'],
	housingCoordinator: ['Alex Vincent'],
	volunteerCoordinator: ['Ashley Moraes'],
	silentAuctionCoordinator: ['Hallie Scott'],
	headDeckCaptain: ['Ryan Manus'],
	headRunner: ['Chad Clawitter'],
	photographer: ['Brian Kurotsuchi'],
    resultsType: 'PDF',
    resultsFile: 'src\\assets\\results\\2008_mustang_ball_results.pdf'
}

export const year2009 = {
	chairmanOfJudges: ['Nigel Clarke'],
	adjudicators: ['Linda Drake', 'Youriy Pavlov', 'Anna Shahbazyan', 'Roberta Sun', 'Alex Zagrean'],
	professionalShowcase: ['Youriy Pavlov', 'Anna Shahbazyan'],
	masterOfCeremoniesAndDj: ['Wesley Acker'],
	scrutineer: ['Christopher Ellwood'],
	competitionOrganizer: ['Eily Murphy'],
	registrars: ['Christopher Ellwood'],
	volunteerCoordinator: ['Sean Stavropoulos'],
	fundraisingCoordinator: ['Jade Blessinger'],
	decorationsCoordinator: ['Lori Todd'],
	housingCoordinator: ['Ann Huang'],
	graphicDesign: ['Analia Pribyl'],
	awardsCoordinator: ['Sara Whitney'],
	headDeckCaptain: ['Laura Rice'],
    resultsType: 'PDF',
    resultsFile: 'src\\assets\\results\\2009_mustang_ball_scoresheets.pdf'
}

export const year2011 = {
	chairmanOfJudges: ['Ava Kaye'],
	adjudicators: ['Nigel Clarke', 'Joanna Siekierska', 'Steve Vasco', 'Alex Zagrean'],
	professionalShowcase: ['Steve Vasco', 'Joanna Siekierska'],
	masterOfCeremonies: ['Paul Jack'],
	musicDirector: ['Wes Acker'],
	scrutineer: ['Ava Kaye'],
	competitionOrganizer: ['Christopher Ellwood'],
	financialCoordinator: ['Laura Rice'],
	fundraisingCoordinator: ['Jessica Freedman'],
	awardsCoordinator: ['Amy Leung'],
	volunteerCoordinator: ['Analia Pribyl'],
	decorationsCoordinator: ['Khoa Nguyen'],
	housingCoordinator: ['Brett Hartt'],
	graphicDesign: ['Jade Blessinger'],
    resultsType: 'PDF',
    resultsFile: 'src\\assets\\results\\2011_mustang_ball_results.pdf'
}

export const year2012 = {
	chairmanOfJudgesAndScrutineer: ['Ava Kaye'],
	adjudicators: ['Borbala Bunnett', 'Monika Olejnik', 'Steve Vasco', 'David Weise', 'Alex Zagrean'],
	professionalShowcase: ['David Weise', 'Borbala Bunnett'],
	masterOfCeremonies: ['Paul Jack'],
	musicDirector: ['Dave Ingalz'],
	competitionOrganizerAndRegistrar: ['Christopher Ellwood'],
	assistantCompetitionOrganizer: ['Amy Leung'],
	financialCoordinator: ['Carlos Mena'],
	hospitalityCoordinator: ['Julia de Moor'],
	volunteerCoordinator: ['Kelsy Westendorf'],
	decorationsCoordinator: ['Khoa Nguyen'],
	fundraisingCoordinator: ['Andy Brock'],
	housingCoordinator: ['Melody Curren'],
	graphicDesign: ['Analia Pribyl'],
    resultsType: 'link',
    resultsFile: 'https://results.o2cm.com/event3.asp?event=cpd12'
}

export const year2013 = {
	chairmanOfJudgesAndScrutineer: ['Ava Kaye'],
	adjudicators: ['Jonathan Atkinson', 'Lorena Bravo', 'Nigel Clarke', 'Monika Olejnik', 'David Weise', 'Alex Zagrean'],
	professionalShowcase: ['Jonathan Atkinson', 'Lorena Bravo'],
	masterOfCeremonies: ['Paul Jack'],
	musicDirector: ['Turtle Brennan'],
	competitionOrganizerAndRegistrar: ['Christopher Ellwood'],
	assistantCompetitionOrganizer: ['Amy Leung'],
	financialCoordinator: ['Sasha Kravets'],
	hospitality: ['Julia de Moor'],
	graphicDesign: ['Khoa Nguyen'],
	volunteerCoordinator: ['Lonnie Bissmeyer'],
	publicity: ['Andrew Brock'],
    resultsType: 'link',
    resultsFile: 'https://results.o2cm.com/event3.asp?event=cpd13'
}

export const year2014 = {
	chairmanOfJudgesAndScrutineer: ['Ava Kaye'],
	adjudicators: ['Jonathan Atkinson', 'Lorena Bravo', 'Nigel Clarke', 'Vitalii Proskurin', 'David Weise', 'Alex Zagrean', 'Evgenia Zhatilova'],
	professionalShowcase: ['Vitalii Proskurin', 'Evgenia Zhatilova'],
	masterOfCeremonies: ['Paul Jack'],
	musicDirector: ['Turtle Brennan'],
	competitionOrganizerAndRegistrar: ['Christopher Ellwood'],
	assistantCompetitionOrganizer: ['Alicia Hammond'],
	financialCoordinator: ['Danyele Rampone'],
	publicity: ['Marie Grap'],
	volunteerCoordinator: ['Benjamin Lin'],
	hospitality: ['Zachary Hatton'],
	graphicDesign: ['Colin Keane'],
	volunteers: ['Julia de Moor', 'Jordan Berkel', 'Paul Daniels', 'Samantha Higgins', 'Amy Leung', 'Andrew Notohamiprodjo', 'Brittany Shakespear', 'Alpha Phi Omega, Zeta Omicron Chapter'],
	officialSponsors: ['The Crushed Grape', 'Hampton Inn & Suites San Luis Obispo', 'Ballroom Connection'],
    resultsType: 'link',
    resultsFile: 'https://results.o2cm.com/event3.asp?event=cpd14'
}

export const year2015 = {
	chairmanOfJudgesAndInviligator: ['Trevor Luff'],
	adjudicators: ['Jonathan Atkinson', 'Bonnie Bayard', 'Iaroslav Bieliei', 'Lorena Bravo', 'Nigel Clarke', 'Olga Tsikalyuk', 'David Weise', 'Alex Zagrean'],
	professionalShowcase: ['Iaroslav Bieliei', 'Olga Tsikalyuk'],
	masterOfCeremonies: ['Paul Jack'],
	musicDirector: ['Dave Ingalz'],
    resultsType: 'link',
    resultsFile: 'https://results.o2cm.com/event3.asp?event=cpd15'
}

export const year2016 = {
	chairmanOfJudgesAndMasterOfCeremonies: ['David Weise'],
	adjudicators: ['Lorena Bravo', 'Nigel Clarke', 'Ikaika Dowsett', 'Sam Enriquez', 'Briana Haft', 'Kris Suakjian', 'Roberta Sun', 'Alex Zagrean'],
	professionalShowcase: ['Kris Suakjian', 'Briana Haft'],
	musicDirector: ['Dave Ingalz'],
    resultsType: 'link',
    resultsFile: 'https://results.o2cm.com/event3.asp?event=cpd16'
}

export const year2017 = {
	chairmanOfJudgesAndMasterOfCeremonies: ['David Weise'],
	adjudicators: ['Lorena Bravo', 'Nigel Clarke', 'Ikaika Dowsett', 'Sam Enriquez', 'Briana Haft', 'Kris Suakjian', 'Roberta Sun', 'Alex Zagrean'],
	professionalShowcase: ['Kris Suakjian', 'Briana Haft'],
	musicDirector: ['Dave Ingalz'],
    resultsType: 'link',
    resultsFile: 'https://results.o2cm.com/event3.asp?event=cpd17'
}

export const year2018 = {
	chairmanOfJudgesAndMasterOfCeremonies: ['David Weise'],
	adjudicators: ['Jonathan Atkinson', 'Lorena Bravo', 'Nigel Clarke', 'Ikaika Dowsett', 'Roberta Sun', 'Alex Zagrean'],
	professionalShowcase: ['Andrey Voloshko', 'Kateryna Kyrylenko'],
	musicDirector: ['Dave Ingalz'],
    resultsType: 'link',
    resultsFile: 'https://results.o2cm.com/event3.asp?event=cpd18'
}

export const year2019 = {
	chairmanOfJudges: ['David Weise'],
	adjudicators: ['Jonathan Atkinson', 'Lorena Bravo', 'Ikaika Dowsett', 'Maksim Leonov', 'Vitalii Proskurin', 'Alicia Richardson', 'Roberta Sun', 'Anastasia Zhuchenko', 'Alex Zagrean'],
	professionalShowcase: ['Maksim Leonov', 'Anastasia Zhuchenko'],
	masterOfCeremonies: ['David Weise'],
	musicDirector: ['Dave Ingalz'],
	scrutineer: ['Denise Machin'],
	competitionDirector: ['Christopher Ellwood'],
    resultsType: 'link',
    resultsFile: 'https://results.o2cm.com/event3.asp?event=cpd19'
}

export const year2020 = {
	chairmanOfJudges: ['David Weise'],
	adjudicators: ['Jonathan Atkinson', 'Lorena Bravo', 'Ikaika Dowsett', 'Roman Drobotov', 'Daniele Gozzi', 'Liya Kazbekova', 'Vitalii Proskurin', 'Roberta Lanard', 'Alex Zagrean'],
	professionalShowcase: ['Roman Drobotov', 'Liya Kazbekova'],
	masterOfCeremonies: ['David Weise'],
	musicDirector: ['Dave Ingalz'],
	scrutineer: ['Denise Machin'],
	competitionDirector: ['Christopher Ellwood'],
	volunteerCoordinator: ['Meg Sintef'],
    resultsType: 'link',
    resultsFile: 'https://results.o2cm.com/event3.asp?event=cpd20'
}

export const year2022 = {
	chairmanOfJudges: ['David Weise'],
	adjudicators: ['Jonathan Atkinson', 'Lorena Bravo', 'Stacey Chuang', 'Ikaika Dowsett', 'Roberta Lanard', 'Alex Zagrean'],
	masterOfCeremonies: ['David Weise'],
	musicDirector: ['Dave Ingalz'],
	scrutineer: ['Denise Machin'],
	competitionDirector: ['Christopher Ellwood'],
	volunteerCoordinator: ['Tessa Zhang'],
    resultsType: 'link',
    resultsFile: 'https://results.o2cm.com/event3.asp?event=cpd22'
}

export const year2023 = {
	chairmanOfJudges: ['David Weise'],
	adjudicators: ['Jonathan Atkinson', 'Lorena Bravo', 'Stacey Chuang', 'Jennifer Marie Davis', 'Ikaika Dowsett', 'Roberta Lanard', 'Jason Rivers', 'Colin Williams', 'Alex Zagrean'],
	professionalShowcase: ['Jason Rivers', 'Jennifer Marie Davis'],
	masterOfCeremonies: ['David Weise'],
	musicDirector: ['Dave Ingalz'],
	scrutineer: ['Denise Machin'],
	competitionDirector: ['Christopher Ellwood'],
	volunteerCoordinator: ['Tessa Zhang'],
    resultsType: 'link',
    resultsFile: 'https://results.o2cm.com/event3.asp?event=cpd23'
}

export const year2024 = {
	chairmanOfJudges: ['David Weise'],
	masterOfCeremonies: ['David Weise'],
	adjudicators: ['Jonathan Atkinson', 'Ilie Bardahan', 'Lorena Bravo', 'Stacey Chuang', 'Ikaika Dowsett', 'Roberta Lanard', 'Marcus Johnson', 'Alex Zagrean', 'Anna Zotova'],
	professionalShowcase: ['Ilie Bardahan', 'Anna Zotova'],
	musicDirector: ['Dave Ingalz'],
	scrutineer: ['Denise Machin'],
	competitionDirector: ['Christopher Ellwood'],
	assistantCompetitionOrganizer: ['Michaela Sadler'],
	volunteerCoordinator: ['Katherine Reid'],
    resultsType: 'link',
    resultsFile: 'https://results.o2cm.com/event3.asp?event=cpd24'

}

export const year2025 = {
	chairmanOfJudges: ['David Weise'],
	masterOfCeremonies: ['David Weise'],
	adjudicators: ['Jonathan Atkinson', 'Lorena Bravo', 'Stacey Chuang', 'Ikaika Dowsett', 'Roberta Lanard', 'Marcus Johnson', 'Mishka Teleha', 'Oleg Teleha', 'Alexandru Zagrean'],
	professionalShowcase: ['Oleg Teleha', 'Mishka Teleha'],
	musicDirector: ['Dave Ingalz'],
	scrutineer: ['Denise Machin'],
	competitionDirector: ['Christopher Ellwood'],
	assistantCompetitionOrganizer: ['Kat Arrizon'],
	volunteerCoordinator: ['Mia Wootton'],
    resultsType: 'link',
    resultsFile: 'https://results.o2cm.com/event3.asp?event=cpd25'
}

export const year2026 = {
    chairmanOfJudges: ['David Weise'],
	masterOfCeremonies: ['David Weise'],
	adjudicators: ['Jonathan Atkinson', 'Lorena Bravo', 'Stacey Chuang', 'Ikaika Dowsett', 'Roberta Lanard', 'Marcus Johnson', 'Roxanne Milotti', 'Igor Colag', 'Alexandru Zagrean'],
	professionalShowcase: ['Igor Colag', 'Roxanne Milotti'],
	musicDirector: ['Annie Morales'],
	scrutineer: ['Denise Machin'],
	competitionDirector: ['Christopher Ellwood'],
	assistantCompetitionOrganizer: ['Rosalind Thies'],
    resultsType: 'link',
    resultsFile: 'https://results.o2cm.com/event3.asp?event=cpd25'
}