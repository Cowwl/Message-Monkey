from flask import Flask, request
import requests
import json
import config
import sqlite3
import random

app = Flask(__name__)

# Write CORS headers to allow cross origin requests
@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE"
    return response


# Function to access the Sender API
def callSendAPI(senderPsid, response):
    PAGE_ACCESS_TOKEN = config.PAGE_ACCESS_TOKEN

    payload = {
        "recipient": {"id": senderPsid},
        "message": response,
        "messaging_type": "RESPONSE",
    }
    headers = {"content-type": "application/json"}

    url = "https://graph.facebook.com/v10.0/me/messages?access_token={}".format(
        PAGE_ACCESS_TOKEN
    )
    r = requests.post(url, json=payload, headers=headers)
    print(r.text)


def printMessages():
    # Connect to the SQLite database
    conn = sqlite3.connect("messages.db")
    c = conn.cursor()

    # Print all the messages in the table
    for row in c.execute("SELECT * FROM messages"):
        print(row)

    # Close the connection
    conn.close()


def handleMessage(
    senderPsid,
    senderFname,
    senderLname,
    receivedMessage,
    messageId,
    messageText,
    messageTimestamp,
):
    # check if received message contains text
    if "text" in receivedMessage:
        # response = {"text": "You just sent: {}".format(receivedMessage["text"])}
        # callSendAPI(senderPsid, response)

        # Connect to the SQLite database
        conn = sqlite3.connect("messages.db")
        c = conn.cursor()

        # Create a table if it doesn't exist having sender_id, message_id, message and timestamp
        c.execute(
            """CREATE TABLE IF NOT EXISTS messages (
            sender_id text,
            sender_first_name text,
            sender_last_name text,
            message_id text,
            message text,
            timestamp text
            )"""
        )
        # Make sender_id and message_id unique
        c.execute(
            "CREATE UNIQUE INDEX IF NOT EXISTS idx ON messages(sender_id, message_id)"
        )
        # if duplicate message id, ignore
        c.execute("SELECT * FROM messages WHERE message_id=?", (messageId,))
        if c.fetchone() is not None:
            return
        # Insert the message into the table
        c.execute(
            "INSERT INTO messages VALUES (:sender_id, :sender_first_name, :sender_last_name, :message_id, :message, :timestamp)",
            {
                "sender_id": senderPsid,
                "sender_first_name": senderFname,
                "sender_last_name": senderLname,
                "message_id": messageId,
                "message": messageText,
                "timestamp": messageTimestamp,
            },
        )

        # Commit the changes and close the connection
        conn.commit()
        conn.close()
        printMessages()

    else:
        response = {"text": "This chatbot only accepts text messages"}
        callSendAPI(senderPsid, response)


# Write a function which takes the page access token and sets it to the config file
@app.route("/setaccesstoken", methods=["POST"])
def setAccessToken():
    config.PAGE_ACCESS_TOKEN = request.json["accessToken"]
    # Also overwrite the config file
    with open("config.py", "w") as f:
        f.write("PAGE_ACCESS_TOKEN = " + '"' + config.PAGE_ACCESS_TOKEN + '"')
    # also do webhook setup using the index function
    return "Page access token set successfully"


@app.route("/", methods=["GET", "POST"])
def home():
    # create the two tables in the database
    conn = sqlite3.connect("messages.db")
    c = conn.cursor()
    c.execute(
        """CREATE TABLE IF NOT EXISTS messages (
        sender_id text,
        sender_first_name text,
        sender_last_name text,
        message_id text,
        message text,
        timestamp text
        )"""
    )
    conn.commit()
    conn.close()
    return "HOME"


# Write a function to send a message to the user with the /sendmessage endpoint and store the message in the database in a new table
@app.route("/sendmessage", methods=["POST"])
def sendMessage():
    # Get the sender ID and message and timestamp from the request
    # Print all fields of request
    senderPsid = request.json["sender_id"]
    print("[DEBUG] senderPsid: ", senderPsid)
    messageText = request.json["message"]
    print("[DEBUG] messageText: ", messageText)
    # Call the send message function
    timestamp = request.json["timestamp"]
    print("[DEBUG] timestamp: ", timestamp)
    # Connect to the SQLite database
    conn = sqlite3.connect("messages.db")
    c = conn.cursor()
    # generate a random message id
    mid = "m" + str(random.randint(1000000000, 9999999999))
    # Insert the message into the table
    c.execute(
        "INSERT INTO messages VALUES (:sender_id, :sender_first_name, :sender_last_name, :message_id, :message, :timestamp)",
        {
            "sender_id": senderPsid,
            "sender_first_name": "You",
            "sender_last_name": "You",
            "message_id": mid,
            "message": messageText,
            "timestamp": timestamp,
        },
    )
    # Commit the changes and close the connection
    conn.commit()
    conn.close()
    response = {"text": messageText}
    callSendAPI(senderPsid, response)

    return "Message sent successfully"


# Write a function to get the list of senders with their full names with the /getsenders endpoint
@app.route("/getsenders", methods=["GET"])
def getSenders():
    # Connect to the SQLite database
    conn = sqlite3.connect("messages.db")
    c = conn.cursor()

    # Print all the messages in the table
    senders = []
    for row in c.execute("SELECT * FROM messages"):
        sender = {
            "sender_id": row[0],
            "sender_first_name": row[1],
            "sender_last_name": row[2],
        }
        if sender not in senders:
            senders.append(sender)

    # Close the connection
    conn.close()

    return json.dumps(senders)


# Write a function to return all messages for a sender with the /getmessagesforsender endpoint
@app.route("/getmessagesforsender", methods=["POST"])
def getMessagesForSender():
    # Connect to the SQLite database
    conn = sqlite3.connect("messages.db")
    c = conn.cursor()

    # Print all the messages in the table
    messages = []
    for row in c.execute("SELECT * FROM messages"):
        if row[0] == request.json["sender_id"]:
            message = {
                "sender_id": row[0],
                "sender_first_name": row[1],
                "sender_last_name": row[2],
                "message_id": row[3],
                "message": row[4],
                "timestamp": row[5],
            }
            messages.append(message)

    # Close the connection
    conn.close()

    return json.dumps(messages)


# Write a fucntion to handle registrations and create a new database and put name email and password in it
@app.route("/register", methods=["POST"])
def register():
    # Connect to the SQLite database
    conn = sqlite3.connect("users.db")
    c = conn.cursor()

    # Create a table if it doesn't exist having sender_id, message_id, message and timestamp
    c.execute(
        """CREATE TABLE IF NOT EXISTS users (
        name text,
        email text,
        password text
        )"""
    )
    # Print the request
    print(request.form)
    # Insert the message into the table
    c.execute(
        "INSERT INTO users VALUES (:name, :email, :password)",
        {
            "name": request.form["name"],
            "email": request.form["email"],
            "password": request.form["password"],
        },
    )

    # Commit the changes and close the connection
    conn.commit()
    conn.close()
    print("all ok")
    return "User registered successfully"


# Write a function to handle login and check if the user exists in the database
@app.route("/login", methods=["POST"])
def login():
    # Connect to the SQLite database
    conn = sqlite3.connect("users.db")
    c = conn.cursor()

    # Print all the messages in the table
    for row in c.execute("SELECT * FROM users"):
        if row[1] == request.form["email"] and row[2] == request.form["password"]:
            return "User logged in successfully"

    # Close the connection
    conn.close()

    return "User not found"


@app.route("/webhook", methods=["GET", "POST"])
def index():
    if request.method == "GET":
        # do something.....
        VERIFY_TOKEN = "abcd1234"

        if "hub.mode" in request.args:
            mode = request.args.get("hub.mode")
            print(mode)
        if "hub.verify_token" in request.args:
            token = request.args.get("hub.verify_token")
            print(token)
        if "hub.challenge" in request.args:
            challenge = request.args.get("hub.challenge")
            print(challenge)

        if "hub.mode" in request.args and "hub.verify_token" in request.args:
            mode = request.args.get("hub.mode")
            token = request.args.get("hub.verify_token")

            if mode == "subscribe" and token == VERIFY_TOKEN:
                print("WEBHOOK VERIFIED")

                challenge = request.args.get("hub.challenge")

                return challenge, 200
            else:
                return "ERROR", 403

        return "SOMETHING", 200

    if request.method == "POST":
        # do something.....
        VERIFY_TOKEN = "abcd1234"

        if "hub.mode" in request.args:
            mode = request.args.get("hub.mode")
            print(mode)
        if "hub.verify_token" in request.args:
            token = request.args.get("hub.verify_token")
            print(token)
        if "hub.challenge" in request.args:
            challenge = request.args.get("hub.challenge")
            print(challenge)

        if "hub.mode" in request.args and "hub.verify_token" in request.args:
            mode = request.args.get("hub.mode")
            token = request.args.get("hub.verify_token")

            if mode == "subscribe" and token == VERIFY_TOKEN:
                print("WEBHOOK VERIFIED")

                challenge = request.args.get("hub.challenge")

                return challenge, 200
            else:
                return "ERROR", 403

        # do something else
        data = request.data
        body = json.loads(data.decode("utf-8"))
        # Send received message with senderID, messageID, message and timestamp to handleMessage function
        if "object" in body and body["object"] == "page":
            entries = body["entry"]
            for entry in entries:
                webhookEvent = entry["messaging"][0]
                print(webhookEvent)
                senderPsid = webhookEvent["sender"]["id"]
                # Get the sender's full name from the Graph API
                url = "https://graph.facebook.com/{}?fields=first_name,last_name&access_token={}".format(
                    senderPsid, config.PAGE_ACCESS_TOKEN
                )
                r = requests.get(url)
                # wait for the response
                while r.status_code != 200:
                    r = requests.get(url)

                # if not a text message, ignore
                if "text" not in webhookEvent["message"]:
                    continue
                senderFName = r.json()["first_name"]
                senderLName = r.json()["last_name"]
                messageid = webhookEvent["message"]["mid"]
                messageText = webhookEvent["message"]["text"]
                messageTimestamp = webhookEvent["timestamp"]
                print("Sender PSID: {}".format(senderPsid))

                if "message" in webhookEvent:
                    handleMessage(
                        senderPsid,
                        senderFName,
                        senderLName,
                        webhookEvent["message"],
                        messageid,
                        messageText,
                        messageTimestamp,
                    )
            return "EVENT_RECEIVED", 200

        else:
            return "ERROR", 404

# run with reload
if __name__ == "__main__":
    app.run(host="0.0.0.0", port="8888", debug=True)
