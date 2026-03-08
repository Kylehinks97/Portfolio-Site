SHELL := /bin/sh

.PHONY: up down restart rebuild help api frontend

up: ## Start the containers
	docker compose up -d

down: ## Stop the containers
	docker compose down --remove-orphans

restart: ## Restart the containers
	make down && make up

rebuild: ## Rebuild the containers
	docker compose build --no-cache
	docker compose up -d --force-recreate

frontend: ## Build frontend
	cd frontend && bun run dev

help: ## Display all commands
	@echo ""
	@echo "Available commands:"
	@grep -E '^[a-zA-Z0-9_-]+:.*?##' Makefile \
		| sed -E 's/:.*##/: /' \
		| sort \
		| column -t -s ':'
	@echo ""
