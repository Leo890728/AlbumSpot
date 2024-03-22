function typingEffect(elm, text, speed, textCursor, keepCursor) {
    if (!elm) { return };

    let textSpan = document.createElement('span');
    let cursorSpan = document.createElement('span');
    cursorSpan.innerText = textCursor;

    elm.appendChild(textSpan);
    elm.appendChild(cursorSpan);

    let blinkIntervalID = setInterval(
        function () {
            let visible = cursorSpan.style.visibility == 'visible';
            cursorSpan.style.visibility = visible ? 'hidden' : 'visible';
        }, 250
    )
    for (let i = 0; i <= text.length; i++) {
        setTimeout(function () {
            textSpan.innerHTML += text.charAt(i);
        }, speed * i);
    }

    setTimeout(
        function () {
            if (!keepCursor) {
                cursorSpan.style.display = 'none';
                clearInterval(blinkIntervalID)
            }
        }, text.length * speed
    )
}

function applyTypingEffect() {
    let elms = document.querySelectorAll('.typing');
    for (let elm of elms) {
        let text = elm.getAttribute('typing') || '';
        let delay = elm.getAttribute('delay') || 100;
        let speed = elm.getAttribute('speed') || 100;
        let textCursor = elm.getAttribute('textCursor') || "|";
        let keepCursor = elm.getAttribute('keepCursor') == "true";
        setTimeout(
            function () {
                typingEffect(elm, text, speed, textCursor, keepCursor);
            },
            delay
        );
    }
}