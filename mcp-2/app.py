import json
from flask import Flask, request, jsonify
from openai import AzureOpenAI
from dotenv import load_dotenv
import os
from flask_cors import CORS
import traceback

load_dotenv()
API_KEY = os.getenv("API_KEY")
AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")

# Flask app setup
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Azure OpenAI client setup
api_version = "2024-12-01-preview"
DEPLOYMENT_NAME = "gpt-4o"

client = AzureOpenAI(
    api_version=api_version,
    azure_endpoint=AZURE_OPENAI_ENDPOINT,
    api_key=API_KEY
)

# Function to build prompt based on language and question
def build_chat_prompt(language, question):
    prompt_language = "Hindi" if language.lower() == "hindi" else "English"

    system_prompt = (
        f"You are a friendly and experienced farming expert. "
        f"Please reply in {prompt_language}. Your job is to answer the user's farming-related question "
        f"in a way that's simple, helpful, and easy to understand. Be positive and give practical advice."
    )

    return [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": question}
    ]

# Function to get response from GPT
def generate_chat_response(messages):
    response = client.chat.completions.create(
        model=DEPLOYMENT_NAME,
        messages=messages,
        max_tokens=1000,
        temperature=0.7
    )
    return response.choices[0].message.content

# Chatbot route
@app.route('/chatbot', methods=['POST'])
def ask_question():
    data = request.json
    try:
        language = data.get("language", "English")
        user_question = data.get("question", "")

        if not user_question:
            return jsonify({"error": "No question provided."}), 400

        chat_prompt = build_chat_prompt(language, user_question)
        response = generate_chat_response(chat_prompt)

        return jsonify({"response": response})

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
