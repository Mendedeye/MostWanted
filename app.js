
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
        ['id', 'name', 'gender', 'date of birth', 'height', 'weight', 'eye color', 'occupation', 'traits']
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
        case 'traits':
            results = searchByTraits(people);
            break;
        default:
            return searchPeopleDataSet(people);
    }

    return results;
}

function searchById(people) {
    const idToSearchForString =  validatedPrompt('Please enter the id of the person you are searching for.', people.map(person => `${person.id}`));
    const idToSearchForInt = parseInt(idToSearchForString);
    const idFilterResults = people.filter(person => person.id === idToSearchForInt);
    return idFilterResults;
}

function searchByName(people) {
    const firstNameToSearchFor = validatedPrompt('Please enter the first name of the person you are searching for.', people.map(person => `${person.firstName}`));
    const lastNameToSearchFor = validatedPrompt('Please enter the last name of the person you are searching for.', people.map(person => `${person.lastName}`));
    const fullNameSearchResults = people.filter(person => (person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() && person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()));
    return fullNameSearchResults;
}

function searchByGender(people) {
    const genderToSearchFor = validatedPrompt('Please enter in the desired gender to search for.', people.map(person => `${person.gender}`));
    const genderFilterResults = people.filter(person=> (person.gender.toLowerCase() === genderToSearchFor.toLowerCase()));
    return genderFilterResults;
}

function searchByDOB(people) {
    const dobToSearchFor = validatedPrompt('Please enter in your desired DOB', people.map(person => `${person.dob}`));
    const dobFilterResults = people.filter(person=> person.dob === dobToSearchFor);
    return dobFilterResults;

}

function searchByHeight(people) {
    const heightToSearchForString =  validatedPrompt('Please enter in your desired height (inches) to search for.', people.map(person => `${person.height}`));
    const heightToSearchForInt = parseInt(heightToSearchForString)
    const heightFilterResults = people.filter(person=> person.height === heightToSearchForInt);
    return heightFilterResults;
}

function searchByWeight(people) {
    const weightToSearchForString =  validatedPrompt('Please enter in your desired weight (pounds) to search for.', people.map(person => `${person.weight}`));
    const weightToSearchForInt = parseInt(weightToSearchForString)
    const weightFilterResults = people.filter(person=> person.weight === weightToSearchForInt);
    return weightFilterResults;
}

function searchByEyeColor(people) {
    const eyeColorToSearchFor =  validatedPrompt('Please enter in your desired eye color to search for.', people.map(person => `${person.eyeColor}`));
    const eyeColorFilterResults = people.filter(person=> (person.eyeColor.toLowerCase() === eyeColorToSearchFor.toLowerCase()));
    return eyeColorFilterResults;
}

function searchByOccupation(people) {
    const occupationToSearchFor =  validatedPrompt('Please enter in your desired occupation to search for', people.map(person => `${person.occupation}`));
    const occupationFilterResults = people.filter(person => (person.occupation.toLowerCase() === occupationToSearchFor.toLowerCase()));
    return occupationFilterResults;
}

function searchByTraits(people) {
    let traitToSearchFor = '';
    let tempArray = people;

    while(tempArray.length > 1 && traitToSearchFor != 'quit') {
        traitToSearchFor = prompt('Please enter in one of these traits to search for: \nName \nGender \nDate of Birth \nHeight \nWeight \nEye Color \nOccupation: \nQuit:');
        switch (traitToSearchFor) {
            case 'name':
                results = searchByName(tempArray);
                break;
            case 'gender':
                results = searchByGender(tempArray);
                break;
            case 'date of birth':
                results = searchByDOB(tempArray);
                break;
            case 'height':
                results = searchByHeight(tempArray);
                break;
            case 'weight':
                results = searchByWeight(tempArray);
                break;
            case 'eye color':
                results = searchByEyeColor(tempArray);
                break;    
            case 'occupation':
                results = searchByOccupation(tempArray);
                break;
            case 'quit':
                return tempArray;
            default:
                ('Please enter in a valid choice: ');
        }
        tempArray = results;
    };

    return tempArray;
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
            findPersonFamily(person, people);
            break;
        case "descendants":
            let descendants = recursionDescendants(person, people);
            displayPeople('Descendants', descendants);
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
//---------------------------------------------------------------------------------------------------------

function findPersonFamily(person, people) {
    let family = [];
    family = family.concat(findSpouse(person, people));
    family = family.concat(findParents(person, people));
    family = family.concat(findSiblings(person, people));
    displayPeople('Family:', family);
}

function findSpouse(person, people) {
    let spouse = people.filter(el => person.currentSpouse === el.id);
    return spouse;
}

function findParents(person, people) {
    let parents = people.filter(el => person.parents.includes(el.id));
    return parents;
}

function findSiblings(person, people) {
    let siblings = people.filter(function(el){
        if(person.parents[0] === el.parents[0] || person.parents[1] === el.parents[1]) {
            if(el != person){
                return true;
            }
        }
        else {
            return false;
        }
    });
    return siblings;
}

function addFirstAndLastNames(id) {
    let fullName = '';
    fullName = fullName.concat(id.firstName);
    fullName = fullName.concat(id.lastName);

    return fullName;
}
//---------------------------------------------------------------------------------------------------------

// The 'mvp' code before the recursion written in lines 268-281
//
// function findDescendants(person, people) {
// 	let personDescendants = people.filter(function(el) {
// 		if (el.parents[0] === person.id || el.parents[1] === person.id) {    
// 			return true;
// 		}
// 		else {
// 			return false;
// 		}
// 	})

// 	displayPeople('Descendants:', personDescendants);
// }

function recursionDescendants(searchedPerson, people) {
    let newDescendants = [];

    let descendants = people.filter(person => {
        if(person.parents.includes(searchedPerson.id)){
            newDescendants = recursionDescendants(person,people)
            return true
        }})
        if(newDescendants.length > 0) {
            descendants = descendants.concat(newDescendants);
        }

    return descendants;
}

function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).join('\n');
    alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

function validatedPrompt(message, acceptableAnswers) {
    acceptableAnswers = removeDuplicates(acceptableAnswers);

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

function removeDuplicates(array) {
    return array.filter((item, index) => array.indexOf(item) === index);
}