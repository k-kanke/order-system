FROM golang:1.22

WORKDIR /workspace

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o main .

CMD ["./main"]
