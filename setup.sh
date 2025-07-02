#!/bin/bash

# Create a .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "# Local development environment variables" > .env
    echo "DATABASE_URL=sqlite:///./todos.db" >> .env
    echo "Created .env file with SQLite configuration"
else
    echo ".env file already exists, skipping creation"
fi

# Install Python dependencies
pip install -r requirements.txt

echo "Setup complete! You can now run the application with: uvicorn main:app --reload"
