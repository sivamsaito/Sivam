let timer = 30; // 30 सेकंड का टाइमर
let timerDisplay = document.getElementById("time");
let userInput = document.getElementById("user-input");
let testText = document.getElementById("test-text");
let resultBox = document.getElementById("result-box");
let interval;
let typingStarted = false;

// टेक्स्ट की लिस्ट (डायनामिक रेंडरिंग के लिए)
const textList = [
    "Sedimentary rocks are formed at the surface of the Earth by the accumulation and cementation of fragments of earlier rocks.",
    "Programming languages like Python, Java, and C++ have transformed the way we solve problems.",
    "The quick brown fox jumps over the lazy dog.",
    "Typing is a crucial skill that improves with consistent practice and focus.",
    "Artificial intelligence is revolutionizing industries and reshaping the future."
];

// फंक्शन: रैंडम टेक्स्ट चुनना और दिखाना
function loadRandomText() {
    const randomIndex = Math.floor(Math.random() * textList.length);
    testText.textContent = textList[randomIndex]; // नया टेक्स्ट दिखाएं
}

// फंक्शन: WPM की गणना और दिखाना
function calculateWPM() {
    const typedText = userInput.value.trim();
    const wordsTyped = typedText.split(/\s+/).filter(word => word).length; // शब्दों की गिनती
    const timeElapsed = 30 - timer; // जो समय बीत चुका है
    const wpm = Math.round((wordsTyped / timeElapsed) * 60); // WPM की गणना

    // परिणाम को बॉक्स में दिखाएं
    resultBox.textContent = `Your Words Per Minute (WPM): ${wpm > 0 ? wpm : 0}`;
    resultBox.style.display = "block"; // बॉक्स को दिखाएं
}

// फंक्शन: टाइमर शुरू करना
function startTypingTest() {
    if (typingStarted) return; // अगर पहले से शुरू है, तो कुछ न करें
    typingStarted = true; // टाइपिंग शुरू हो चुकी है
    interval = setInterval(() => {
        timer--;
        timerDisplay.textContent = formatTime(timer);

        if (timer <= 0) {
            clearInterval(interval);
            userInput.disabled = true; // इनपुट बंद कर दें
            calculateWPM(); // WPM दिखाएं
        }
    }, 1000);
}

// फंक्शन: समय को फॉर्मेट करें (मिनट:सेकंड)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// इवेंट: टाइपिंग शुरू होने पर टाइमर चालू करें
userInput.addEventListener("input", startTypingTest);

// पेज लोड होने पर रैंडम टेक्स्ट दिखाएं
window.onload = loadRandomText;
