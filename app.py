from flask import Flask, render_template, redirect, url_for, request, session

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Dummy user data
users = {
    'admin': {'password': 'adminpass', 'role': 'Admin'},
    'client': {'password': 'clientpass', 'role': 'Client'},
    'user': {'password': 'userpass', 'role': 'User'}
}

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    user = users.get(username)
    if user and user['password'] == password:
        session['username'] = username
        session['role'] = user['role']
        return redirect(url_for('landing'))
    return 'Invalid credentials!'

@app.route('/landing')
def landing():
    role = session.get('role')
    if role == 'Admin':
        return 'Welcome Admin'
    elif role == 'Client':
        return 'Welcome Client'
    elif role == 'User':
        return 'Welcome User'
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)