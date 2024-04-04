from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)

# Define InputData model
class InputData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    tonnenTNT = db.Column(db.Integer)
    
with app.app_context():  # Ensure database operations are performed within the application context
    db.create_all()

# Define route to save inputs
@app.route('/save_inputs', methods=['POST'])
def save_inputs():
    data = request.json
    name = data.get('name')
    tonnenTNT = data.get('tonnenTNT')
   
    new_input_data = InputData(name=name, tonnenTNT=tonnenTNT)
    db.session.add(new_input_data)
    db.session.commit()
    return jsonify({'message': 'Inputs saved successfully'})

# Define route to fetch allowed features
@app.route('/get_allowed_features', methods=['GET'])
def get_allowed_features():
    # Fetch all data from the database sorted by the name column
    allowed_features_query = InputData.query.order_by(InputData.name).all()
    # Convert each row to a dictionary for JSON serialization
    allowed_features = [{
        'id': row.id,
        'name': row.name,
        'tonnenTNT': row.tonnenTNT
    } for row in allowed_features_query]
    return jsonify(allowed_features)


if __name__ == '__main__':
    app.run(debug=True)
