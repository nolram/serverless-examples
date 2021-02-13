import json
import requests

def main():
    with open('users_serverless_reduced.json', 'r') as data:
        dict_users = json.load(data)
        for i in dict_users:
            resp = requests.post("http://localhost:3000/dev/users", json=i)
            print(resp.status_code)


if __name__ == '__main__':
    main()
