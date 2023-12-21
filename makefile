run_backend:
	-docker stop $$(docker ps -q --filter ancestor=backend)
	-docker rm $$(docker ps -a -q --filter ancestor=backend)
	docker build -f backend/Dockerfile -t backend backend
	docker run -p 8080:8080 -d backend

run_frontend_dev:
	docker build -f frontend/Dockerfile -t frontend frontend
	docker run -p 9000:9000 -d frontend
