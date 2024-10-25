const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// Get API key from localStorage or prompt user
let OPENAI_API_KEY = localStorage.getItem('openai_api_key');

if (!OPENAI_API_KEY) {
    promptForApiKey();
}

function promptForApiKey() {
    OPENAI_API_KEY = prompt('Please enter your OpenAI API key to use the ADHD Support Assistant:');
    if (OPENAI_API_KEY) {
        localStorage.setItem('openai_api_key', OPENAI_API_KEY);
    } else {
        addMessage('Please provide an API key to use the chat assistant. You can get one from OpenAI.', 'bot');
    }
}

const ADHD_CONTEXT = `You are a friendly and understanding ADHD Support Assistant. Your approach should be:

1. Be conversational and casual - talk like a supportive friend
2. Keep responses short and simple - no more than 3 sentences
3. Ask questions to better understand the person's situation
4. Show empathy and understanding rather than lecturing
5. Use emojis occasionally (not in every message) to add warmth
6. Share personal-feeling insights rather than clinical information
7. Gently guide off-topic conversations back to ADHD with understanding

If someone goes off-topic, kindly redirect them with something like "I hear you! While I'd love to chat about that, I want to make sure I'm helping you with your ADHD journey. What's been your biggest ADHD challenge lately?"

Remember to be more of a supportive friend than an expert or teacher.`;

async function sendMessage() {
    if (!OPENAI_API_KEY) {
        promptForApiKey();
        return;
    }

    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    userInput.value = '';
    userInput.focus();

    // Create a placeholder for the typing indicator and upcoming message
    const messagePlaceholder = document.createElement('div');
    messagePlaceholder.classList.add('message', 'bot', 'typing-indicator');
    messagePlaceholder.innerHTML = `
        <div class="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </div>
    `;

    // Add the typing indicator to the messages container
    const messagesContainer = chatMessages.querySelector('.messages-container');
    messagesContainer.appendChild(messagePlaceholder);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        // Add artificial delay (2 seconds)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Try GPT-4o first
        let response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: ADHD_CONTEXT },
                    { role: "user", content: message }
                ],
                temperature: 0.8,
                max_tokens: 150
            })
        });

        // If GPT-4o fails, try GPT-4o-mini
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('openai_api_key');
                messagePlaceholder.remove();
                addMessage('Invalid API key. Please provide a valid OpenAI API key.', 'bot');
                promptForApiKey();
                return;
            }

            response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        { role: "system", content: ADHD_CONTEXT },
                        { role: "user", content: message }
                    ],
                    temperature: 0.8,
                    max_tokens: 150
                })
            });
        }

        const data = await response.json();
        const botResponse = data.choices[0].message.content;

        // Replace typing indicator with actual message
        messagePlaceholder.classList.remove('typing-indicator');
        await typeMessageInPlace(botResponse, messagePlaceholder);

    } catch (error) {
        messagePlaceholder.classList.remove('typing-indicator');
        messagePlaceholder.innerHTML = 'Oops! Something went wrong. Mind trying again? ❤️';
        console.error('Error:', error);
    }
}

// ... rest of your existing functions (addMessage, typeMessageInPlace, etc.) ...

// Add a function to reset API key if needed
function resetApiKey() {
    localStorage.removeItem('openai_api_key');
    OPENAI_API_KEY = null;
    addMessage('API key has been reset. Please provide a new key for your next message.', 'bot');
    promptForApiKey();
}

// Add this function to handle sending messages
function handleSendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    sendMessage();
}

// Update the event listeners to use async/await
sendButton.addEventListener('click', () => handleSendMessage());
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
});

// Add this helper function for adding messages
function addMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.textContent = message;
    
    const messagesContainer = chatMessages.querySelector('.messages-container');
    messagesContainer.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add this helper function for typing effect
async function typeMessageInPlace(text, element) {
    element.textContent = '';
    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i];
        await new Promise(resolve => setTimeout(resolve, 20));
    }
}

// Initial focus
window.addEventListener('load', () => {
    userInput.focus();
});
