from flask import Flask, jsonify, render_template
import mysql.connector

app = Flask(__name__)

def get_connection():
    return mysql.connector.connect(
        host="127.0.0.1",
        user="user",
        password="greenalien21",
        database="beannbrewdb"
    )

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/customers')
def customers():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM customers")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(rows)

if __name__ == '__main__':
    app.run()
