# Matrix.org room webhook integration

A very simple webhook integration for Matrix.org rooms.
Does not support encrypted rooms.

Configure the webhook in `config/settings.json`:

```json
{
    "baseUrl": "",
    "accessToken": "",
    "userId": "@user:server.tld",
    "roomId": "",
    "password": "password for post auth"
}
```

**OR** set the following environment variables if using docker:

```
BASE_URL=
ACCESS_TOKEN=
USER_ID=
ROOM_ID=
PASSWORD=
```

Then send a HTTP POST request to this app with the following body:

```json
{
    "password": "settings.json password here",
    "msg": "I'm the message"
}
```

It will return `401 Unauthorized` if the password is incorrect.

## Docker

Run the app with `docker-compose up`.