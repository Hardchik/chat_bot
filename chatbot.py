import getpass
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain import hub
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.tools import tool
import requests
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json
from bson import json_util
uri = "mongodb+srv://adityaaverma:bdsNesf1P9JjYXnX@cluster0.pkkhotk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri)

from flask import Flask, jsonify, request, render_template

load_dotenv()

# Initialize the chatbot model
chat = ChatGoogleGenerativeAI(model="gemini-1.5-flash")

# Define the tool for getting data from an API

 # "Fetch all product data"
    # print(city,budget)
    # response = requests.get(f'https://api-next.devbeta.in/v1/mix/langchain-properties?city={city}&budget={budget}')
@tool
def get_data_from_api(year:str) -> dict:
    "fetch all the movie data"
    db = client['sample_mflix']
    collection = db['movies']
    x=int(year)
    query={'year':x}

    results = collection.find(query)
    dict={'movies':[],'sucess':'True'}
    for movie in results:
        dict['movies'].append(json_util.dumps(movie))
    
    return dict or {}

# List of tools to be used by the agent
tools = [get_data_from_api]

# Define the prompt template
# You are a helpful AI Bot ULBOT. You have to take the name, university name,
# city, and budget from the user one by one. Use these inputs to fetch data from the tool provided
# and present output in JSON format.
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", 
         '''
            You are a hepful Chatbot. Ask the User Year of the movie and use the tools to 
            get all the results for the corressponding year
         '''
        ),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),
        MessagesPlaceholder(variable_name="agent_scratchpad"),
    ]
)

# Create the agent and its executor
agent = create_tool_calling_agent(chat, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# Chat message history for tracking conversation
demo_ephemeral_chat_history_for_chain = ChatMessageHistory()

# Runnable with message history
conversational_agent_executor = RunnableWithMessageHistory(
    agent_executor,
    lambda session_id: demo_ephemeral_chat_history_for_chain,
    input_messages_key="input",
    output_messages_key="output",
    history_messages_key="chat_history",
)

# Function to get chatbot response
def get_chat_response(user_input):
    response = conversational_agent_executor.invoke(
        {
            "input": user_input,
        },
        {"configurable": {"session_id": "abc"}},
    )
    
    # Extracting the output message from the response
    messages = response.get('output')
    if messages:
        return messages
    else:
        return "No response from the chatbot."

# Flask app setup

