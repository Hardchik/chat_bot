from flask import Flask,jsonify,request,render_template
from chatbot import get_chat_response
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    ai_response = get_chat_response(user_input)
    return jsonify({'response': ai_response})

if __name__ == '__main__':
    app.run(debug=True)