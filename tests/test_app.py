import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_login_admin(client):
    response = client.post('/login', data={'username': 'admin', 'password': 'adminpass'})
    assert response.status_code == 302
    assert b'Welcome Admin' in response.data


def test_login_client(client):
    response = client.post('/login', data={'username': 'client', 'password': 'clientpass'})
    assert response.status_code == 302
    assert b'Welcome Client' in response.data


def test_login_user(client):
    response = client.post('/login', data={'username': 'user', 'password': 'userpass'})
    assert response.status_code == 302
    assert b'Welcome User' in response.data


def test_invalid_login(client):
    response = client.post('/login', data={'username': 'admin', 'password': 'wrongpass'})
    assert response.status_code == 200
    assert b'Invalid credentials!' in response.data