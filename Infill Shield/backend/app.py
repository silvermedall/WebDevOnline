from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os


app = Flask(__name__)
CORS(app)

orders = []
ORDERS_FILE = "orders.json"
CURRENT_PATH = os.path.dirname(os.path.abspath(__file__))
ORDERS_PATH = os.path.join(CURRENT_PATH, ORDERS_FILE)

UPLOAD_FOLDER = os.path.join(CURRENT_PATH, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/submit-order", methods=["POST"])
def submit_order():
    orders = []
    if os.path.exists(ORDERS_PATH):
        with open(ORDERS_PATH, "r") as f:
            try:
                orders = json.load(f)
            except json.JSONDecodeError:
                pass

    order_id = 1 if not orders else max(order["id"] for order in orders) + 1

    name = request.form.get("name")
    contact_info = request.form.get("contactInfo")
    description = request.form.get("description")
    material_type = request.form.get("materialType")
    quantity = request.form.get("quantity")

    file = request.files.get("file")
    file_path = None

    if file:
        filename = f"{order_id}_{file.filename}"
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)

    order = {
        "id": order_id,
        "name": name,
        "contactInfo": contact_info,
        "description": description,
        "materialType": material_type,
        "quantity": quantity,
        "fileName": filename if file else None,
    }

    orders.append(order)

    with open(ORDERS_PATH, "w") as f:
        json.dump(orders, f, indent=4)

    return jsonify({"message": "Order submitted successfully", "Id": order_id}), 200


@app.route("/get-orders", methods=["GET"])
def get_orders():
    return jsonify(orders)


@app.route("/")
def index():
    return "Working!"


if __name__ == "__main__":
    app.run
