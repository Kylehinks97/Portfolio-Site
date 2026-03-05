SHELL := /bin/sh

.PHONY: up down restart rebuild help

up: ## Start the containers
	docker compose up -d

down: ## Stop the containers
	docker compose down

restart: ## Restart the containers
	docker compose down
	docker compose up -d

rebuild: ## Rebuild the containers
	docker compose build --no-cache
	docker compose up -d --force-recreate

help: ## Display all commands
	@echo ""
	@echo "Available commands:"
	@grep -E '^[a-zA-Z0-9_-]+:.*?##' Makefile \
		| sed -E 's/:.*##/: /' \
		| sort \
		| column -t -s ':'
	@echo ""
