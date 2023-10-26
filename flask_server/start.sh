#!/bin/bash
chmod +x /flask_server/start.sh
exec gunicorn -b 0.0.0.0:5000 app:appbash