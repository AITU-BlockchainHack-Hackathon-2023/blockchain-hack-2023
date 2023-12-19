run_backend:
	docker build -f backend/Dockerfile -t backend backend
	docker run -p 8080:8080 -d backend
