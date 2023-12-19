# Stage 1: Build the Go application
FROM golang:1.20-bullseye as builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o myapp ./cmd/cmd.go

# Stage 2: Build a small image for running the application
FROM alpine:latest

WORKDIR /root/

# Copy the pre-built binary file from the previous stage
COPY --from=builder /app/myapp .

# Command to run the executable
CMD ["./myapp"]
