from motor import motor_asyncio

from .mongo_model import MongoModel
from .project import Project

URL = "mongodb://admin:admin@mongo:27017/benford?authSource=admin"
db = motor_asyncio.AsyncIOMotorClient(URL, uuidRepresentation="standard").get_database()

__all__ = ["MongoModel", "Project", "db"]
