# Use official Python image
FROM python:3.10

# Set working directory
WORKDIR /app

# Copy dependencies
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Give permission to wait-for-it script
RUN chmod +x wait-for-it.sh

# Expose backend port
EXPOSE 5000

# Start backend after DB is ready
CMD ["./wait-for-it.sh", "db:5432", "--", "python", "app.py"]