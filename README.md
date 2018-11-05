# Philips Hue Steuerung
Ansteuerung von Philips Hue Geräten über REST-API mit Node.js

Video Tutorial: https://www.youtube.com/watch?v=vG4fuEUO3I8

## Abhängigkeiten
Diese Beispielimplementierung verwendet die Node.js Library [node-hue-api] von Peter Murray.

## Installation

```
git clone https://github.com/comdirect-labs/hue-steuerung.git
npm install
```

Falls die unten stehenden Befehle nicht funktionieren sollten, müssen die `.js` Dateien ggfs. noch als ausführbar markiert werden mittels:
```
chmod u+x *.js
```

## Bridges suchen und auflisten
```
./list-bridge.js
```

Beispiel mit zwei gefundenen Bridges im lokalen Netzwerk:

```json
[
  {
    "id": "001788fffeXXXXXX",
    "ipaddress": "192.168.x.y"
  },
  {
    "id": "001788fffeYYYYYY",
    "ipaddress": "192.168.x.z"
  }
]
```

## Neuen Benutzer anlegen
In `create-new-user.js` muss vor dem ersten Aufruf die Variable `host` mit der IP der zu verwendenen Bridge gesetzt werden.

```
./create-new-user.js
```

Beim Aufruf dieses Skripts muss außderm **vorher** der Knopf auf der Bridge einmal gedrückt worden sein, da ansonsten das Anlegen eines neuen Users abgelehnt wird:

```
./create-new-user.js
Error: Api Error: link button not pressed
```

Eine erfolgreiche Registrierung sieht wie folgt aus:

```
./create-new-user.js
New user: "XXXXXXXXXXXXXXX"
```

## Abfragen der in der Bridge registierten Lichter
In `get-lights.js` müssen vor dem ersten Aufruf folgende Variablen gesetzt werden:

- Variable `host` mit der IP der zu verwendenen Bridge.
- Variable `username` mit der Username ID, die mit `create-new-user.js` zuvor erzeugt worden ist.

```
./get-lights.js
```

Beispielausgabe:

```json
./get-lights.js
{
  "lights": [
    {
      "id": "1",
      "state": {
        "on": false,
        "bri": 254,
        "hue": 8404,
        "sat": 140,
        "effect": "none",
        "xy": [
          0.4575,
          0.4099
        ],
        "ct": 366,
        "alert": "none",
        "colormode": "xy",
        "mode": "homeautomation",
        "reachable": true
      },
      "swupdate": {
        "state": "noupdates",
        "lastinstall": "2017-11-15T23:19:59"
      },
      "type": "Extended color light",
      "name": "Computerecke",
      "modelid": "LCT010",
      "manufacturername": "Philips",
      "productname": "Hue color lamp",
      "capabilities": {
        "certified": true,
        "control": {
          "mindimlevel": 1000,
          "maxlumen": 806,
          "colorgamuttype": "C",
          "colorgamut": [
            [
              0.6915,
              0.3083
            ],
            [
              0.17,
              0.7
            ],
            [
              0.1532,
              0.0475
            ]
          ],
          "ct": {
            "min": 153,
            "max": 500
          }
        },
        "streaming": {
          "renderer": true,
          "proxy": true
        }
      },
      "config": {
        "archetype": "sultanbulb",
        "function": "mixed",
        "direction": "omnidirectional"
      },
      "uniqueid": "00:17:88:01:XX:XX:XX:XX-XX",
      "swversion": "1.29.0_r21169",
      "swconfigid": "6A139B19",
      "productid": "Philips-LCT010-1-A19ECLv4"
    },

    ...

  ]
}
```

## Zustand eines Lichts verändern
In `set-lights.js` müssen vor dem ersten Aufruf folgende Variablen gesetzt werden:

- Variable `host` mit der IP der zu verwendenen Bridge.
- Variable `username` mit der Username ID, die mit `create-new-user.js` zuvor erzeugt worden ist.

```
./set-lights.js
```

Hilfe des Skripts `set-lights.js` anzeigen durch Aufruf ohne Parameter:

```
./set-lights.js
USAGE: ./set-lights.js --id LIGHT_ID {--on|--off|--color R G B|--loop}
```

Fehlerhafter Aufruf mit unbekannter Light ID `999`, welche eingeschaltet werden soll:

```
./set-lights.js --id 999 --on
Error: Api Error: resource, /lights/999/state, not available
```

Erfolgreicher Aufruf mit der Light ID `4`, welche eingeschaltet wird:

```
./set-lights.js --id 4 --on
true
```

[node-hue-api]: <https://github.com/peter-murray/node-hue-api>

