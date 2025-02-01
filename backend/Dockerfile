#Base image
FROM python:3.10-slim

#Set working directory
WORKDIR /app

#Copy project files into container
COPY requirements.txt .

#Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

#Copy application code
COPY . .

#Expose backend port
EXPOSE 8000

#Command to run backend and upload csvs using init file 
CMD ["sh", "-c", "python app/init_db.py && uvicorn app.main:app --host 0.0.0.0 --port 8000"]
