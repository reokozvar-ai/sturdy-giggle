document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const page1 = document.getElementById('page1Block');
    const page2 = document.getElementById('page2Block');
    const getVerifiedMain = document.getElementById('getVerifiedMain');
    const getVerifiedCta = document.getElementById('getVerifiedCta');
    const usernameInputMain = document.getElementById('robloxUsername');
    const ctaUsername = document.getElementById('finalCtaUsername');
    const backBtn = document.getElementById('backToPage1Btn');
    const usernameStrong = document.getElementById('usernameStrong');
    const displayUserDiv = document.getElementById('displayUser');
    const gameCard = document.getElementById('gameMethod');
    const codeCard = document.getElementById('codeMethod');
    const finalVerifyBtn = document.getElementById('finalVerifyBtn');
    const verifyMessage = document.getElementById('verifyMessage');

    let selectedMethod = null;      // 'game' or 'code'
    let currentUsername = '';       // stored after first page

    // helper: validate username 3-20 characters (trim)
    function isValidUser(name) {
        const trimmed = name.trim();
        return trimmed.length >= 3 && trimmed.length <= 20;
    }

    // clear message and revert style
    function resetMessage() {
        verifyMessage.textContent = '';
        verifyMessage.classList.remove('success-message');
        verifyMessage.style.color = '#ffaaa3';
        verifyMessage.style.background = '#482c36';
        verifyMessage.style.borderLeftColor = '#ff6161';
    }

    // show page2 with given username
    function showPage2(username) {
        currentUsername = username.trim();
        usernameStrong.textContent = currentUsername;
        displayUserDiv.innerHTML = `Username: <strong>${currentUsername}</strong>`;
        page1.classList.add('hidden');
        page2.classList.add('active');
        // reset method selection
        selectedMethod = null;
        gameCard.classList.remove('selected');
        codeCard.classList.remove('selected');
        resetMessage();
    }

    // show page1
    function showPage1() {
        page1.classList.remove('hidden');
        page2.classList.remove('active');
    }

    // unified handler for Get Verified buttons
    function handleGetVerified(inputElement) {
        const username = inputElement.value;
        if (!isValidUser(username)) {
            alert('Please enter a username between 3 and 20 characters.');
            return;
        }
        showPage2(username);
    }

    // event listeners for Get Verified buttons
    getVerifiedMain.addEventListener('click', (e) => {
        e.preventDefault();
        handleGetVerified(usernameInputMain);
    });

    getVerifiedCta.addEventListener('click', (e) => {
        e.preventDefault();
        handleGetVerified(ctaUsername);
    });

    // allow enter key on main input
    usernameInputMain.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleGetVerified(usernameInputMain);
        }
    });
    ctaUsername.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleGetVerified(ctaUsername);
        }
    });

    // back button
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPage1();
    });

    // method selection: game
    gameCard.addEventListener('click', () => {
        selectedMethod = 'game';
        gameCard.classList.add('selected');
        codeCard.classList.remove('selected');
        resetMessage();
    });

    // method selection: code
    codeCard.addEventListener('click', () => {
        selectedMethod = 'code';
        codeCard.classList.add('selected');
        gameCard.classList.remove('selected');
        resetMessage();
    });

    // final verify (Next) – check if method selected
    finalVerifyBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (!selectedMethod) {
            verifyMessage.textContent = '⚠️ pls finish verification first';
            verifyMessage.classList.remove('success-message');
            verifyMessage.style.color = '#ffaaa3';
            verifyMessage.style.background = '#482c36';
            verifyMessage.style.borderLeftColor = '#ff6161';
            return;
        }

        // success message based on method
        if (selectedMethod === 'game') {
            verifyMessage.textContent = '✅ Game verification successful (simulated).';
        } else {
            verifyMessage.textContent = '✅ Code verification successful (simulated).';
        }

        // apply success style
        verifyMessage.style.color = '#b8f0c0';
        verifyMessage.style.background = '#1b4a33';
        verifyMessage.style.borderLeftColor = '#61dd8e';
        verifyMessage.classList.add('success-message');
    });

    // additional: if user clicks back, reset method and error (already in showPage1)
    // but also ensure that if page1 is shown, no stray messages.
});
