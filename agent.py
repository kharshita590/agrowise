from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain_core.prompts import MessagesPlaceholder, ChatPromptTemplate
from langchain_core.messages import SystemMessage
from langchain_core.tools import Tool
from langchain.memory import ConversationBufferMemory
from langchain_openai import ChatOpenAI
from typing import Dict, List
import requests
from datetime import datetime, timedelta
import random
import os
import json
import dotenv
dotenv.load_dotenv()
PRICE_PREDICTION_API_URL = os.getenv("LIGHT_API","https://your-api.onrender.com" )
LLM_API_URL = os.getenv("LLM_API_URL", "https://fallback.ngrok-free.app/get_advice")
WEATHER_API_KEY = os.getenv("WEATHER")

def predict_price(state: str, district: str, market: str, crop: str, 
                 current_date: str, current_price: float) -> str:
    try:
        payload = {
            "state": state,
            "district": district,
            "market": market,
            "crop": crop,
            "current_date": current_date,
            "current_price": current_price
        }
        
        print(f"Sending price prediction request with payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(PRICE_PREDICTION_API_URL, json=payload)
        if response.status_code != 200:
            print(f"Price prediction API error: {response.status_code}")
            print(f"Response content: {response.text}")
            return f"Unable to predict price. API returned status code {response.status_code}."
            
        data = response.json()
        return f"{data['predicted_price']} by {data['prediction_date']}"
    
    except requests.exceptions.ConnectionError:
        print(f"Connection error: Could not connect to {PRICE_PREDICTION_API_URL}")
        return "Price prediction service is currently unavailable."
    
    except Exception as e:
        print(f"Error in predict_price: {str(e)}")
        return f"Error predicting price: {str(e)}"

def get_weather_impact(state: str, district: str) -> list:
    try:
        def fetch_forecast(state: str, district: str):
            location = f"{district},{state}"
            params = {
                "key": WEATHER_API_KEY,
                "q": location,
                "days": 14,
                "alerts": "yes"
            }
            resp = requests.get("http://api.weatherapi.com/v1/forecast.json", params=params)
            resp.raise_for_status()
            return resp.json()
            
        def analyze_forecast(forecast: Dict) -> List[str]:
            conclusions = []
            seen = set()
            for day in forecast["forecast"]["forecastday"]:
                dp = day["day"]["totalprecip_mm"]          
                if dp < 1 and "delayed harvest" not in seen:
                    conclusions.append("20% less rain - delayed harvest")
                    seen.add("delayed harvest")
                if dp >= 50 and "field submersion" not in seen:
                    conclusions.append("Flooding - field submersion")
                    seen.add("field submersion")
                    
            temps = [day["day"]["maxtemp_c"] for day in forecast["forecast"]["forecastday"]]
            for i in range(len(temps) - 2):
                window = temps[i : i + 3]
                if all(t > 45 for t in window) and "supply drop" not in seen:
                    conclusions.append("Heatwave - 30% supply drop")
                    seen.add("supply drop")
                    break
                    
            alerts = forecast.get("alerts", {}).get("alert", [])
            for alert in alerts:
                event = alert.get("event", "").lower()
                if "flood" in event and "field submersion" not in seen:
                    conclusions.append("Flooding - field submersion (via alert)")
                    seen.add("field submersion")
                if "heat" in event and "supply drop" not in seen:
                    conclusions.append("Heatwave - 30% supply drop (via alert)")
                    seen.add("supply drop")

            return conclusions if conclusions else ["Normal weather conditions expected"]

        forecast_data = fetch_forecast(state, district)
        return analyze_forecast(forecast_data)
    
    except Exception as e:
        print(f"Error in get_weather_impact: {str(e)}")
        return ["Weather data currently unavailable"]

def generate_arrival_info(current_date: str, district: str) -> str:
    """Generate market arrival info for agricultural produce"""
    try:
        base_date = datetime.strptime(current_date, "%Y-%m-%d").date()
        truck_count = random.randint(1, 500)
        offset_days = random.randint(2, 4)
        arrival_date = base_date + timedelta(days=offset_days)
        return f"{truck_count} {district} trucks arriving by {arrival_date.strftime('%b %-d')}"
    except Exception as e:
        print(f"Error in generate_arrival_info: {str(e)}")
        return "Market arrival information unavailable"

def get_llm_advice(prompt: str) -> str:
    """Get formatted advice from custom LLM"""
    try:
        response = requests.post(LLM_API_URL, json={"prompt": prompt})
        response.raise_for_status()
        return response.json()["advice"]
    except Exception as e:
        print(f"Error in get_llm_advice: {str(e)}")
        return "Unable to generate expert advice at this time. Please try again later."
tools = [
    Tool.from_function(
        func=predict_price,
        name="PricePredictor",
        description="Predicts crop prices using historical data and market trends"
    ),
    Tool.from_function(
        func=get_weather_impact,
        name="WeatherAnalyzer",
        description="Analyzes weather patterns and their agricultural impacts"
    ),
    Tool.from_function(
        func=generate_arrival_info,
        name="MarketArrivalGenerator",
        description="Generates market arrival estimates for agricultural produce"
    ),
    Tool.from_function(
        func=get_llm_advice,
        name="AgriculturalAdvisor",
        description="Generates expert agricultural advice based on comprehensive analysis"
    )
]
system_message = """You are an agricultural decision support system. 
Process user inputs systematically:
1. Predict prices using PricePredictor
2. Analyze weather with WeatherAnalyzer
3. Generate arrivals with MarketArrivalGenerator
4. Format LLM prompt with all data
5. Get final advice using AgriculturalAdvisor"""
prompt = ChatPromptTemplate.from_messages([
    ("system", system_message),
    MessagesPlaceholder(variable_name="chat_history", optional=True),
    ("human", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad")
])
memory = ConversationBufferMemory(return_messages=True, memory_key="chat_history")
llm = ChatOpenAI(temperature=0, api_key=os.environ.get("OPENAI_API_KEY"))

agent = create_openai_tools_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True, memory=memory)
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],                     
    allow_headers=["*"],                   
)

class AgentRequest(BaseModel):
    crop_name: str
    market: str
    district: str 
    state: str
    current_price: float
    current_date: str

@app.exception_handler(requests.exceptions.RequestException)
async def request_exception_handler(request: Request, exc: requests.exceptions.RequestException):
    return JSONResponse(
        status_code=500,
        content={
            "error": "External API request failed",
            "details": str(exc),
            "url": getattr(exc, "request", {}).get("url", "Unknown URL")
        }
    )

@app.post("/get_advice")
async def get_advice(request: AgentRequest):
    try:
        district = request.district
        print(f"Processing request: {json.dumps(request.model_dump(), indent=2)}")
        price_forecast = predict_price(
            request.state,
            district,
            request.market,
            request.crop_name,
            request.current_date,
            request.current_price
        )
        
        weather_impacts = get_weather_impact(request.state, district)
        arrivals = generate_arrival_info(request.current_date, district)
        llm_prompt = (
            f"Location: {request.market}, {request.state}\n"
            f"Crop: {request.crop_name}\n"
            f"Current Price: ₹{request.current_price}/kg\n"
            f"Weather: {', '.join(weather_impacts)}\n"
            f"Forecast: {price_forecast}\n"
            f"Market Alert: {arrivals}"
        )
        if price_forecast.startswith("Unable to predict price") or price_forecast.startswith("Error predicting price"):
            final_advice = "Cannot provide advice due to unavailable price prediction data. Please check if the price prediction service is running."
        else:
            final_advice = get_llm_advice(llm_prompt)
        
        return {
            "analysis": {
                "price_forecast": price_forecast,
                "weather_impacts": weather_impacts,
                "market_arrivals": arrivals
            },
            "advice": final_advice
        }
        
    except Exception as e:
        print(f"Error in get_advice endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)
