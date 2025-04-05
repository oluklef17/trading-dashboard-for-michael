import pandas as pd
from datetime import datetime, timedelta

class Box:
    def __init__(self, start_time, end_time, height, level, base_height):
        self.start_time = start_time
        self.end_time = end_time
        self.height = height
        self.level = level
        self.base_height = base_height  # Base height for stacking
        self.bottom_price = base_height
        self.top_price = base_height + height

    def __repr__(self):
        return (f"Box(Level {self.level}, Start: {self.start_time}, End: {self.end_time}, "
                f"Height: {self.height}, Base Height: {self.base_height}, "
                f"Bottom Price: {self.bottom_price}, Top Price: {self.top_price})")

def calculate_box_height(prev_day_high, prev_day_low):
    box_factor = 300
    midpoint = ((((prev_day_high * 100) - (prev_day_low * 100)) + box_factor) / 2) / 100
    midpoint = round(midpoint, 2)
    temp = midpoint * 100
    temp = temp + 1 if temp % 2 == 0 else temp
    midpoint = temp / 100
    g_factor = midpoint * 100
    box_height = g_factor / 100
    return box_height

def create_boxes(data):
    boxes = []
    for i in range(1, len(data)):
        prev_day = data.iloc[i - 1]
        current_day = data.iloc[i]

        prev_day_high = round(float(prev_day['high']), 2)
        prev_day_low = round(float(prev_day['low']), 2)
        current_day_low = round(float(current_day['low']), 2)
        current_day_start = datetime.strptime(current_day['datetime'], '%Y-%m-%d')
        next_day_end = current_day_start + timedelta(days=1)

        box_height = round(calculate_box_height(prev_day_high, prev_day_low), 2)

        for level in range(1, 4):  # Create 3 stacked boxes
            base_height = round(current_day_low + (level - 1) * box_height, 2)  # Stack boxes relative to current day's low
            box = Box(
                start_time=current_day_start,
                end_time=next_day_end,
                height=box_height,
                level=level,
                base_height=base_height
            )
            boxes.append(box)
    return boxes

def fetch_data_and_create_boxes(file_path):
    data = pd.read_csv(file_path)
    return create_boxes(data)

def get_boxes_for_date(boxes, date_str):
    target_date = datetime.strptime(date_str, '%Y-%m-%d')
    return [box for box in boxes if box.start_time.date() == target_date.date()]

# Example usage
file_path = 'trading_data.csv'
boxes = fetch_data_and_create_boxes(file_path)

# Fetch boxes for a specific date
specific_date = '2025-04-04'
filtered_boxes = get_boxes_for_date(boxes, specific_date)
for box in filtered_boxes:
    print(box)
