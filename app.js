
function app(people) {
    displayWelcome();
    runSearchAndMenu(people);
    return exitOrRestart(people);
}

function displayWelcome() {
    alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
    const searchResults = searchPeopleDataSet(people);

    if (searchResults.length > 1) {
        displayPeople('Search Results', searchResults);
    }
    else if (searchResults.length === 1) {
        const person = searchResults[0];
        mainMenu(person, people);
    }
    else {
        alert('No one was found in the search.');
    }
}

//----------------------------------------------------------------------------------------------------------
// search... methods
//----------------------------------------------------------------------------------------------------------

function searchPeopleDataSet(people) {

    const searchTypeChoice = validatedPrompt(
        'Please enter in what type of search you would like to perform.',
        ['id', 'name', 'gender', 'date of birth', 'height', 'weight', 'eye color', 'occupation']
    );

    let results = [];
    switch (searchTypeChoice) {
        case 'id':
            results = searchById(people);
            break;
        case 'name':
            results = searchByName(people);
            break;
        case 'gender':
            results = searchByGender(people);
            break;
        case 'date of birth':
            results = searchByDOB(people);
            break;
        case 'height':
            results = searchByHeight(people);
            break;
        case 'weight':
            results = searchByWeight(people);
            break;
        case 'eye color':
            results = searchByEyeColor(people);
            break;    
        case 'occupation':
            results = searchByOccupation(people);
            break;
        default:
            return searchPeopleDataSet(people);
    }

    return results;
}

function searchById(people) {
    const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
    const idToSearchForInt = parseInt(idToSearchForString);
    const idFilterResults = people.filter(person => person.id === idToSearchForInt);
    return idFilterResults;
}

function searchByName(people) {
    const firstNameToSearchFor = prompt('Please enter the the first name of the person you are searching for.');
    const lastNameToSearchFor = prompt('Please enter the the last name of the person you are searching for.');
    const fullNameSearchResults = people.filter(person => (person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() && person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()));
    return fullNameSearchResults;
}

function searchByGender(people) {
    const genderToSearchFor = prompt('Please enter in desired gender to search for.');
    const genderFilterResults = people.filter(person=> (person.gender.toLowerCase() === genderToSearchFor.toLowerCase()));
    return genderFilterResults;
}

function searchByDOB(people) {
    const dobToSearchFor = prompt('Please enter in desired mm/dd/yyyy to search for.');
    const dobFilterResults = people.filter(person=> person.dob === dobToSearchFor);
    return dobFilterResults;

}

function searchByHeight(people) {
    const heightToSearchForString = prompt('Please enter is desired height (inches) to search for.');
    const heightToSearchForInt = parseInt(heightToSearchForString)
    const heightFilterResults = people.filter(person=> person.height === heightToSearchForInt);
    return heightFilterResults;
}

function searchByWeight(people) {
    const weightToSearchForString = prompt('Please enter is desired weight (pounds) to search for.');
    const weightToSearchForInt = parseInt(weightToSearchForString)
    const weightFilterResults = people.filter(person=> person.weight === weightToSearchForInt);
    return weightFilterResults;
}

function searchByEyeColor(people) {
    const eyeColorToSearchFor = prompt('Please enter in desired Eye Color to search for.');
    const eyeColorFilterResults = people.filter(person=> (person.eyeColor.toLowerCase() === eyeColorToSearchFor.toLowerCase()));
    return eyeColorFilterResults;
}

function searchByOccupation(people) {
    const occupationToSearchFor = prompt('Please enter in desired occupation to search for.');
    const occupationFilterResults = people.filter(person => (person.occupation.toLowerCase() === occupationToSearchFor.toLowerCase()));
    return occupationFilterResults;
}
//----------------------------------------------------------------------------------------------------------
// main... methods
//----------------------------------------------------------------------------------------------------------

function mainMenu(person, people) {

    const mainMenuUserActionChoice = validatedPrompt(
        `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
        ['info', 'family', 'descendants', 'quit']
    );

    switch (mainMenuUserActionChoice) {
        case "info":
            displayPersonInfo(person);
            break;
        case "family":
            //! TODO
            // let personFamily = findPersonFamily(person, people);
            // displayPeople('Family', personFamily);
            break;
        case "descendants":
            //! TODO
            // let personDescendants = findPersonDescendants(person, people);
            // displayPeople('Descendants', personDescendants);
            break;
        case "quit":
            return;
        default:
            alert('Invalid input. Please try again.');
    }

    return mainMenu(person, people);
}

//----------------------------------------------------------------------------------------------------------
// display...Method
//----------------------------------------------------------------------------------------------------------

function displayPersonInfo(person) {
    let personInfo =  `First Name: ${person.firstName}\n`;
        personInfo += `Last Name:  ${person.lastName}\n`;
        personInfo += `Gender:     ${person.gender}\n`;
        personInfo += `DOB:        ${person.dob}\n`;
        personInfo += `Height:     ${person.height}\n`;
        personInfo += `Weight:     ${person.weight}\n`;
        personInfo += `Eye Color:  ${person.eyeColor}\n`;
        personInfo += `Occupation: ${person.occupation}`;
    alert(`${personInfo}`);
}

function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).join('\n');
    alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

function validatedPrompt(message, acceptableAnswers) {
    acceptableAnswers = acceptableAnswers.map(aa => aa.toLowerCase());

    const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')}`;

    const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

    if (acceptableAnswers.includes(userResponse)) {
        return userResponse;
    }
    else {
        alert(`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')} \n\nPlease try again.`);
        return validatedPrompt(message, acceptableAnswers);
    }
}

function exitOrRestart(people) {
    const userExitOrRestartChoice = validatedPrompt(
        'Would you like to exit or restart?',
        ['exit', 'restart']
    );

    switch (userExitOrRestartChoice) {
        case 'exit':
            return;
        case 'restart':
            return app(people);
        default:
            alert('Invalid input. Please try again.');
            return exitOrRestart(people);
    }

}