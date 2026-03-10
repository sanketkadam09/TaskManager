import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Use environment variable if set (Docker), else fallback to localhost
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/taskdb")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)