dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d
	$(MAKE) migrate

prod:
	docker compose up --build -d
	$(MAKE) migrate

migrate:
	docker compose exec backend php artisan migrate

rollback:
	docker compose exec backend php artisan migrate:rollback

down:
	docker compose down