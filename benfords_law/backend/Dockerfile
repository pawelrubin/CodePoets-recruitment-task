FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

# Install Poetry
RUN pip install poetry
RUN poetry config virtualenvs.create false

# Install dependencies
COPY ./pyproject.toml ./poetry.lock /app/
RUN poetry install --no-root --no-dev

COPY ./ /app

ENV PORT=8080
