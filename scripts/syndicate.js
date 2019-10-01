let selectedMembers = [];

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    selectedMembers = [];
    for (let i = 0; i < 4; i++) {
        selectedMembers.push('');
    }
    getSyndicateMembers();
});

function getSyndicateMembers() {
    const imagesContainer = document.getElementById('images');
    if (imagesContainer) {
        for (const item of imagesContainer.children) {
            item.addEventListener('click', addMember);
        }
    }
}

function addMember(event) {
    const title = event.target.title ? event.target.title : event.target.parentElement ? event.target.parentElement.title : null;
    console.log(title);
    if (!selectedMembers.includes(title.trim())) {
        selectedMembers.shift();
        selectedMembers.push(title.trim());
        updateDOM();
    }
}

function removeMember(event) {
    selectedMembers = selectedMembers.filter(item => item !== event.target.title.trim());
    selectedMembers.push('');
    updateDOM();
}

function updateDOM() {
    const domToRender = [];
    for (let i = 0; i < selectedMembers.length; i++) {
        const item = selectedMembers[ i ];
        if (item === '') {
            domToRender.unshift('<span class="syndicate-button">\n' +
                `<div class="button-image inline-block" id="member${ i }">&nbsp;</div>\n</span>`);
        } else {
            domToRender.unshift('<span class="syndicate-button">\n' +
                `<img class="button-image inline-block" id="member${ i }" src='./images/${ item }.jpg' alt='${ item }' title='${ item }'></span>`);
        }
    }
    let domString = '';
    for (const item of domToRender) {
        domString += item;
    }
    document.getElementById('selectedMembers').innerHTML = domString;
    registerRemoveSyndicateMemberHandler();
}

function registerRemoveSyndicateMemberHandler() {
    for (let i = 0; i < 4; i++) {
        if (selectedMembers[ i ] !== '') {
            document.getElementById(`member${ i }`).addEventListener('click', removeMember);
        }
    }
}
