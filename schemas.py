# Pydantic Schema (Input/output validation)

from pydantic import BaseModel
from typing import Optional

class TodoBase(BaseModel):
    title: str
    description: str

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

class TodoOut(TodoBase):
    id: int
    completed: bool

    class Config:
        from_attributes = True
        # It allows Pydantic to serialize the SQLAlchemy model
        # and return it as a JSON response.