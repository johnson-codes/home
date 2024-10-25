// IMPORTANT: This is for development purposes only. Never use this in production!
let OPENAI_API_KEY = localStorage.getItem('OPENAI_API_KEY');

if (!OPENAI_API_KEY) {
    OPENAI_API_KEY = prompt("Please enter your OpenAI API key (it will be saved in your browser):");
    if (OPENAI_API_KEY) {
        localStorage.setItem('OPENAI_API_KEY', OPENAI_API_KEY);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const wordInput = document.getElementById('word-input');
    const resultDiv = document.getElementById('result');
    const wordOfDayDiv = document.getElementById('word-of-day');

    searchBtn.addEventListener('click', () => {
        const word = wordInput.value.trim();
        if (word) {
            lookupWord(word);
        }
    });

    // Fetch word of the day on page load
    fetchWordOfDay();

    async function lookupWord(word) {
        if (!OPENAI_API_KEY) {
            resultDiv.innerHTML = '<p>Please provide a valid API key.</p>';
            return;
        }
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{
                        role: "user",
                        content: `Provide the following for the word "${word}":
                        1. Definition
                        2. Three synonyms
                        3. Two example sentences
                        Format the response in HTML.`
                    }]
                })
            });

            const data = await response.json();
            resultDiv.innerHTML = data.choices[0].message.content;
        } catch (error) {
            console.error('Error:', error);
            resultDiv.innerHTML = '<p>Sorry, an error occurred. Please try again later.</p>';
        }
    }

    async function fetchWordOfDay() {
        if (!OPENAI_API_KEY) {
            wordOfDayDiv.innerHTML = '<p>Please provide a valid API key to fetch the word of the day.</p>';
            return;
        }
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{
                        role: "user",
                        content: "Suggest a word of the day with its definition. Format the response in HTML."
                    }]
                })
            });

            const data = await response.json();
            wordOfDayDiv.innerHTML = data.choices[0].message.content;
        } catch (error) {
            console.error('Error:', error);
            wordOfDayDiv.innerHTML = '<p>Unable to fetch word of the day. Please try again later.</p>';
        }
    }
});
