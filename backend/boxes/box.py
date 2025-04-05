class Box:
    def __init__(self, top_price, bottom_price, left_datetime, right_datetime):
        self.top_price = top_price
        self.bottom_price = bottom_price
        self.left_datetime = left_datetime
        self.right_datetime = right_datetime

    def __repr__(self):
        return (f"Box(top_price={self.top_price}, bottom_price={self.bottom_price}, "
                f"left_datetime={self.left_datetime}, right_datetime={self.right_datetime})")