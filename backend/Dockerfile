FROM python:3.10

WORKDIR /app

COPY requirements.txt .

RUN pip install  --no-cache-dir -r requirements.txt

COPY . .

# add wait for it scripts
COPY  wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh


EXPOSE 5000

CMD  ["/wait-for-it.sh","db:5432","--","python","app.py"]
