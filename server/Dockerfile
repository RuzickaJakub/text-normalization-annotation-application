FROM python:3.9-slim

WORKDIR /app/server

RUN pip3 install --upgrade pip
RUN python3.9 -m venv env
RUN . env/bin/activate

COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY app.py .
COPY routes.py .

ENTRYPOINT ["flask"]
CMD ["run", "--host=0.0.0.0", "--port=5555"]