import requests
import pandas as pd

api_key = 'b64161c614f24660b279ce75cb95cee5'#'79d80c65c9a440c9a0b4b7e0a6b92381'
symbol = 'XAU/USD'
interval = '1day'  # options: 1min, 5min, 15min, 1h, 4h, 1day, etc.
output_size = 100  # number of data points (max = 5000 for paid plan)

url = f"https://api.twelvedata.com/time_series?symbol={symbol}&interval={interval}&outputsize={output_size}&apikey={api_key}"

response = requests.get(url)
data = response.json()

if "values" in data:
    # Convert the data into a DataFrame
    df = pd.DataFrame(data["values"])
    # Ensure proper data types
    df["datetime"] = pd.to_datetime(df["datetime"])
    df[["open", "high", "low", "close"]] = df[["open", "high", "low", "close"]].astype(float)
    # Sort by datetime
    df = df.sort_values(by="datetime")
    # Save the DataFrame to a CSV file
    df.to_csv("trading_data.csv", index=False)
    print("Data saved to trading_data.csv")
else:
    print("Error:", data)
