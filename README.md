# Task Master - FastAPI Todo Application

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python: 3.8+](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.95.0+-green.svg)](https://fastapi.tiangolo.com/)

A modern RESTful API todo application built with FastAPI, showcasing the power and simplicity of this high-performance Python web framework.

![Task Master Screenshot](https://via.placeholder.com/800x450?text=Task+Master+Screenshot)

## Features

- ✅ FastAPI's automatic OpenAPI documentation
- ✅ Pydantic data validation and serialization
- ✅ Async request handling
- ✅ Dependency injection system
- ✅ Path and query parameter validation
- ✅ SQLAlchemy ORM integration
- ✅ CRUD operations with FastAPI endpoints
- ✅ Response models and status codes

## Tech Stack

- **Backend:**
  - FastAPI (High-performance Python web framework)
  - Pydantic (Data validation and settings management)
  - SQLAlchemy (ORM with FastAPI integration)
  - Uvicorn (ASGI server for FastAPI)
  - FastAPI middleware for CORS and more
  - FastAPI dependency injection
  
- **Frontend:**
  - HTML5, CSS3, JavaScript
  - Consuming FastAPI endpoints with fetch API
  - Form submission handling with FastAPI

## Installation

### Option 1: Regular Installation

1. Clone the repository:
```bash
git clone 
cd 
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the FastAPI application:
```bash
cd todo_fastapi
uvicorn main:app --reload
```

### Option 2: Docker Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/task-master.git
cd task-master
```

2. Build and run the Docker container:
```bash
docker build -t task-master .
docker run -p 8000:8000 task-master
```

5. Open your browser and navigate to:
```
http://127.0.0.1:8000
```

## FastAPI Endpoints

| Method | URL | Description | FastAPI Function |
|--------|-----|-------------|-----------------|
| GET | `/` | Frontend web interface | `read_root()` |
| GET | `/todos/` | List all tasks | `read_todos()` |
| POST | `/todos/` | Create a new task | `create_todo()` |
| GET | `/todos/{id}` | Get a specific task | `read_todo()` |
| PUT | `/todos/{id}` | Update a task | `update_todo()` |
| DELETE | `/todos/{id}` | Delete a task | `delete_todo()` |

### FastAPI Documentation

One of FastAPI's best features is automatic API documentation:
- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

## Project Structure

```
todo_fastapi/
│
├── database.py      # FastAPI database connection and session
├── main.py          # FastAPI app and route definitions
├── models.py        # SQLAlchemy models for FastAPI
├── schemas.py       # Pydantic schemas for FastAPI
├── requirements.txt # FastAPI and project dependencies
├── Dockerfile       # Docker configuration for FastAPI
│
├── static/          # Static assets for FastAPI templates
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   └── img/
│       └── favicon.ico
│
├── templates/       # Jinja2 templates for FastAPI
│   └── index.html   # Main frontend page
│
└── tests/           # FastAPI test files with TestClient
    ├── test_api.py
    └── test_models.py
```

## FastAPI Implementation Details

- **Dependency Injection**: Using FastAPI's dependency system for database sessions
- **Path Parameters**: Type-validated URL parameters
- **Request Body**: Using Pydantic models for request validation
- **Response Models**: Pre-defined response structures
- **Status Codes**: HTTP status code handling
- **Error Handling**: Custom exception responses

## Troubleshooting

**FastAPI Startup Issues**
- Ensure you're running the correct Uvicorn command: `uvicorn main:app --reload`
- Check FastAPI version compatibility: `pip install fastapi==0.95.0`

**FastAPI Route Issues**
- Verify your endpoint paths in the FastAPI router
- Check request/response models for validation errors

**FastAPI CORS Issues**
- Ensure the CORS middleware is properly set up in `main.py`

## Future FastAPI Enhancements

- [ ] FastAPI WebSockets for real-time updates
- [ ] OAuth2 authentication with FastAPI security
- [ ] Rate limiting middleware
- [ ] Background tasks with FastAPI
- [ ] Pagination for large datasets
- [ ] Custom FastAPI exception handlers
- [ ] Advanced query parameters
- [ ] File uploads with FastAPI

## License

MIT License

## Acknowledgments

- The FastAPI team for the excellent framework and documentation
