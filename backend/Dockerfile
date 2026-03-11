# Use official Python image
FROM python:3.10

# Set working directory inside the container
WORKDIR /app

# Copy dependencies first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all backend code
COPY . .

# Copy wait-for-it script to root and make executable
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Expose backend port
EXPOSE 5000

# Default command: wait for DB, then run app
CMD ["/wait-for-it.sh", "db:5432", "--", "python", "app.py"]